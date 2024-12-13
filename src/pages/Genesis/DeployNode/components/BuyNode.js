import React, { useEffect, useState } from 'react';
import buy from '@/assets/images/genesis/buy.png';
import purchase from '@/assets/images/genesis/purchase.png';
import { Button, Input, Modal } from 'antd';
import styles from './node.less';
export default function BuyNode({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPay, setIsPay] = useState(true);

  const handleOk = () => {
    setIsOpen(true);
  };
  const handleOkPay = () => {
    setIsPay(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleCancelPay = () => {
    setIsPay(false);
  };
  const handlePay = () => {
    setIsOpen(false);

    setTimeout(() => {
      setIsPay(true);
      console.log(isPay);
    }, 500);
  };

  return (
    <>
      <div className={styles['btn']} onClick={handleOk}>
        Buy Now!
      </div>
      <PayCaard
        isPay={isPay}
        setIsPay={setIsPay}
        handleCancelPay={handleCancelPay}
        handleOkPay={handleOkPay}
      />
      <Modal
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={styles['modal']}
        width={900}
        footer={false}
      >
        <div className={styles['modal-img']}>
          <img src={buy} />
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
            <Button className={styles['buy-btn']} onClick={handlePay}>
              Click to pay
            </Button>

            <p className={styles['text-grey']}>
              Surrender your rights, <span>Enter immediately</span>
            </p>
          </div>
        </section>
      </Modal>
    </>
  );
}

function PayCaard({ isPay, setIsPay, handleCancelPay, handleOkPay }) {
  const handlePay = () => {
    setIsPay(true);
  };

  return (
    <Modal
      open={isPay}
      onOk={handleOkPay}
      onCancel={handleCancelPay}
      className={styles['modal-purchase']}
      width={900}
      footer={false}
    >
      <div className={styles['modal-img']}>
        <img src={purchase} />
        <section>
          <p>
            <i className="iconfont icon-list"></i> Details
          </p>
          <ul>
            <li>
              <p>Status:</p>
              <p>Complete</p>
            </li>
            <li>
              <p>Transaction Hash:</p>
              <p>0xe3802293</p>
            </li>
            <li>
              <p>ID:</p>
              <p>73489024hu094invm</p>
            </li>
            <li>
              <p>Contract address:</p>
              <p>4678ghrtcgmgc</p>
            </li>
          </ul>
        </section>
      </div>
      <section className={styles['modal-info']}>
        <h2>Your purchase has been processed! </h2>
        <p>Congratulations on joining the Janction Contributor Network!</p>

        <div>
          <Button className={styles['buy-btn']} onClick={handlePay}>
            Check rewards
          </Button>
        </div>
      </section>
    </Modal>
  );
}
