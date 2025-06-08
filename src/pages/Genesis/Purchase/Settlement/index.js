import JanctionCountDown from '@/components/JanctionCountDown';
import JanctionTable from '@/components/JanctionTable';
import { Duration, DURATION_OPTIONS } from '@/constant';
import {
  fetchCreateOrders,
  fetchMarketRent,
  fetchNodesConfigInfo,
  fetchNodesPrice,
  fetchPaymentOrder,
} from '@/services/genesis';
import contract, {
  convertDurationToHours,
  getCurrency,
  getDefaultCurrency,
} from '@/utils/contracts';
import { delay, empty, isEmpty } from '@/utils/lang';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { history, Redirect, useModel } from 'umi';
import { useAccount } from 'wagmi';
import PurchaseCard from '../components/Card';
import Footer from '../components/Footer';
import PayType from '../components/PayType';
import styles from './index.less';
import { create } from 'lodash';
import storage from '@/utils/storage';

const Settlement = (props) => {
  const [deadline, setDeadline] = useState();
  const { formValues } = history.location.state || {};
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(3);
  const { address } = useAccount();
  const [tableLoading, setTableLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState(getDefaultCurrency());
  const [list, setList] = useState([]);
  const [priceInfo, setPriceInfo] = useState({});
  const [configInfo, setConfigInfo] = useState('');
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const [isWarning, setIsWarning] = useState(false);
  const onWarningCancel = () => {
    setIsWarning(false);
  };
  const onWarningOk = () => {
    setIsWarning(false);
  };

  useEffect(() => {
    if (!formValues?.node?.id) return;
    getNodeConfigInfo({ node_id: formValues.node.id });
  }, [formValues]);

  const getNodeConfigInfo = async (params) => {
    try {
      setTableLoading(true);
      const [priceInfoRes, nodesConfigInfo] = await Promise.all([
        getPriceInfo(),
        fetchNodesConfigInfo(params),
      ]);

      if (isEmpty(nodesConfigInfo)) {
        setList([]);
        return;
      }
      setList([nodesConfigInfo]);
      setPriceInfo(priceInfoRes);
      setConfigInfo(nodesConfigInfo);
    } catch (error) {
      console.log('『error』', error);
    } finally {
      setTableLoading(false);
    }
  };
  const getPriceInfo = async () => {
    const durUnit = DURATION_OPTIONS.find(
      (item) => item.value == formValues?.purDuration?.unit,
    );
    const payload = {
      node_id: formValues?.node?.id,
      purchase_instance_quantity: 1,
      purchase_duration: formValues?.purDuration?.value,
      purchase_duration_unit: durUnit?.label.toLocaleLowerCase() || 'hour',
    };

    try {
      const res = await fetchNodesPrice(payload);
      return res;
    } catch (error) {
      console.log(error);
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

  const onPayment = async (values) => {
    try {
      const res = await fetchPaymentOrder(values);
      if (res?.code) {
        message.error(res?.message);
        return;
      }
      setModalOpen(false);
      setPaymentStatus(2);
      setTimeout(() => {
        setModalOpen(true);
      }, 1000);
    } catch (err) {
      console.log('『err』', err);
      throw new Error(err);
    }
  };
  const onPay = async () => {
    const checkAccount = storage.get('SESSION_TYPE');
    if (checkAccount == 'google') {
      setIsWarning(true);

      return;
    }
    try {
      setPaymentStatus(3);
      setModalOpen(true);
      const { node, template } = formValues || {};
      const { value, unit } = formValues?.purDuration || {};
      const goal = DURATION_OPTIONS.find((item) => item.value == unit);

      const payload = {
        node_id: node?.id,
        tempalte: template || 'base',
        purchase_instance_quantity: 1,
        purchase_duration: value,
        purchase_duration_unit: goal?.label.toLowerCase(),
      };

      setLoading(true);
      //first  create order
      const res = await fetchCreateOrders(payload);
      const price = priceInfo?.price?.price_1e6;
      if (!price) {
        throw new Error('Price Not Found');
      }
      //second  rent with the contract
      const tx = await contract.rent({
        payerAddress: address,
        ownerAddress: node.user_id,
        currencyAddress: currency,
        durationNum: value,
        duration: unit,
        // TODO
        price: price,
      });

      await delay(1000);
      //then confirm payment with backend
      await onPayment({
        order_id: res?.order.id,
        payment_tx_id: tx.hash,
      });
      setPaymentStatus(2);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
      message.error('Operation contract failed, please try again!');
      setPaymentStatus(1);
      setModalOpen(true);
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
      render: (text, record) => {
        if (!text) return '--';
        // TODO

        return `${text} USDT / ${record?.unit.toUpperCase()}`;
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
      dataIndex: 'price',
      width: 'auto',
      render: (text) => {
        const { value, unit } = formValues?.purDuration || {};
        if (!value && empty(unit)) return '--';
        const price = priceInfo?.price?.price_in_currency || '--';

        const _currency = getCurrency().find((item) => item.value == currency);

        return (Number(price) / Number(_currency?.rate || 1)).toFixed(2);
      },
    },
  ];
  const goBack = () => {
    history.push('/genesis/purchase');
  };
  if (!isLessee) return <Redirect to="/genesis/dashboard"></Redirect>;
  return (
    <div className={styles['settlement-wrapper']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Confirm product information</h1>
        </header>
      </section>
      <div className={styles['header-desc']}>
        <a onClick={goBack}>
          <i className="iconfont icon-pre_page"></i>
          <span>Back to modify configuration</span>
        </a>
        <div>
          <p>Remaining time paid</p>
          <JanctionCountDown
            deadline={deadline}
            onFinish={onFinish}
            format="mm:ss"
          />
        </div>
      </div>

      <PurchaseCard title="Price detail">
        <PayType value={currency} onChange={(e) => setCurrency(e)} />
        <p>Price detail</p>
        <div className={styles['node-wrapper']}>
          <p className={styles['node-id']}>Device ID:{list?.[0]?.node_id}</p>
          <section className={styles['container']}>
            <div className={styles['price-item']}>
              <span>Price</span>
              <span className={styles['blue-item']}>
                {!priceInfo?.node_config?.price
                  ? '--'
                  : `${
                      priceInfo?.node_config?.price
                    } USDT / ${priceInfo?.node_config?.unit.toUpperCase()}`}
              </span>
            </div>
            <div className={styles['duration-item']}>
              <span>Quantity</span>
              <span>*1</span>
            </div>
            <div className={styles['table-header-item']}>
              <span>Duration</span>
              <span className={styles['dur']}>
                {(() => {
                  const { value, unit } = formValues?.purDuration || {};
                  if (!value && !unit) return '--';

                  const goal = DURATION_OPTIONS.find(
                    (item) => item.value === unit,
                  );
                  const label = goal?.label || '';

                  return `${value || 0} ${label}`;
                })()}
              </span>
            </div>
          </section>
          <section className={styles['total-price']}>
            <span className={styles['total-title']}>Total Price</span>
            <div>
              <span className={styles['blue-item']}>
                {isNaN(
                  Number(priceInfo?.price?.price_in_currency) /
                    Number(currency?.rate || 1),
                )
                  ? '~~'
                  : (
                      Number(priceInfo?.price?.price_in_currency) /
                      Number(currency?.rate || 1)
                    ).toFixed(2)}
              </span>

              <span className={styles['currency']}>
                {getCurrency().find((item) => item.value == currency)?.label}
              </span>
            </div>
          </section>
        </div>
      </PurchaseCard>
      <Footer
        currencyAddress={currency}
        formValues={formValues}
        node={list}
        onPay={onPay}
        loading={loading}
        tableLoading={tableLoading}
        priceInfo={priceInfo}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        onWarningCancel={onWarningCancel}
        isWarning={isWarning}
        onOk={onWarningOk}
      />
    </div>
  );
};

export default Settlement;
