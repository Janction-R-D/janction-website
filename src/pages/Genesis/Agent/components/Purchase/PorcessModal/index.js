import React from 'react';
import { Modal } from 'antd';
import styles from './index.less';

import StepButton from '../../StepButton';

const PaymentResultModal = ({ open, status, onClose }) => {
  const onClick = () => {
    console.log('Create Agent Button Clicked');
  };

  const renderContent = () => {
    switch (status) {
      case 1:
        return (
          <>
            <div className={styles['failure-message']}>Payment Failure</div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                Please complete the payment in
              </span>
              <span className={styles['"highlight-text"']}>
                {' '}
                coinbase wallet
              </span>
            </div>
            <div className={styles['"try-again-button"']} onClick={onClick}>
              <div className={styles['button-bg']} />
              <div className={styles['button-text']}> Try Again</div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles['success-message']}> Successes</div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                Please complete the payment in coinbase wallet
              </span>
              <span className={styles['highlight-text']}> coinbase wallet</span>
            </div>
            <StepButton onClick={onClick} text={'Check instances'} />
          </>
        );
      case 3:
        return (
          <>
            <div className={styles['process-message']}>Payment in progress</div>
            <div className={styles['instruction-text']}>
              <span className={styles['normal-text']}>
                Please complete the payment in
              </span>
              <span className={styles['highlight-text']}> coinbase wallet</span>
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
      closable={false}
      className={styles['payment-result-modal']}
      width={660}
    >
      <div className={styles['icon']} onClick={onClose}>
        <i className="iconfont icon-close " />
      </div>
      <div className={styles['payment-result']}>
        <div className={styles['outer-box']}>
          <div className={styles['box__layout']}>{renderContent()}</div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentResultModal;
