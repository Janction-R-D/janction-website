import React from 'react';
import { Modal, Button } from 'antd';
import styles from './index.less';

export default function SuccessModal({ visible, onClose, onConfirm }) {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      closable
      className={styles.successModal}
    >
      <div className={styles.content}>
        <div>
          <h2>Great !</h2>
          <p>registration is complete.</p>
        </div>

        <Button block className={styles.button} onClick={onConfirm}>
          Comfirm
          <div className={styles['icon']}>
            <i className="iconfont icon-next" style={{ fontSize: '10px' }} />
          </div>
        </Button>
      </div>
    </Modal>
  );
}
