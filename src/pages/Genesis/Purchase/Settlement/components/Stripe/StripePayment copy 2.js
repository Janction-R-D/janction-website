import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, message, Modal } from 'antd';
import { DURATION_OPTIONS } from '@/constant';
import { fetchCreateOrders } from '@/services/genesis';
const key = process.env.JanctionStripe;
console.log(key);
const stripePromise = loadStripe(key);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#a0aec0',
      },
      padding: '10px 12px',
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: true,
};

function CheckoutForm({ formValues, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);

    // Aquí va tu lógica para crear orden y obtener client_secret
    // Ejemplo simplificado:

    try {
      // Suponiendo que tienes fetchCreateOrders definido en servicios
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

      const { stripe: stripeData } = await fetchCreateOrders(payload);
      const client_secret = stripeData?.client_secret;
      if (!client_secret) {
        message.error('Failed to get client_secret');
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: 'Cliente Ejemplo',
            },
          },
        },
      );

      if (error) {
        message.error(error.message || 'Payment failed');
        console.error(error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        message.success('Payment succeeded!');
        onSuccess();
      }
    } catch (err) {
      message.error('Operation failed, please try again later');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!stripe || loading}
          loading={loading}
        >
          Pay with Card
        </Button>
      </div>
    </form>
  );
}

export default function StripePaymentModal({ formValues, onPayBefore }) {
  const [visible, setVisible] = useState(false);

  const openModal = async () => {
    try {
      onPayBefore();
      setVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => setVisible(false);

  const handleSuccess = () => {
    setVisible(false);
    // Aquí puedes hacer algo tras el pago exitoso, por ejemplo recargar lista o redirigir
  };

  return (
    <>
      <Button type="primary" onClick={openModal}>
        Pay with Fiat
      </Button>
      <Modal
        title="Complete your payment"
        visible={visible}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <Elements stripe={stripePromise}>
          <CheckoutForm
            formValues={formValues}
            onCancel={closeModal}
            onSuccess={handleSuccess}
          />
        </Elements>
      </Modal>
    </>
  );
}
