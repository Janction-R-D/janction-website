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
          到达预计下架时间后，将自动退出质押状态，并退还押金，您也可以在
          Operation
          中提前申请退还押金下架节点，请注意，若提前下架，将收取部分违约金。
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
