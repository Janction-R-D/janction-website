import { Modal } from 'antd';
import { useState } from 'react';
import styles from './modal.less';

export default function EmailVerify({ open, onCancel, data, setIsRemindOpen }) {
  const openVerify = () => {
    onCancel();
    setTimeout(() => {
      setIsRemindOpen(true);
    }, 1000);
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
          <p>{data?.email || 'click the icon to edit'} </p>
        </div>
        <i className="iconfont icon-link-unlink" onClick={openVerify}></i>
      </div>
      <p className={styles['email-verify']}>
        By verification, you've subscribed all email notifications. You can also
        <b> manageyour subscription.</b>
      </p>
    </Modal>
  );
}
