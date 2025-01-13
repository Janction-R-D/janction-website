import { useEffect, useState } from 'react';
import { Button, Input, message, Modal } from 'antd';
import styles from './modal.less';

export default function EditName({ open, onOk, onCancel, name }) {
  const [input, setInput] = useState(name);

  useEffect(() => {
    setInput(name);
    return () => {
      setInput();
    };
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const onConfirm = () => {
    if (input?.trim() == '') {
      message.warning('please enter name!');
      return;
    }
    onOk(input);
  };

  return (
    <Modal
      className={styles['card-modal-username']}
      open={open}
      onCancel={onCancel}
      footer={false}
      header={false}
      height={300}
      width={400}
      closable={false}
    >
      <header>
        <p>Edit Username</p>
        <i className="iconfont icon-close" onClick={onCancel}></i>
      </header>
      <Input
        className={styles['input-name']}
        placeholder="Enter New Name"
        defaultValue={name}
        onChange={handleChange}
        maxLength={20}
        suffix={`${input?.length}/20`}
      />

      <footer className={styles['buttons']}>
        <Button className={styles['cancel-btn']} onClick={onCancel}>
          Cancel
        </Button>
        <Button className={styles['create-btn']} onClick={onConfirm}>
          Confirm
        </Button>
      </footer>
    </Modal>
  );
}
