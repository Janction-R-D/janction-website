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
import { Button, message } from 'antd';
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
      setList(res);
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
      const res = await fetchMarketRent(values);
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
        purchase_instance_quantity: 1,
        template: formValues?.ai_framework,
      });
      history.push('/genesis/instance');
    } catch (error) {
      console.error(error);
      message.error('Operation contract failed, please try again!');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    history.push('/genesis/purchase');
  };
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
          <p className={styles['node-id']}>Device ID:{list?.node_id}</p>
          <section className={styles['container']}>
            <div className={styles['price-item']}>
              <span>Price</span>
              <span className={styles['blue-item']}>
                {!list?.price ? '--' : `${list?.price} USDT / Day`}
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
                {(() => {
                  const { value, unit } = formValues?.purDuration || {};
                  if (!value && empty(unit)) return '--';
                  const { price } = list || {};

                  const _currency = getCurrency().find(
                    (item) => item.value == currency,
                  );
                  const _total =
                    ((price || 0) * value * durationMultiplier(unit)) /
                    Number(_currency?.rate || 1);
                  return _total.toFixed(2);
                })()}
              </span>
              <span className={styles['currency']}>
                {getCurrency().find((item) => item.value == currency)?.label}
              </span>
            </div>
          </section>
        </div>
      </PurchaseCard>
      <Footer
        isSettlement
        onPre={() => history.goBack()}
        currencyAddress={currency}
        formValues={formValues}
        node={list}
        onPay={onPay}
        loading={loading}
        tableLoading={tableLoading}
      />
    </div>
  );
};

export default Settlement;
