import React from 'react';
import styles from './index.less';
import { Button, Modal } from 'antd';

const PaymentResultModal = ({ open, status, onClose }) => {
  const onClick = () => {
    console.log('Create Agent Button Clicked');
  };

  const renderContent = () => {
    switch (status) {
      case 1:
        return (
          <div className={'box__layout'}>
            <div className="failure-message">Payment Failure</div>
            <div className="instruction-text">
              <span className="normal-text">
                Please complete the payment in{' '}
              </span>
              <span className="highlight-text"> coinbase wallet</span>
            </div>
            <div>
              <Button onClick={onClick} title="Contact Service"></Button>
              <Button onClick={onClick} title="try Again"></Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={'box__layout'}>
            <div className="success-message">Successes</div>
            <div className="instruction-text">
              <span className="normal-text">
                Please complete the payment in
              </span>
              <span className="highlight-text"> coinbase wallet</span>
            </div>
            <div>
              <Button onClick={onClick} title="Return to purchase"></Button>
              <Button onClick={onClick} title="Check instances"></Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={'box__layout'}>
            <div className="process-message">Payment in progress</div>
            <div className="instruction-text">
              <span className="normal-text">
                Please complete the payment in{' '}
              </span>
              <span className="highlight-text"> coinbase wallet</span>
            </div>
          </div>
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
      <div className="payment-result">
        <div className="outer-box">
          <div className="box__layout">{renderContent()}</div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentResultModal;
