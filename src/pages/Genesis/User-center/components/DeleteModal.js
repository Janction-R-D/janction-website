import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './modal.less';

function Edit({ handleCancel, isModalOpen, handleOk }) {
  const handleConfirm = () => {
    handleOk();
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
        <p>Delete Token</p>
        <i className="iconfont icon-close" onClick={handleCancel}></i>
      </header>
      <div className={styles['card-emails']}>
        <p>
          After deleting this token, Janction will reject all requests for this
          token. Are you sure you want to delete this token?
        </p>
      </div>
      <footer className={styles['buttons']}>
        <Button className={styles['cancel-btn']} onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={styles['cancel-btn-red']} onClick={handleConfirm}>
          Delete
        </Button>
      </footer>
    </Modal>
  );
}

export default function DeleteModal({ isDeleteModal, setIsDeleteModal }) {
  const handleCancel = () => {
    setIsDeleteModal(false);
  };
  const handleOk = async () => {
    setIsDeleteModal(false);
  };
  return (
    <Edit
      handleCancel={handleCancel}
      isModalOpen={isDeleteModal}
      handleOk={handleOk}
    />
  );
}
