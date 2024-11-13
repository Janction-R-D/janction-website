import React, { useState } from 'react';
import { Modal, Checkbox, Button } from 'antd';
import styles from './modal.less';
import { check } from 'prettier';
export default function ModalDelist({
  handleCancel,
  handleOk,
  isModalOpen,
  record,
}) {
  const [checked, setChecked] = useState(false);

  return (
    <Modal
      className={styles['card-modal']}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      //   footer={true}
      height={300}
      width={550}
    >
      <section className={styles['card-header']}>
        <h3>Delist</h3>
      </section>
      <section className={styles['header-card']}>
        <i className="iconfont icon-info"></i>
        <p>
          Before the node is removed from the shelves, please confirm that no
          users are bound to the instance to avoid unnecessary losses to you and
          others
        </p>
      </section>
      <section className={styles['stake-info']}>
        <div>
          <span className={styles['info-label']}>Device ID :</span>
          <p>2020-09-31</p>
        </div>
        <div>
          <span className={styles['info-label']}>Listed time:</span>
          <p>2020-09-31 09:23</p>
        </div>
        <div>
          <span className={styles['info-label']}>Node run time:</span>
          <p>4 Days 23Hrs 19Mins</p>
        </div>

        <div>
          <Checkbox onClick={() => setChecked(!checked)}>
            <div className={styles['stake-check']}>
              <p>
                I have read and agreed to the{' '}
                <span className={styles['blue']}>relevant service terms</span>.
              </p>
            </div>
          </Checkbox>
        </div>
        <section className={styles['buttons']}>
          <Button disabled={!checked} className={styles['create-btn']}>
            Stake
          </Button>
          <div className={styles['pre']}>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </section>
      </section>
    </Modal>
  );
}
