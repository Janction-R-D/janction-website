import { useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './modal.less';
import EmailConfig from './EmailConfig';

function Remind({
  handleCancel,
  isModalOpen,
  handleOk,
  setIsRemindOpen,
  setIsEmailModalOpen,
}) {
  const [isEmailConfigOpen, setIsEmailConfigOpen] = useState(false);
  const showEmailConf = () => {
    setIsEmailConfigOpen(true);
  };
  return (
    <Modal
      className={styles['card-modal-reminder']}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      header={false}
      height={300}
      width={400}
      closable={false}
      style={{ top: '120px' }}
    >
      <header>
        <p>Reminder</p>
        <i className="iconfont icon-close"></i>
      </header>
      <p>
        The existing access token will be invalid after a new access token is
        generated.
      </p>
      <footer className={styles['buttons']}>
        <Button className={styles['cancel-btn']} onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={styles['create-btn']} onClick={showEmailConf}>
          Confirm
        </Button>
        <EmailConfig
          isEmailConfigOpen={isEmailConfigOpen}
          setIsEmailConfigOpen={setIsEmailConfigOpen}
          setIsRemindOpen={setIsRemindOpen}
          setIsEmailModalOpen={setIsEmailModalOpen}
        />
      </footer>
    </Modal>
  );
}

export default function ReminderModal({
  isRemindOpen,
  setIsRemindOpen,
  setIsEmailModalOpen,
}) {
  const handleCancel = () => {
    setIsRemindOpen(false);
  };
  const handleOk = () => {
    setIsRemindOpen(false);
    setIsEmailModalOpen(false);
  };
  return (
    <Remind
      handleCancel={handleCancel}
      isModalOpen={isRemindOpen}
      handleOk={handleOk}
      setIsEmailModalOpen={setIsEmailModalOpen}
      setIsRemindOpen={setIsRemindOpen}
    />
  );
}
