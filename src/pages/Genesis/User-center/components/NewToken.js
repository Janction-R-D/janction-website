import { useEffect, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './modal.less';

function Edit({ handleCancel, isModalOpen, handleOk }) {
  const [input, setInput] = useState('');
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = () => {
    if (input === '') return;
    setInput('');
    handleOk();
  };
  useEffect(() => {
    setInput('');
  }, []);
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
        <p>Creat a new Token</p>
        <i className="iconfont icon-close" onClick={handleCancel}></i>
      </header>
      <section>
        <p>Remarks</p>
        <Input
          className={styles['input-name']}
          placeholder="Enter New Name"
          onChange={handleChange}
          maxLength={20}
          value={input}
          suffix={`${input?.length}/20`}
        />
      </section>
      <footer className={styles['buttons']}>
        <Button
          className={styles['cancel-btn']}
          onClick={() => {
            setInput('');
            handleCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          className={styles['create-btn']}
          onClick={handleClick}
          disabled={input?.length < 1}
        >
          Confirm
        </Button>
      </footer>
    </Modal>
  );
}

export default function NewToken({
  isNewToken,
  setIsNewToken,
  setNewToken,
  newToken,
}) {
  const handleCancel = () => {
    setIsNewToken(false);
  };
  const handleOk = () => {
    setIsNewToken(false);
  };
  return (
    <Edit
      handleCancel={handleCancel}
      isModalOpen={isNewToken}
      handleOk={handleOk}
      setNewToken={setNewToken}
      newToken={newToken}
    />
  );
}
