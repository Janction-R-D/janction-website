import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './index.less';

function Edit({ loading, handleCancel, isModalOpen, handleOk }) {
  return (
    <Modal
      className={styles['card-modal-hosting']}
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
        <p>Unescrow</p>
        <i className="iconfont icon-close" onClick={handleCancel}></i>
      </header>

      <div className={styles['info-box']}>
        Hosting will charge a Mining Machine Management fee of{' '}
        <span className={styles['earnings']}>10%</span>
      </div>
      <p className={styles['email-verify']}>
        TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText
        TextTextTextT
      </p>
      <footer className={styles['buttons']}>
        <Button
          disabled={loading}
          className={styles['pre']}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          className={styles['create-btn']}
          onClick={handleOk}
        >
          confirm
        </Button>
      </footer>
    </Modal>
  );
}

export default function Unescrow({
  loading,
  islModalOpen,
  setIslModalOpen,
  handleOk,
}) {
  const handleCancel = () => {
    setIslModalOpen(false);
  };

  return (
    <Edit
      loading={loading}
      handleCancel={handleCancel}
      isModalOpen={islModalOpen}
      handleOk={handleOk}
      setIslModalOpen={setIslModalOpen}
    />
  );
}
