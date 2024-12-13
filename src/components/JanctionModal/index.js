import { Modal } from 'antd';
import styles from './index.less';

const JanctionModal = (props) => {
  const {
    footer,
    footerCenter,
    className,
    children,
    onCancel,
    onOk,
    cancelText,
    okText,
    ...extraProps
  } = props;
  return (
    <Modal
      centered
      className={[styles['janction-modal'], className].join(' ')}
      onCancel={onCancel}
      {...extraProps}
      footer={
        footer || (
          <div
            className={styles['janction-modal-footer']}
            style={{
              justifyContent: footerCenter ? 'center' : 'flex-end',
            }}
          >
            {onCancel && (
              <div className={styles['cancel']} onClick={onCancel}>
                {cancelText || 'Cancel'}
              </div>
            )}
            {onOk && (
              <div className={styles['ok']} onClick={onOk}>
                {okText || 'Save'}
              </div>
            )}
          </div>
        )
      }
    >
      {children}
    </Modal>
  );
};

export default JanctionModal;
