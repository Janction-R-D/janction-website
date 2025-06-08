import { Modal } from 'antd';
import styles from './index.less';
export default function ModalInfo({ open, onClose }) {
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
          Payment in fiat currency is not supported at this time. Please go to
          the personal information page to link your wallet
        </div>
      </div>
    </Modal>
  );
}
