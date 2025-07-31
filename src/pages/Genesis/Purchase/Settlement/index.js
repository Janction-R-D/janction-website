import JanctionCountDown from '@/components/JanctionCountDown';
import { DURATION_OPTIONS } from '@/constant';
import {
  fetchCreateOrders,
  fetchMarketOrders,
  fetchNodesConfigInfo,
  fetchNodesPrice,
  fetchPaymentOrder,
} from '@/services/genesis';
import contract, { getCurrency, getDefaultCurrency } from '@/utils/contracts';
import { delay, isEmpty } from '@/utils/lang';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { history, Redirect, useModel } from 'umi';
import { useAccount } from 'wagmi';
import PurchaseCard from '../components/Card';
import Footer from '../components/Footer';
import PayType from '../components/PayType';
import styles from './index.less';

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
  const [payPriceInfo, setPayPriceInfo] = useState({});
  const [configInfo, setConfigInfo] = useState('');
  const { initialState } = useModel('@@initialState');
  const { isLessee, sessionType } = initialState || {};
  const [isWarning, setIsWarning] = useState(false);
  const [allowStripe, setAllowStripe] = useState(false);

  const paytype = [
    ...getCurrency(),
    ...(allowStripe
      ? [
          {
            value: 'Stripe',
            label: configInfo?.stripe_currency,
            rate: 1,
          },
        ]
      : []),
  ];
  const onWarningCancel = () => {
    setIsWarning(false);
  };
  const onWarningOk = () => {
    setIsWarning(false);
  };

  useEffect(() => {
    if (!formValues?.node?.id) return;
    if (formValues?.node?.is_support_stripe) {
      console.log('supported. node for stripe');
      setAllowStripe(true);
    }
    getNodeConfigInfo({ node_id: formValues.node.id });
  }, [formValues, allowStripe]);

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
      setPayPriceInfo(res?.price || {});
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
    if (sessionType == 'google') {
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
      //first check if order exist
      const payload_order = {
        page: 1,
        page_size: 100,
      };
      const { data: getOrders } =
        (await fetchMarketOrders(payload_order)) || {};
      console.log(getOrders);
      const isOrderCreated = getOrders.find((item) => {
        return (
          item.order?.node_id === formValues?.node?.id &&
          item.order?.status?.toLowerCase() === 'pending'
        );
      });

      console.log(isOrderCreated);
      let price;
      //second create order
      if (!isOrderCreated) {
        const res = await fetchCreateOrders(payload);
        price = priceInfo?.price?.price_1e6;
        if (!price) {
          throw new Error('Price Not Found');
        }
      } else {
        price = isOrderCreated?.order?.price?.price_1e6;
        console.log(price);
      }

      //third  rent with the contract
      const tx = await contract.rent({
        payerAddress: address,
        ownerAddress: node.user_id,
        currencyAddress: currency,
        durationNum: value,
        duration: unit,
        price: price,
      });

      await delay(1000);
      //then confirm payment with backend
      await onPayment({
        order_id: isOrderCreated ? isOrderCreated?.order.id : res?.order.id,
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

  const goBack = () => {
    history.push('/genesis/purchase');
  };
  const findCurrency = paytype.find((item) => item.value == currency).label;
  const getPrice = () => {
    let newPrice;
    if (findCurrency !== 'usd') {
      newPrice = !priceInfo?.node_config?.price
        ? '--'
        : priceInfo?.node_config?.price;
      return newPrice;
    }
    newPrice = !priceInfo?.node_config?.stripe_price
      ? '--'
      : priceInfo?.node_config?.stripe_price;
    return newPrice;
  };
  const getTotalPrice = () => {
    let newPrice;

    if (findCurrency !== 'usd') {
      newPrice = !payPriceInfo?.price_in_currency
        ? '--'
        : payPriceInfo?.price_in_currency;
      return newPrice;
    }
    newPrice = !payPriceInfo.stripe_price_in_currency
      ? '--'
      : payPriceInfo.stripe_price_in_currency;
    return newPrice;
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
        <PayType
          value={currency}
          onChange={(e) => setCurrency(e)}
          allowStripe={allowStripe}
          configInfo={configInfo}
        />
        <p>Price detail</p>
        <div className={styles['node-wrapper']}>
          <p className={styles['node-id']}>Device ID:{list?.[0]?.node_id}</p>
          <section className={styles['container']}>
            <div className={styles['price-item']}>
              <span>Price</span>
              <span className={styles['blue-item']}>
                {getPrice()}
                {` ${findCurrency} / ${
                  priceInfo?.node_config?.unit?.toUpperCase() || '~~'
                }`}
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
                {isNaN(Number(getTotalPrice()) / Number(currency?.rate || 1))
                  ? '~~'
                  : (
                      Number(getTotalPrice()) / Number(currency?.rate || 1)
                    ).toFixed(2)}
              </span>

              <span className={styles['currency']}>
                {paytype.find((item) => item.value == currency)?.label}
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
        allowStripe={allowStripe}
        paytype={paytype}
        getPrice={getPrice}
        getTotalPrice={getTotalPrice}
      />
    </div>
  );
};

export default Settlement;
Settlement.wrappers = ['@/wrappers/auth'];
