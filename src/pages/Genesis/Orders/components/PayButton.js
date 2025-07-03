import { Button, message } from 'antd';
import styles from './orders.less';
import contract, { getDefaultCurrency } from '@/utils/contracts';
import { useAccount } from 'wagmi';
import PaymentResultModal from '../../Purchase/Settlement/components/payment_result';
import ModalInfo from '../../Purchase/Settlement/components/ModalInfo';
import { useState } from 'react';
import { useModel } from 'umi';
import { fetchPaymentOrder } from '@/services/genesis';
import { DURATION_OPTIONS } from '@/constant';
import { delay } from '@/utils/lang';

export default function PayButton({ order }) {
  const { initialState } = useModel('@@initialState');
  const { isLessee, sessionType } = initialState || {};
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currency, setCurrency] = useState(getDefaultCurrency());
  const [isWarning, setIsWarning] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(3);
  console.log(order);

  function getDurationValueByLabel(label) {
    const match = DURATION_OPTIONS.find(
      (option) => option.label.toLowerCase() === label.toLowerCase(),
    );
    return match ? match.value : null;
  }
  const onWarningCancel = () => {
    setIsWarning(false);
  };
  const onWarningOk = () => {
    setIsWarning(false);
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
      setLoading(true);
      console.log(order);
      const price = order?.price?.price_1e6;
      if (!price) {
        throw new Error('Price Not Found');
      }
      //second  rent with the contract
      const tx = await contract.rent({
        payerAddress: address,
        ownerAddress: order.user_id,
        currencyAddress: currency,
        durationNum: order.purchase_duration,
        duration: getDurationValueByLabel(order.purchase_duration_unit),
        price: price,
      });

      await delay(1000);
      //then confirm payment with backend
      await onPayment({
        order_id: order.id,
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
  return (
    <>
      <Button
        className={styles['connect-btn']}
        onClick={() => {
          try {
            console.log('payment in process');
            onPay();
          } catch (err) {
            console.log('『err』', err);
          }
        }}
      >
        Complete payment <i className="iconfont icon-next" />
      </Button>
      <PaymentResultModal
        open={modalOpen}
        setOpen={setModalOpen}
        status={paymentStatus}
        onClose={() => {
          if (loading) return;
          setModalOpen(false);
        }}
        onPay={onPay}
        setPaymentStatus={setPaymentStatus}
      />
      <ModalInfo
        open={isWarning}
        onClose={onWarningCancel}
        onOk={onWarningOk}
      />
    </>
  );
}
