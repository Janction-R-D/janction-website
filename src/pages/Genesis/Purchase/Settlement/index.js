import JanctionCountDown from '@/components/JanctionCountDown';
import JanctionTable from '@/components/JanctionTable';
import { fetchMarketRent, fetchNodesConfigInfo } from '@/services/genesis';
import contract, { durationMultiplier } from '@/utils/contract';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { useAccount } from 'wagmi';
import PurchaseCard from '../components/Card';
import Footer from '../components/Footer';
import PayType from '../components/PayType';
import { SETTLEMENT_COLUMNS } from '../extra';
import styles from './index.less';
import { ADDRESS, DURATION_OPTIONS, PAY_CURRENCY } from '@/constant';
import { isEmpty } from '@/utils/lang';

const Settlement = (props) => {
  const [deadline, setDeadline] = useState();

  const { formValues } = history.location.state || {};

  const { address } = useAccount();

  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState(ADDRESS.USDT);
  const [list, setList] = useState([]);
  const [configInfo, setConfigInfo] = useState('');

  useEffect(() => {
    if (!formValues?.node?.id) return;
    getNodeConfigInfo({ node_id: formValues.node.id });
  }, [formValues]);

  const getNodeConfigInfo = async (params) => {
    try {
      const res = await fetchNodesConfigInfo(params);
      if (isEmpty(res)) {
        setList([]);
        return;
      }
      setList([res]);
      setConfigInfo(res);
    } catch (error) {
      console.log('『error』', error);
    }
  };
  useEffect(() => {
    setDeadline(Date.now() + 20 * 60 * 1000);
  }, []);

  const onFinish = () => {
    console.log('『onFinish』', onFinish);
  };

  const onRent = async (values) => {
    try {
      await fetchMarketRent(values);
      message.success('Successful hire!');
    } catch (err) {
      console.log('『err』', err);
      throw new Error(err);
    }
  };

  const onPay = async () => {
    try {
      const { node, duration } = formValues || {};
      let _unitDuration;
      if (duration?.unit === 'Day') {
        _unitDuration = 0;
      } else if (duration?.unit == 'Week') {
        _unitDuration = 1;
      } else if (duration?.unit == 'Month') {
        _unitDuration = 2;
      }
      const goal = DURATION_OPTIONS.find((item) => item.value == _unitDuration);

      setLoading(true);
      const tx = await contract.rent({
        payerAddress: address,
        ownerAddress: node.user_id,
        currencyAddress: currency,
        durationNum: duration?.value,
        duration: _unitDuration,
        price: configInfo?.price,
      });

      await onRent({
        tx_id: tx.hash,
        node_id: node.id,
        purchase_duration: duration.value,
        purchase_duration_unit: goal?.label.toLowerCase(),
      });
      setLoading(false);
      history.push('/genesis/instance');
    } catch (error) {
      setLoading(false);
      console.error('操作合约失败：', error);
      message.error('Operation contract failed, please try again!');
    }
  };

  const columns = [
    {
      title: 'Device ID',
      dataIndex: 'node_id',
      key: 'deviceId',
      width: 'auto',
      ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      ellipsis: true,
      width: 'auto',
      render: (text) => {
        if (!text) return '--';
        return `${text} USDT / Day`;
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: () => '*1',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      width: 'auto',
      render: (text) => {
        const { value, unit } = formValues?.duration || {};
        if (!value && !unit) return '--';
        const goal = DURATION_OPTIONS.find((item) => item.label == unit);
        return `${value || 0}${goal?.label}`;
      },
    },
    {
      title: 'Total Price',
      dataIndex: 'duration',
      width: 'auto',
      render: (text) => {
        const { value, unit } = formValues?.duration || {};
        if (!value && !unit) return '--';
        let _unit;
        if (unit === 'Day') {
          _unit = 0;
        } else if (unit == 'Week') {
          _unit = 1;
        } else if (unit == 'Month') {
          _unit = 2;
        }
        const { price } = list[0] || {};
        const _currency = PAY_CURRENCY.find((item) => item.value == currency);
        const _total = (price || 0) * value * durationMultiplier(_unit, true);
        return (Number(_total) / Number(_currency?.rate || 1)).toFixed(2);
      },
    },
  ];

  return (
    <div className={styles['settlement-wrapper']}>
      <h1>
        <span>Confirm product information</span>
        <a>
          <i className="iconfont icon-pre_page"></i>
          <span>Back to modify configuration</span>
        </a>
      </h1>
      <JanctionCountDown
        deadline={deadline}
        onFinish={onFinish}
        format="mm:ss"
      />
      <PurchaseCard title="Price detail">
        <PayType value={currency} onChange={(e) => setCurrency(e)} />
        <JanctionTable
          columns={columns}
          dataSource={list}
          pagination={false}
          scroll={{ x: 'auto' }}
        />
      </PurchaseCard>
      <Footer
        isSettlement
        onPre={() => history.goBack()}
        currencyAddress={currency}
        formValues={formValues}
        node={list[0]}
        onPay={onPay}
      />
    </div>
  );
};

export default Settlement;
