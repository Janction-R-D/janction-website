import { useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './modal.less';

function RefreshToken({ handleCancel, isModalOpen, handleOk }) {
  return (
    <Modal
      className={styles['card-modal-token']}
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
        <p>Reminder</p>
        <i className="iconfont icon-close" onClick={handleCancel}></i>
      </header>
      <p>
        The existing access token will be invalid after a new access token is
        generated.
      </p>
      <footer className={styles['buttons']}>
        <Button className={styles['cancel-btn']} onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={styles['create-btn']}>Confirm</Button>
      </footer>
    </Modal>
  );
}

export default function TokenModal({ isTokenModalOpen, setIsTokenModalOpen }) {
  const handleCancel = () => {
    setIsTokenModalOpen(false);
  };
  const handleOk = () => {
    setIsTokenModalOpen(false);
  };
  return (
    <RefreshToken
      handleCancel={handleCancel}
      isModalOpen={isTokenModalOpen}
      handleOk={handleOk}
    />
  );
}
