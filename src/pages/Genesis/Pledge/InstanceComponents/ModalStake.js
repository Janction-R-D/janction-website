import React, { useState } from 'react';
import { Modal, Checkbox, Button } from 'antd';
import styles from './modal.less';
export default function ModalStake({ handleCancel, handleOk, isModalOpen }) {
  return (
    <Modal
      className={styles['card-modal']}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      //   footer={false}
      height={300}
      width={450}
    >
      <section className={styles['card-header']}>
        <h3>Stake Payment</h3>
      </section>
      <section className={styles['header-card']}>
        <p>
          When the estimated delisting time arrives, the staking status will be
          automatically exited and the deposit will be refunded. You can also
          apply for a deposit refund and delist the node in advance in
          Operation. Please note that if you delist in advance, a partial
          penalty will be charged.
        </p>
      </section>
      <section className={styles['stake-info']}>
        <div>
          <span className={styles['info-label']}>Device ID :</span>
          <p>crhigrncr785622nnvgc488</p>
        </div>
        <div>
          <span className={styles['info-label']}>Prise :</span>
          <b className={styles['stake-info-price']}>100JJT</b>
        </div>
        <div>
          <Checkbox>
            <div className={styles['stake-check']}>
              <p>
                I have read and agreed to the{' '}
                <span className={styles['blue']}>relevant service terms</span>.
              </p>
            </div>
          </Checkbox>
        </div>
        <section className={styles['buttons']}>
          <Button className={styles['create-btn']}>Stake</Button>
          <div className={styles['pre']}>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </section>
      </section>
    </Modal>
  );
}
