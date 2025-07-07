import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button, message } from 'antd';
import { fetchCreateOrders } from '@/services/genesis';
import { DURATION_OPTIONS } from '@/constant';
import styles from './index.less';

const stripePromise = loadStripe(process.env.JanctionStripe);

export default function StripePayment({ formValues, onPayBefore }) {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // track payment status

  // Effect to check if Stripe redirected back with client_secret in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientSecret = params.get('payment_intent_client_secret');

    if (clientSecret) {
      // Check payment status on return from Stripe
      stripePromise.then(async (stripe) => {
        const { paymentIntent, error } = await stripe.retrievePaymentIntent(
          clientSecret,
        );

        if (error) {
          message.error('Failed to retrieve payment status');
          setPaymentStatus('error');
          console.error('[Stripe retrievePaymentIntent Error]', error);
          return;
        }

        switch (paymentIntent.status) {
          case 'succeeded':
            setPaymentStatus('success');
            // Call backend to notify payment completed if needed
            await fetch('/api/payment-completed', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
            });
            message.success('Payment succeeded!');
            break;
          case 'processing':
            setPaymentStatus('processing');
            message.info('Payment is processing...');
            break;
          case 'requires_payment_method':
            setPaymentStatus('failed');
            message.error('Payment failed, please try again.');
            break;
          default:
            setPaymentStatus('unknown');
            message.warn('Payment status unknown.');
        }
      });
    }
  }, []);

  const handleCheckout = async () => {
    setLoading(true);

    const { value, unit } = formValues?.purDuration || {};
    const { node, template } = formValues || {};
    const goal = DURATION_OPTIONS.find((item) => item.value == unit);

    const payload = {
      node_id: node?.id,
      tempalte: template || 'base',
      purchase_instance_quantity: 1,
      purchase_duration: value,
      purchase_duration_unit: goal?.label.toLowerCase(),
      payment_type: 'stripe',
    };

    try {
      // Call backend to create the order and get client_secret || 调用后端创建订单并获取 client_secret
      const { stripe: stripeData } = (await fetchCreateOrders(payload)) || {};
      const { client_secret, stripe_payment_id } = stripeData;
      if (!client_secret) {
        message.error('Failed to get client_secret');
        setLoading(false);
        return;
      }

      const stripe = await stripePromise;

      // Confirm payment WITHOUT return_url to stay on same page || 确认支付，不使用 return_url，停留在当前页面
      const { error } = await stripe.confirmCardPayment(client_secret);

      if (error) {
        message.error(error.message || 'Stripe payment error');
        console.error('[Stripe Error]', error);
        setLoading(false);
        return;
      }

      // Payment flow continues, status will be checked in useEffect after redirect from Stripe 3DS or other steps
    } catch (err) {
      message.error('Operation failed, please try again later');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          try {
            onPayBefore?.(); // Run pre-payment callback if provided || 如有提供，先执行支付前回调
            handleCheckout(); // Start the payment process || 开始支付流程
          } catch (err) {
            console.error('[handleCheckout Error]', err);
          }
        }}
        disabled={loading}
        loading={loading}
        className={styles['connect-btn']}
      >
        Pay with Fiat
      </Button>

      {paymentStatus === 'success' && (
        <p style={{ color: 'green' }}>Payment completed successfully!</p>
      )}
      {paymentStatus === 'processing' && (
        <p style={{ color: 'orange' }}>Your payment is processing...</p>
      )}
      {paymentStatus === 'failed' && (
        <p style={{ color: 'red' }}>Payment failed. Please try again.</p>
      )}
      {paymentStatus === 'error' && (
        <p style={{ color: 'red' }}>Error retrieving payment status.</p>
      )}
    </div>
  );
}
