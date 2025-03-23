import JanctionCountDown from '@/components/JanctionCountDown';
import JanctionTable from '@/components/JanctionTable';
import { DURATION_OPTIONS } from '@/constant';
import { fetchMarketRent, fetchNodesConfigInfo } from '@/services/genesis';
import contract, {
  durationMultiplier,
  getCurrency,
  getDefaultCurrency,
} from '@/utils/contracts';
import { delay, empty, isEmpty } from '@/utils/lang';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { useAccount } from 'wagmi';
import PurchaseCard from '../components/Card';
import Footer from '../components/Footer';
import PayType from '../components/PayType';
import styles from './index.less';

const Settlement = (props) => {
  const [deadline, setDeadline] = useState();

  const { formValues } = history.location.state || {};

  const { address } = useAccount();

  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState(getDefaultCurrency());
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
      const { node } = formValues || {};
      const { value, unit } = formValues?.purDuration || {};
      const goal = DURATION_OPTIONS.find((item) => item.value == unit);

      setLoading(true);
      const tx = await contract.rent({
        payerAddress: address,
        ownerAddress: node.user_id,
        currencyAddress: currency,
        durationNum: value,
        duration: unit,
        price: configInfo?.price,
      });

      await delay(1000);

      await onRent({
        tx_id: tx.hash,
        node_id: node.id,
        purchase_duration: value,
        purchase_duration_unit: goal?.label.toLowerCase(),
      });
      history.push('/genesis/instance');
    } catch (error) {
      console.error(error);
      message.error('Operation contract failed, please try again!');
    } finally {
      setLoading(false);
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
        const { value, unit } = formValues?.purDuration || {};
        if (!value && empty(unit)) return '--';
        const goal = DURATION_OPTIONS.find((item) => item.value == unit);
        return `${value || 0}${goal?.label}`;
      },
    },
    {
      title: 'Total Price',
      dataIndex: 'duration',
      width: 'auto',
      render: (text) => {
        const { value, unit } = formValues?.purDuration || {};
        if (!value && empty(unit)) return '--';
        const { price } = list[0] || {};

        const _currency = getCurrency().find((item) => item.value == currency);
        const _total = (price || 0) * value * durationMultiplier(unit, true);
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
