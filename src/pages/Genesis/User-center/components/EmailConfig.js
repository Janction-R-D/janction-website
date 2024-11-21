import { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import styles from './modal.less';

import { fetchBindEmail } from '@/services/genesis';
function Edit({ handleCancel, isModalOpen, handleOk }) {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const handleConfirm = () => {
    if (email === '') {
      handleOk();
      return;
    }
    const data = {
      email,
    };

    fetchBindEmail(data)
      .then((res) => {
        console.log(res);
        handleOk();
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2500);
      });
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
        <div>
          <Input
            placeholder="Email address"
            className={`${styles['email-box']} ${
              error ? styles['email-box-error'] : ''
            }`}
            type="email"
            // suffix={<p className={styles['text-blue']}>Send a code</p>}
            bordered={false}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p>Enter a valid email</p>}
        </div>
        {/* <div>
          <Input
            placeholder="Email code"
            className={`${styles['email-box']} ${
              error ? styles['email-box-error'] : ''
            }`}
            bordered={false}
          />
          {error && <p>Check failure</p>}
        </div> */}
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
}) {
  const handleCancel = () => {
    setIsEmailConfigOpen(false);
  };
  const handleOk = async () => {
    setIsEmailConfigOpen(false);
  };
  return (
    <Edit
      handleCancel={handleCancel}
      isModalOpen={isEmailConfigOpen}
      handleOk={handleOk}
    />
  );
}
