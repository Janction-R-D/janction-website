import React, { useState } from 'react';
import { Modal, Checkbox, Button } from 'antd';
import styles from './modal.less';
export default function ModalRefound({ handleCancel, handleOk, isModalOpen }) {
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
        <h3>Refund in advance</h3>
      </section>
      <section className={styles['header-card']}>
        <p>
          After reaching the expected delisting time, the node will
          automatically exit the staking state and the deposit will be refunded.
          If delisted early, a penalty fee will be charged.
        </p>
      </section>
      <section className={styles['stake-info']}>
        <div>
          <span className={styles['info-label']}>Planned delisting time :</span>
          <p>2020-09-31</p>
        </div>
        <div>
          <span className={styles['info-label']}>
            Refund only : <i className="iconfont icon-info"></i>
          </span>
          <b className={styles['stake-info-price--blue']}>60 veJCT</b>
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
          <Button className={styles['create-btn']}>Withdraw</Button>
          <div className={styles['pre']}>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </section>
      </section>
    </Modal>
  );
}
