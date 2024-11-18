import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './modal.less';
import ReminderModal from './ReminderEmail';

function Edit({ handleCancel, isModalOpen, handleOk }) {
  const [error, setError] = useState(false);
  const handleConfirm = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
      //   handleOk();
    }, 2500);
  };
  return (
    <Modal
      className={styles['card-modal-email']}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      header={false}
      height={300}
      width={400}
      closable={false}
    >
      <header>
        <p>Email Address</p>
        <i className="iconfont icon-close" onClick={handleCancel}></i>
      </header>

      <div className={styles['card-emails']}>
        <Input
          placeholder="Email address"
          className={styles['email-box']}
          suffix={<p className={styles['text-blue']}>Send a code</p>}
          bordered={false}
        />
        <div>
          <Input
            placeholder="Email code"
            className={`${styles['email-box']} ${
              error ? styles['email-box-error'] : ''
            }`}
            bordered={false}
          />
          {error && <p>Check failure</p>}
        </div>
      </div>

      <footer className={styles['buttons']}>
        <Button className={styles['cancel-btn']} onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={styles['create-btn']} onClick={handleConfirm}>
          Verify
        </Button>
      </footer>
    </Modal>
  );
}

export default function EmailConfig({
  isEmailConfigOpen,
  setIsEmailConfigOpen,
  setIsRemindOpen,
  setIsEmailModalOpen,
}) {
  const handleCancel = () => {
    setIsEmailConfigOpen(false);
  };
  const handleOk = async () => {
    // await setIsEmailConfigOpen(false);
    // await setIsRemindOpen(false);
    // setIsEmailModalOpen(false);
  };
  return (
    <Edit
      handleCancel={handleCancel}
      isModalOpen={isEmailConfigOpen}
      handleOk={handleOk}
    />
  );
}
