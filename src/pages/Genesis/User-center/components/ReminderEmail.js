import { Button, Modal } from 'antd';
import { useState } from 'react';
import BindEmail from './BindEmail';
import styles from './modal.less';

export default function ReminderModal({ open, onCancel, closeAll }) {
  const [isEmailConfigOpen, setIsEmailConfigOpen] = useState(false);

  const onSuccess = async () => {
    closeEmailConf();
    closeAll();
  };

  const closeEmailConf = () => {
    setIsEmailConfigOpen(false);
  };

  const showEmailConf = () => {
    setIsEmailConfigOpen(true);
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
        <BindEmail
          open={isEmailConfigOpen}
          onCancel={closeEmailConf}
          closeAll={onSuccess}
        />
      </footer>
    </Modal>
  );
}
