import React, { useEffect, useState } from 'react';
import welcome from '@/assets/images/home/welcome.png';
import { Button, Input, Modal } from 'antd';
import styles from './index.less';
export default function WelcomeCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const handleOk = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    handleOk();
  }, []);
  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className={styles['modal']}
      width={900}
      footer={false}
    >
      <div className={styles['modal-img']}>
        <img src={welcome} />
      </div>
      <section className={styles['modal-info']}>
        <h2>Welcome to Janction!</h2>
        <div className={styles['input-box']}>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter the invitation code（optional）"
            className={styles['input']}
          />
          <p>*Invitation code is not required</p>
        </div>
        <Button className={styles['buy-btn']} disabled={email.length <= 0}>
          Jion Janction network
        </Button>
        <p className={styles['footer-text']}>
          Surrender your rights, <span>Enter immediately</span>
        </p>
      </section>
    </Modal>
  );
}
