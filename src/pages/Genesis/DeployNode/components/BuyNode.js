import React, { useEffect, useState } from 'react';
import welcome from '@/assets/images/home/welcome.png';
import { Button, Input, Modal } from 'antd';
import styles from './node.less';
export default function BuyNode({ item }) {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const handleOk = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles['btn']} onClick={handleOk}>
        Buy Now!
      </div>

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
          <h2>Buy Janction Node</h2>
          <p>
            After purchasing this NFT, participate in the network of computing
            power providers!
          </p>
          <div className={styles['input-box']}>
            <i className="iconfont icon-my-nodes"></i>
            <p>1,000 USDT</p>
          </div>
          <div>
            <Button className={styles['buy-btn']}>Click to pay</Button>
            <p className={styles['text-grey']}>
              Surrender your rights, <span>Enter immediately</span>
            </p>
          </div>
        </section>
      </Modal>
    </>
  );
}
