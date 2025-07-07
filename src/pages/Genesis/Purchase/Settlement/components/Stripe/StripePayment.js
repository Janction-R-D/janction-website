import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button, message, Spin } from 'antd';
import { fetchCreateOrders } from '@/services/genesis';
import { DURATION_OPTIONS } from '@/constant';
import styles from './index.less';
const stripeKey = process.env.JanctionStripe;

const stripePromise = loadStripe(stripeKey);

export default function StripePayment({ formValues, total }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const goal = DURATION_OPTIONS.find((item) => item.value == unit);
    const { node, template } = formValues || {};
    const { value, unit } = formValues?.purDuration || {};
    const payload = {
      node_id: node?.id,
      tempalte: template || 'base',
      purchase_instance_quantity: 1,
      purchase_duration: value,
      purchase_duration_unit: goal?.label.toLowerCase(),
      payment_type: 'stripe',
    };
    try {
      return;
      const res = await fetchCreateOrders(payload);
      console.log(res);
      if (!sessionId) {
        message.error('No se pudo obtener el ID de sesión de Stripe');
        return;
      }

      // 2. Redirigir a Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        message.error('Error al redirigir a Stripe: ' + error.message);
      }

      // Nota: Stripe redirige a una página de éxito o cancelación. En la página de éxito, haces lo siguiente ↓
    } catch (err) {
      message.error('Operation failed, please try again later !');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      loading={loading}
      className={styles['connect-btn']}
    >
      Pay with Fiat
    </Button>
  );
}
