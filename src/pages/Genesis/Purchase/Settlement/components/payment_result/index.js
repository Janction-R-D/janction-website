import React from 'react';
import styles from './index.less';
import { Button, message, Modal } from 'antd';
import { history } from 'umi';

const PaymentResultModal = ({
  open,
  setOpen,
  status,
  onClose,
  onPay,
  setPaymentStatus,
}) => {
  const onClick = () => {
    console.log(' Button Clicked');
  };
  const onRepay = () => {
    setOpen(false);
    setPaymentStatus(3);
    setTimeout(() => {
      onPay();
    }, 1000);
  };
  const onContinue = () => {
    message.success('Successful hire!');
    history.push('/genesis/instance');
  };
  const renderContent = () => {
    switch (status) {
      case 1:
        return (
          <>
            <div className={styles['failure-message']}>Payment Failure</div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                Please complete the payment in{' '}
              </span>
              <span className={styles['highlight-text']}>coinbase wallet</span>
            </div>
            <div className={styles['button-group']}>
              <Button className={styles['connect-btn']} onClick={onClick}>
                Contact Service
              </Button>
              <Button className={styles['connect-btn']} onClick={onRepay}>
                Try Again
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles['success-message']}>Success</div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                Please complete the payment in{' '}
              </span>
              <span className={styles['highlight-text']}>coinbase wallet</span>
            </div>
            <div className={styles['button-group']}>
              <Button className={styles['connect-btn']} onClick={onClick}>
                Return to purchase
              </Button>
              <Button className={styles['connect-btn']} onClick={onContinue}>
                Check instances
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles['process-message']}>Payment in progress</div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                Please complete the payment in{' '}
              </span>
              <span className={styles['highlight-text']}>coinbase wallet</span>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable={true}
      className={styles['payment-result-modal']}
      width={660}
    >
      <div className={styles['payment-result']}>
        <div className={styles['outer-box']}>
          <div className={styles['box__layout']}>{renderContent()}</div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentResultModal;
