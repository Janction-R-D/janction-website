import React from 'react';
import styles from './index.less';
import { Button, message, Modal } from 'antd';
import { history, useIntl } from 'umi';

const PaymentResultModal = ({
  open,
  setOpen,
  status,
  onClose,
  onPay,
  setPaymentStatus,
}) => {
  const intl = useIntl();
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
            <div className={styles['failure-message']}>
              {intl.formatMessage({ id: 'payment.failed' })}
            </div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                {intl.formatMessage({ id: 'payment.failed.instruction1' })}{' '}
              </span>
              <span className={styles['highlight-text']}>
                {intl.formatMessage({ id: 'payment.wallet' })}
              </span>
            </div>
            <div className={styles['button-group']}>
              <Button className={styles['connect-btn']} onClick={onClick}>
                {intl.formatMessage({ id: 'payment.return' })}
              </Button>
              <Button className={styles['connect-btn']} onClick={onRepay}>
                {intl.formatMessage({ id: 'payment.retry' })}
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles['success-message']}>
              {intl.formatMessage({ id: 'payment.success' })}
            </div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                {intl.formatMessage({ id: 'payment.success.instruction1' })}{' '}
              </span>
              <span className={styles['highlight-text']}>
                {intl.formatMessage({ id: 'payment.wallet' })}
              </span>
            </div>
            <div className={styles['button-group']}>
              <Button className={styles['connect-btn']} onClick={onClick}>
                {intl.formatMessage({ id: 'payment.return' })}
              </Button>
              <Button className={styles['connect-btn']} onClick={onContinue}>
                {intl.formatMessage({ id: 'payment.continue' })}
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles['process-message']}>
              {intl.formatMessage({ id: 'payment.processing' })}
            </div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                {intl.formatMessage({ id: 'payment.processing.instruction1' })}{' '}
              </span>
              <span className={styles['highlight-text']}>
                {intl.formatMessage({ id: 'payment.wallet' })}
              </span>
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
