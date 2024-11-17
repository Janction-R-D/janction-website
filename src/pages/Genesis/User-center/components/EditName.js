import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './modal.less';

function Edit({ handleCancel, isModalOpen, handleOk, setName, name }) {
  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <Modal
      className={styles['card-modal-username']}
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
        <p>Edit Username</p>
        <i className="iconfont icon-close"></i>
      </header>
      <Input
        className={styles['input-name']}
        placeholder="Enter New Name"
        defaultValue={name}
        onChange={handleChange}
        maxLength={20}
        suffix={`${name?.length}/20`}
      />

      <footer className={styles['buttons']}>
        <Button className={styles['cancel-btn']} onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={styles['create-btn']}>Confirm</Button>
      </footer>
    </Modal>
  );
}

export default function EditName({
  isNameModalOpen,
  setIsNameModalOpen,
  setName,
  name,
}) {
  const handleCancel = () => {
    setIsNameModalOpen(false);
  };
  const handleOk = () => {
    setIsNameModalOpen(false);
  };
  return (
    <Edit
      handleCancel={handleCancel}
      isModalOpen={isNameModalOpen}
      handleOk={handleOk}
      setName={setName}
      name={name}
    />
  );
}
