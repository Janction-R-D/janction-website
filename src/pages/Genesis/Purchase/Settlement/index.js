import JanctionCountDown from '@/components/JanctionCountDown';
import JanctionTable from '@/components/JanctionTable';
import { Duration, DURATION_OPTIONS } from '@/constant';
import {
  fetchCreateOrders,
  fetchMarketRent,
  fetchNodesConfigInfo,
  fetchPaymentOrder,
} from '@/services/genesis';
import contract, {
  convertDurationToDays,
  getCurrency,
  getDefaultCurrency,
} from '@/utils/contracts';
import { delay, empty, isEmpty } from '@/utils/lang';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { useAccount } from 'wagmi';
import PurchaseCard from '../components/Card';
import Footer from '../components/Footer';
import PayType from '../components/PayType';
import styles from './index.less';
import { create } from 'lodash';

const Settlement = (props) => {
  const [deadline, setDeadline] = useState();
  const { formValues } = history.location.state || {};

  const { address } = useAccount();
  const [tableLoading, setTableLoading] = useState(false);
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
      setTableLoading(true);
      const res = await fetchNodesConfigInfo(params);
      if (isEmpty(res)) {
        setList([]);
        return;
      }
      setList([res]);
      console.log(res);
      setConfigInfo(res);
    } catch (error) {
      console.log('『error』', error);
    } finally {
      setTableLoading(false);
    }
  };
  useEffect(() => {
    setDeadline(Date.now() + 20 * 60 * 1000);
  }, []);

  const onFinish = () => {
    console.log('『onFinish』');
    message.info('Purchase Cancelled');
    setTimeout(() => {
      history.push('/genesis/purchase');
    }, 3000);
  };

  const onRent = async (values) => {
    try {
      // const res = await fetchMarketRent(values);
      console.log(res);
      if (res?.code) {
        message.error(res?.message);
        return;
      }
      message.success('Successful hire!');
      history.push('/genesis/instance');
    } catch (err) {
      console.log('『err』', err);
      throw new Error(err);
    }
  };
  const onPayment = async (values) => {
    try {
      const res = await fetchPaymentOrder(values);
      if (res?.code) {
        message.error(res?.message);
        return;
      }
      message.success('Successful hire!');
      history.push('/genesis/instance');
    } catch (err) {
      console.log('『err』', err);
      throw new Error(err);
    }
  };
  const onPay = async () => {
    try {
      const { node, ai_framework } = formValues || {};
      const { value, unit } = formValues?.purDuration || {};
      const goal = DURATION_OPTIONS.find((item) => item.value == unit);

      const payload = {
        node_id: node?.id,
        tempalte: ai_framework || 'standard',
        purchase_instance_quantity: 1,
        purchase_duration: value,
        purchase_duration_unit: goal?.label.toLowerCase(),
      };

      setLoading(true);
      //first  create order
      const res = await fetchCreateOrders(payload);
      //second  rent with the contract
      const tx = await contract.rent({
        payerAddress: address,
        ownerAddress: node.user_id,
        currencyAddress: currency,
        durationNum: value,
        duration: unit,
        // TODO
        price: configInfo?.price,
      });

      await delay(1000);
      //then confirm payment with backend
      await onPayment({
        order_id: res?.order.ID,
        payment_tx_id: tx.hash,
      });
      // await onRent({
      //   tx_id: tx.hash,
      //   node_id: node.id,
      //   purchase_duration: value,
      //   purchase_duration_unit: goal?.label.toLowerCase(),
      //   purchase_instance_quantity: 1,
      //   template: formValues?.ai_framework,
      // });
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
        // TODO
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
        console.log(price);
        if (unit == Duration.Hour) {
          const _currency = getCurrency().find(
            (item) => item.value == currency,
          );
          const _total = (price || 0) * value;
          return (Number(_total) / Number(_currency?.rate || 1)).toFixed(2);
        }
        const _currency = getCurrency().find((item) => item.value == currency);
        const _total = (price || 0) * value * convertDurationToDays(unit);
        return (Number(_total) / Number(_currency?.rate || 1)).toFixed(2);
      },
    },
  ];
  const goBack = () => {
    history.push('/genesis/purchase');
  };
  return (
    <div className={styles['settlement-wrapper']}>
      <h1>
        <span>Confirm product information</span>
        <a onClick={goBack}>
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
          rowKey={'deviceId'}
          dataSource={list}
          loading={tableLoading}
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
        loading={loading}
        tableLoading={tableLoading}
      />
    </div>
  );
};

export default Settlement;
