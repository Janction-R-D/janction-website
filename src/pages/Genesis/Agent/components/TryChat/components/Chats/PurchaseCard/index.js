import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import image from '@/assets/images/genesis/agent/agent_1.png';
import { onNavigate } from '@/pages/Genesis/Agent/utils';
export default function PurchaseCard({ onOpen, isOpen, setIsOpen }) {
  const [selected, setSelected] = useState('1month');
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onOk={handleCancel}
      onCancel={handleCancel}
      closable={false}
      className={styles['backdrop-modal']}
      footer={false}
      //   width={600}
    >
      <section>
        <div className={styles['left-column']}>
          <div className={styles['title']}>Purchase Agents</div>

          <span> Price </span>
          <div className={styles['price-options']}>
            <div
              className={`${styles['price-option']} ${
                styles[selected === '1month' ? 'active' : '']
              }`}
              onClick={() => setSelected('1month')}
            >
              <div className={styles['amount']}>0.2 usdt</div>
              <div className={styles['duration']}>1 month</div>
            </div>

            <div
              className={`${styles['price-option']} ${
                styles[selected === 'permanent' ? 'active' : '']
              }`}
              onClick={() => setSelected('permanent')}
            >
              <div className={styles['amount']}>10 usdt</div>
              <div className={styles['duration']}>Permanent</div>
            </div>
          </div>
          <div className={styles['button-box']}>
            <Button
              className={styles['submit-button']}
              onClick={() => onNavigate('purchase', location.pathname)}
            >
              Submit
            </Button>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.card}>
          <img className={styles.image} src={image} alt="FinChat AI" />
          <div className={styles.overlay}>
            <div className={styles.description}>
              <div className={styles.description_left}>
                <div className={styles.title}> FinChat AI</div>
                <div className={styles.score}>Score: 9.9</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}
