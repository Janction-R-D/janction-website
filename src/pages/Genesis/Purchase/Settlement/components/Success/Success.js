import { useEffect, useState } from 'react';
import { message, Spin, Button } from 'antd';
import { history, useIntl } from 'umi';
import { fetchPaymentOrder } from '@/services/genesis';
import styles from './index.less';
import img from '@/assets/images/icons/logo_name.png';
import imgClock from '@/assets/images/genesis/sand_clock.png';
import { RedoOutlined } from '@ant-design/icons';
export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const intl = useIntl();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get('session_id');
    const order_id = params.get('order_id');
    const payment_intent = params.get('payment_intent');

    if (session_id) {
      const payload = {
        order_id,
        session_id,
        payment_intent,
        payment_type: 'stripe',
      };
      updatePayment(payload);
    } else {
      setLoading(false);
    }
  }, []);

  const updatePayment = async (payload) => {
    try {
      const res = await fetchPaymentOrder(payload);

      setConfirmed(true);
      message.success('Payment confirmed successfully!');
    } catch (error) {
      console.error('Error confirming payment:', error);
      message.error('Failed to confirm payment. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const goToInstances = () => {
    history.replace('/genesis/instances');
  };
  const goToPurchase = () => {
    history.replace('/genesis/purchase');
  };
  const goToOrder = () => {
    history.replace('/genesis/order');
  };

  return (
    <div className={styles['main-container']}>
      <header className={styles['header']}>
        <img src={img} alt="Header" />
      </header>
      <main className={styles['main']}>
        <img src={imgClock} alt="Clock" />
        {loading ? (
          <Spin
            tip={intl.formatMessage({ id: 'payment.loadingTip' })}
            size="large"
          />
        ) : confirmed ? (
          <main>
            <h1>{intl.formatMessage({ id: 'payment.thankYou' })}</h1>
            <p className={styles['desc']}>
              {intl.formatMessage({ id: 'payment.receivedDesc' })}
            </p>
            <Button
              type="primary"
              onClick={goToInstances}
              style={{ marginTop: 16 }}
            >
              {intl.formatMessage({ id: 'payment.goToInstances' })}
            </Button>
          </main>
        ) : (
          <>
            <h1>{intl.formatMessage({ id: 'payment.confirmation' })}</h1>
            <p className={styles['desc']}>
              {intl.formatMessage({ id: 'payment.unableConfirm' })}
            </p>
            <div className={styles['buttons']}>
              <Button
                type="primary"
                onClick={goToPurchase}
                style={{ marginTop: 16 }}
                className={styles['connect-btn']}
              >
                {intl.formatMessage({ id: 'payment.returnToPurchase' })}{' '}
                <RedoOutlined style={{ color: 'orange' }} />
              </Button>
              <Button
                type="primary"
                onClick={goToOrder}
                style={{ marginTop: 16 }}
                className={styles['connect-btn']}
              >
                {intl.formatMessage({ id: 'payment.checkOrder' })}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
