import React, { useState } from 'react';
import { Modal, Checkbox, Button, message } from 'antd';
import styles from './modal.less';
import { check } from 'prettier';
import { fetchNodesConfigDelete } from '@/services/genesis';
import dayjs from 'dayjs';
import { calculateDuration } from '@/utils/datetime';
export default function ModalDelist({
  handleCancel,
  handleOk,
  handleSuccess,
  isModalOpen,
  record,
}) {
  const [checked, setChecked] = useState(false);

  const onDelete = async () => {
    try {
      await fetchNodesConfigDelete({ node_id: record?.id });
      message.success('delist success!');
      handleCancel();
      handleSuccess();
    } catch (err) {
      console.log('『err』', err);
    }
  };

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
          <p>{record?.id}</p>
        </div>
        <div>
          <span className={styles['info-label']}>Listed time:</span>
          <p>
            {record?.last_start_at
              ? dayjs(record?.last_start_at).format('YYYY-MM-DD HH:mm:ss')
              : '--'}
          </p>
        </div>
        <div>
          <span className={styles['info-label']}>Node run time:</span>
          <p>
            {calculateDuration(record?.last_start_at, { showSeconds: false })}
          </p>
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
          <div className={styles['pre']}>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
          <Button
            disabled={!checked}
            className={styles['create-btn']}
            onClick={onDelete}
          >
            Delist
          </Button>
        </section>
      </section>
    </Modal>
  );
}
