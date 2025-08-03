import { Button, Modal } from 'antd';
import { useState } from 'react';
import styles from './operation.less';

const CustomWarningModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      className={styles.modal}
    >
      <div className={styles.content}>
        <h3>
          <i className="iconfont icon-info" />
          <span className={styles.message}> Node Warning</span>
        </h3>
        <p className={styles.desc}>
          The node status is abnormal and cannot be terminated for now.
        </p>
        <div className={styles.footer}>
          <Button onClick={onClose} className={styles['connect-btn']}>
            Got it
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomWarningModal;
