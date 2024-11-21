import { useEffect, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './modal.less';

function Edit({ handleCancel, isModalOpen, handleOk, setName, name }) {
  const [input, setInput] = useState(name);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = () => {
    if (input === '') return;
    setName(input);
    handleOk();
  };
  useEffect(() => {
    console.log(name);
    setInput(name);
  }, []);
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
        <i className="iconfont icon-close" onClick={handleCancel}></i>
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
        <Button className={styles['create-btn']} onClick={handleClick}>
          Confirm
        </Button>
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
