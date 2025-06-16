import { Button, Modal } from 'antd';
import styles from './index.less';
export default function BindWarning({
  open,
  onClose,
  onOk,
  setIsEmailModalOpen,
}) {
  const onContinue = () => {
    onClose();
    setTimeout(() => {
      setIsEmailModalOpen(true);
    }, 1000);
  };
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
          <div className={styles['process-message']}>Bind email</div>
          <div className={styles['instruction-text']}>
            <span className={styles['normal-text']}>
              Improve personal information
            </span>
          </div>
          <div className={styles['button-group']}>
            <Button className={styles['connect-btn']} onClick={onClose}>
              Add later <i className="iconfont icon-clock" />
            </Button>
            <Button className={styles['connect-btn']} onClick={onContinue}>
              Go bind it
              <div className={styles['icon']}>
                <i className="iconfont icon-next" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
