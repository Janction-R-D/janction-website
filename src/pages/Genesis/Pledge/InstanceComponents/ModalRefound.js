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
          到达预计下架时间后，将自动退出质押状态，并退还押金。若提前下架，将收取违约金。
        </p>
      </section>
      <section className={styles['stake-info']}>
        <div>
          <span className={styles['info-label']}>计划下架时间 :</span>
          <p>2020-09-31</p>
        </div>
        <div>
          <span className={styles['info-label']}>
            仅退还 : <i className="iconfont icon-info"></i>
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
