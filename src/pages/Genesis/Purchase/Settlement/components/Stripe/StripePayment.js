import { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { fetchCreateOrders, fetchMarketOrders } from '@/services/genesis';
import { DURATION_OPTIONS } from '@/constant';
import CustomCheckoutForm from '@/components/Stripe/CustomCheckoutForm';
import styles from './index.less';
import { WalletOutlined } from '@ant-design/icons';
const key =
  'pk_live_51RLz4pC53KvFF1GVYYI1oADMsSmvhVTjgjmaq6GjvtDaE6ZeKHJtCnSuVtWS0TwxWyKzhcQvQcVg0RAqrg34Z71P00GsZ7nsBq';
const stripePromise = loadStripe(key);

export default function StripePayment({
  formValues,
  onPayBefore,
  visible,
  setVisible,
  tableLoading,
  total,
}) {
  const [clientSecret, setClientSecret] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchSecret = async () => {
    const { value, unit } = formValues?.purDuration || {};
    const { node, template } = formValues || {};
    const goal = DURATION_OPTIONS.find((item) => item.value == unit);

    const payload = {
      node_id: node?.id,
      template: template || 'base',
      purchase_instance_quantity: 1,
      purchase_duration: value,
      purchase_duration_unit: goal?.label.toLowerCase(),
      payment_type: 'stripe',
    };
    setLoading(true);
    try {
      const payload_order = {
        page: 1,
        page_size: 100,
      };
      const { data: getOrders } =
        (await fetchMarketOrders(payload_order)) || {};

      const isOrderCreated = getOrders.find((item) => {
        return (
          item.order?.node_id === formValues?.node?.id &&
          item.order?.status?.toLowerCase() === 'pending'
        );
      });
      if (!isOrderCreated) {
        const { stripe: stripeData, order } = await fetchCreateOrders(payload);
        if (!order?.id || !stripeData?.client_secret) {
          message.error('Failed to initialize order');
          return;
        }

        setOrderId(order.id);
        setClientSecret(stripeData?.client_secret);
        setVisible(true);
        return;
      }
      console.log(isOrderCreated?.order.stripe_client_secret);
      setOrderId(isOrderCreated?.order?.id);
      setClientSecret(isOrderCreated?.order?.stripe_client_secret);
      setVisible(true);
    } catch (err) {
      console.error(err);
      message.error('Stripe init failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async () => {
    try {
      onPayBefore();
      await fetchSecret();
    } catch (err) {
      console.error('[handleOpenModal Error]', err);
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        type="primary"
        className={styles['connect-btn']}
        disabled={tableLoading || !total}
        loading={loading}
      >
        Pay with Fiat <WalletOutlined className={styles['icon']} />
      </Button>

      <Modal
        open={visible}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
        width={800}
        className={styles['modal']}
      >
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              wallets: {
                link: 'never',
              },
            }}
          >
            <CustomCheckoutForm
              clientSecret={clientSecret}
              onCancel={handleCloseModal}
              orderId={orderId}
            />
          </Elements>
        )}
      </Modal>
    </>
  );
}
