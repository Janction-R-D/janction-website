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
    history.push('/genesis/purchase');
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
    history.replace('/genesis/instance');
  };
  const renderContent = () => {
    switch (status) {
      case 1:
        return (
          <>
            <div className={styles['failure-message']}>Payment Failed</div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                The payment was not successful. Please try again using your{' '}
              </span>
              <span className={styles['highlight-text']}> Wallet</span>
            </div>
            <div className={styles['button-group']}>
              <Button className={styles['connect-btn']} onClick={onClick}>
                Return to Purchase
              </Button>
              <Button className={styles['connect-btn']} onClick={onRepay}>
                Retry Payment
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles['success-message']}>Payment Successful</div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                Your payment has been completed via{' '}
              </span>
              <span className={styles['highlight-text']}> Wallet</span>
            </div>
            <div className={styles['button-group']}>
              <Button className={styles['connect-btn']} onClick={onClick}>
                Return to Purchase
              </Button>
              <Button className={styles['connect-btn']} onClick={onContinue}>
                View Instances
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles['process-message']}>Payment In Progress</div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                Payment is being processed, please wait in your{' '}
              </span>
              <span className={styles['highlight-text']}> Wallet</span>
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
      // onCancel={onClose}
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
