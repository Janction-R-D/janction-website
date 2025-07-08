import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, Modal, message } from 'antd';
import { fetchCreateOrders } from '@/services/genesis';
import { DURATION_OPTIONS } from '@/constant';
import styles from './index.less';

const key =
  'pk_live_51RLz4pC53KvFF1GVYYI1oADMsSmvhVTjgjmaq6GjvtDaE6ZeKHJtCnSuVtWS0TwxWyKzhcQvQcVg0RAqrg34Z71P00GsZ7nsBq';
const stripePromise = loadStripe(key);

// Subcomponente para el formulario de pago
function CheckoutForm({ clientSecret, onCancel, orderId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/genesis/purchase/success?order_id=${orderId}`,
      },
    });

    if (error) {
      message.error(error.message || 'Payment error');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleCheckout}>
      <PaymentElement />
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Pay with Fiat
        </Button>
      </div>
    </form>
  );
}

export default function StripePayment({ formValues, onPayBefore }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderId, setOrderId] = useState(false);

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

    try {
      const { stripe: stripeData, order } = await fetchCreateOrders(payload);
      if (!order?.id) {
        message.error('Failed to get order info');
        return;
      }
      if (!stripeData?.client_secret) {
        message.error('Failed to get client_secret');
        return;
      }
      setOrderId(order.id);
      setClientSecret(stripeData.client_secret);
      setModalVisible(true);
    } catch (err) {
      console.error(err);
      message.error('Failed to initialize payment');
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
    setModalVisible(false);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className={styles['connect-btn']}
        type="primary"
      >
        Pay with Fiat
      </Button>

      <Modal
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
        title="Complete Your Payment"
      >
        {clientSecret && (
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckoutForm
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
