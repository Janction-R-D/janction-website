import React, { useState } from 'react';
import styles from './index.less';
import { Divider, Button, Checkbox, message } from 'antd';
import usdtImg from '@/assets/images/genesis/usdt.png';
import usdcImg from '@/assets/images/genesis/usdc.png';
import OrderCard from './OrderCard';

import PaymentResultModal from './PorcessModal';
import { useIntl, useLocation } from 'umi';
import { onNavigate } from '../../utils';
export default function PurchaseAi() {
  const [paymentType, setPaymentType] = useState('USDC');
  const [agreed, setAgreed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(3);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { from } = location.state || {};
  const handlePay = () => {
    if (!agreed) {
      message.warning('Please agree to the service terms before proceeding.');
      return;
    }
    handleOpen(paymentStatus);
  };
  const handleOpen = (status) => {
    setPaymentStatus(3);
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 2000);
    setTimeout(() => {
      setPaymentStatus(2);
      setModalOpen(true);
    }, 3000);
  };
  return (
    <main className={styles['purchase-wrapper']}>
      <header className={styles['orders-header']}>
        <div className={styles['btn-back']} onClick={() => onNavigate(from)}>
          <i className="iconfont icon-pre" />
          Back
        </div>
        <Divider type="vertical" className={styles['divider']} />
        <div>Confirm</div>{' '}
      </header>
      <main>
        <div className={styles.paymentCard}>
          <div className={styles.paymentType}>
            <div
              className={`${styles.paymentButton} ${
                paymentType === 'USDT' ? styles.active : ''
              }`}
              onClick={() => setPaymentType('USDT')}
            >
              <span className={styles.icon}>
                <img src={usdtImg} />
              </span>{' '}
              USDT
            </div>
            <div
              className={`${styles.paymentButton} ${
                paymentType === 'USDC' ? styles.active : ''
              }`}
              onClick={() => setPaymentType('USDC')}
            >
              <span className={styles.icon}>
                {' '}
                <img src={usdcImg} />
              </span>{' '}
              USDC
            </div>
          </div>

          <div className={styles.cardContent}>
            <OrderCard />
          </div>

          <div className={styles.paymentFooter}>
            <div className={styles.terms}>
              <Checkbox
                checked={agreed}
                className={styles.check}
                onChange={(e) => setAgreed(e.target.checked)}
              >
                <span> I have read and agreed to</span>
                <b>the relevant service terms.</b>.
              </Checkbox>
            </div>
            <div className={styles.footerPrice}>
              <span className={styles.price}> 9.9 {paymentType}</span>
              <Button
                className={styles['payButton']}
                onClick={handlePay}
                loading={loading}
              >
                Check to Pay
              </Button>
              <PaymentResultModal
                open={modalOpen}
                status={paymentStatus}
                onClose={() => setModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
