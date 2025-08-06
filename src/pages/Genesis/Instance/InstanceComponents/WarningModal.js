import { Button, Modal } from 'antd';
import styles from './operation.less';
import { useIntl } from 'umi';

const CustomWarningModal = ({ open, onClose }) => {
  const intl = useIntl();
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
          <span className={styles.message}>
            {' '}
            {intl.formatMessage({ id: 'modal.nodeWarning.title' })}
          </span>
        </h3>
        <p className={styles.desc}>
          {intl.formatMessage({
            id: 'modal.nodeWarning.message',
          })}
        </p>
        <div className={styles.footer}>
          <Button onClick={onClose} className={styles['connect-btn']}>
            {intl.formatMessage({
              id: 'modal.nodeWarning.button',
              defaultMessage: 'Got it',
            })}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomWarningModal;
