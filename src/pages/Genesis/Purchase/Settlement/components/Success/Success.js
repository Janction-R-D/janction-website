import { useEffect, useState } from 'react';
import { message, Spin, Button } from 'antd';
import { history } from 'umi';
import { fetchPaymentOrder } from '@/services/genesis';

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get('session_id');

    if (session_id) {
      const payload = {
        payment_tx_id: session_id,
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
    history.push('/instances');
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {loading ? (
        <Spin tip="Confirming your payment..." size="large" />
      ) : confirmed ? (
        <>
          <h1>Thank you for your purchase!</h1>
          <p>Your payment has been received and is being processed.</p>
          <Button
            type="primary"
            onClick={goToInstances}
            style={{ marginTop: 16 }}
          >
            Go to Instances
          </Button>
        </>
      ) : (
        <>
          <h1>Payment Confirmation</h1>
          <p>Unable to confirm your payment at this time.</p>
        </>
      )}
    </div>
  );
}
