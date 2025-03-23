import { useEffect, useState } from 'react';
import welcome from '@/assets/images/home/welcome.png';
import { Button, Input, Modal } from 'antd';
import styles from './index.less';

export default function AttentionCard() {
  const [isOpen, setIsOpen] = useState(false);

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
      width={500}
      footer={false}
      closable={false}
    >
      <section className={styles['modal-attention']}>
        <div className={styles['header']}>
          <h1>Attention!</h1>
          <i className="iconfont icon-bell" />
        </div>
        <p className={styles['modal-description']}>
          <span className={styles['text-bold']}>janction.io </span> is migrating
          to <span className={styles['text-bold']}>janction.ai </span> soon.
        </p>
        <Button className={styles['buy-btn']} onClick={handleCancel}>
          Confirm
        </Button>
      </section>
    </Modal>
  );
}
