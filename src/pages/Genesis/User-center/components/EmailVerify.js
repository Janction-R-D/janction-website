import { Modal } from 'antd';
import { useState } from 'react';
import styles from './modal.less';
import ReminderModal from './ReminderEmail';

export default function EmailVerify({ open, onCancel, data }) {
  const [isRemindOpen, setIsRemindOpen] = useState(false);

  const onSuccess = () => {
    setIsRemindOpen(false);
    onCancel();
  };

  return (
    <Modal
      className={styles['card-modal-email']}
      open={open}
      onCancel={onCancel}
      footer={false}
      header={false}
      height={300}
      width={400}
      closable={false}
    >
      <header>
        <p>Email Address</p>
        <i className="iconfont icon-close" onClick={onCancel}></i>
      </header>

      <div className={styles['email-box']}>
        <div>
          <i className="iconfont icon-check"></i>
          <p>{data?.email}</p>
        </div>
        <i
          className="iconfont icon-link-unlink"
          onClick={() => setIsRemindOpen(true)}
        ></i>
        <ReminderModal
          open={isRemindOpen}
          onCancel={() => setIsRemindOpen(false)}
          closeAll={onSuccess}
        />
      </div>
      <p className={styles['email-verify']}>
        By verification, you've subscribed all email notifications. You can also
        <b> manageyour subscription.</b>
      </p>
    </Modal>
  );
}
