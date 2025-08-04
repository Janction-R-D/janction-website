import React from 'react';
import { Modal } from 'antd';
import styles from './index.less';
const PaymentMethodModal = ({
  payNowModalVisible,
  children,
  setPayNowModalVisible,
}) => {
  return (
    <Modal
      open={payNowModalVisible}
      title="Choose Payment Method"
      onCancel={() => setPayNowModalVisible(false)}
      footer={null}
      destroyOnClose
      className={styles.customModal}
      centered
    >
      {children}
    </Modal>
  );
};

export default PaymentMethodModal;
