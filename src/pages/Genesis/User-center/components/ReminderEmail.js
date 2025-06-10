import { Button, Modal } from 'antd';
import { useState } from 'react';
import styles from './modal.less';
import Bind from './Bind';

export default function ReminderModal({
  open,
  onCancel,
  closeAll,
  setIsEmailConfigOpen,
}) {
  const showEmailConf = () => {
    onCancel();

    setTimeout(() => {
      setIsEmailConfigOpen(true);
    }, 1000);
  };

  return (
    <Modal
      className={styles['card-modal-reminder']}
      open={open}
      onCancel={onCancel}
      footer={false}
      header={false}
      height={300}
      width={400}
      closable={false}
    >
      <header>
        <p>Reminder</p>
        <i className="iconfont icon-close" onClick={onCancel}></i>
      </header>
      <p>
        The existing access token will be invalid after a new access token is
        generated.
      </p>
      <footer className={styles['buttons']}>
        <Button className={styles['cancel-btn']} onClick={onCancel}>
          Cancel
        </Button>
        <Button className={styles['create-btn']} onClick={showEmailConf}>
          Confirm
        </Button>
      </footer>
    </Modal>
  );
}
