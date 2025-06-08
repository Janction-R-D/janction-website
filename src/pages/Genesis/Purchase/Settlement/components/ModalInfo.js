import { Modal } from 'antd';
import styles from './index.less';
export default function ModalInfo({ open, onClose, onOk }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onOk}
      footer={null}
      centered
      closable={true}
      className={styles['payment-result-modal']}
      width={660}
    >
      <div className={styles['payment-result']}>
        <div className={styles['outer-box']}>
          <div className={styles['success-message']}>Warning</div>
          <div className={styles['instruction-text']}>
            <span className={styles['normal-text']}>
              Payment in fiat currency is not supported at this time.
            </span>
            <span className={styles['normal-text']}>
              Please go to the personal information page to link your wallet
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
