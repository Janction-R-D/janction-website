import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './modal.less';
import ReminderModal from './ReminderEmail';

function Edit({ handleCancel, isModalOpen, setIsEmailModalOpen, handleOk }) {
  const [isRemindOpen, setIsRemindOpen] = useState(false);
  const showModal = () => {
    setIsRemindOpen(true);
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

      <div className={styles['email-box']}>
        <div>
          <i className="iconfont icon-check"></i>
          <p>Naila23523@gmail.com</p>
        </div>
        <i className="iconfont icon-link-unlink" onClick={showModal}></i>
        <ReminderModal
          isRemindOpen={isRemindOpen}
          setIsRemindOpen={setIsRemindOpen}
          setIsEmailModalOpen={setIsEmailModalOpen}
        />
      </div>
      <p className={styles['email-verify']}>
        By verification, you've subscribed all email notifications. You can also
        <b> manageyour subscription.</b>
      </p>
      <footer className={styles['buttons']}>
        <Button className={styles['cancel-btn']} onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={styles['create-btn']}>Verify</Button>
      </footer>
    </Modal>
  );
}

export default function EmailVerify({ isEmailModalOpen, setIsEmailModalOpen }) {
  const handleCancel = () => {
    setIsEmailModalOpen(false);
  };
  const handleOk = () => {
    setIsEmailModalOpen(false);
  };
  return (
    <Edit
      handleCancel={handleCancel}
      isModalOpen={isEmailModalOpen}
      handleOk={handleOk}
      setIsEmailModalOpen={setIsEmailModalOpen}
    />
  );
}
