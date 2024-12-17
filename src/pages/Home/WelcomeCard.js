import React, { useEffect, useState } from 'react';
import welcome from '@/assets/images/home/welcome.png';
import { Button, Input, Modal } from 'antd';
import styles from './index.less';
import { fetchInviteAccept } from '@/services/genesis';
import { history, useLocation } from 'umi';
export default function WelcomeCard() {
  const location = useLocation();

  const codeLink = location.search.split('=')[1];
  const isCodeLink = codeLink?.length > 1;
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState(isCodeLink ? codeLink : '');
  const handleOk = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!isCodeLink) return;
    handleOk();
  }, []);
  const handleSubmit = () => {
    // localStorage.setItem('invitation-code', code);
    history.push(`/deployNodes?inviterCode=${code}`, {
      inviterCode: code,
    });
  };
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
            defaultValue={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the invitation code（optional）"
            className={styles['input']}
          />
          <p>*Invitation code is not required</p>
        </div>
        <Button
          className={styles['buy-btn']}
          disabled={code.length <= 0}
          onClick={handleSubmit}
        >
          Join Janction network
        </Button>
        <p className={styles['footer-text']}>
          Surrender your rights, <span>Enter immediately</span>
        </p>
      </section>
    </Modal>
  );
}
