import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button, message, Spin } from 'antd';
import { fetchCreateOrders } from '@/services/genesis';

// Reemplaza con tu clave pública de Stripe
const stripePromise = loadStripe(
  'pk_live_51RLz4pC53KvFF1GVYYI1oADMsSmvhVTjgjmaq6GjvtDaE6ZeKHJtCnSuVtWS0TwxWyKzhcQvQcVg0RAqrg34Z71P00GsZ7nsBq',
);

export default function StripePayment() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const payload = {
      node_id: node?.id,
      tempalte: template || 'base',
      purchase_instance_quantity: 1,
      purchase_duration: value,
      purchase_duration_unit: goal?.label.toLowerCase(),
      payment_type: 'stripe',
    };
    try {
      // 1. Crear el pedido en tu backend
      const res = await fetchCreateOrders(payload);
      return;
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
      message.error('Error durante el proceso de pago');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading} loading={loading}>
      Pagar con Stripe
    </Button>
  );
}
