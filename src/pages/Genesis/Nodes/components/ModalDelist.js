import React, { useState } from 'react';
import { Modal, Checkbox, Button, message } from 'antd';
import styles from './modal.less';
import { fetchNodesConfigDelete } from '@/services/genesis';
import dayjs from 'dayjs';
import { calculateDuration } from '@/utils/datetime';
import { useIntl, FormattedMessage } from 'umi';

export default function ModalDelist({
  handleCancel,
  handleOk,
  handleSuccess,
  isModalOpen,
  record,
}) {
  const [checked, setChecked] = useState(false);
  const intl = useIntl();

  const onDelete = async () => {
    try {
      await fetchNodesConfigDelete({ node_id: record?.id });
      message.success(intl.formatMessage({ id: 'delist_success' }));
      handleCancel();
      handleSuccess();
    } catch (err) {
      console.error('『err』', err);
    }
  };

  return (
    <Modal
      className={styles['card-modal']}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      height={300}
      width={550}
    >
      <section className={styles['card-header']}>
        <h3>
          <FormattedMessage id="delist" />
        </h3>
      </section>
      <section className={styles['header-card']}>
        <i className="iconfont icon-info"></i>
        <p>
          <FormattedMessage id="delist_warning" />
        </p>
      </section>
      <section className={styles['stake-info']}>
        <div>
          <span className={styles['info-label']}>
            <FormattedMessage id="device_id" /> :
          </span>
          <p>{record?.id}</p>
        </div>
        <div>
          <span className={styles['info-label']}>
            <FormattedMessage id="listed_time" />:
          </span>
          <p>
            {record?.last_start_at
              ? dayjs(record?.last_start_at).format('YYYY-MM-DD HH:mm:ss')
              : '--'}
          </p>
        </div>
        <div>
          <span className={styles['info-label']}>
            <FormattedMessage id="run_time" />:
          </span>
          <p>
            {calculateDuration(record?.last_start_at, { showSeconds: false })}
          </p>
        </div>

        <div>
          <Checkbox onClick={() => setChecked(!checked)}>
            <div className={styles['stake-check']}>
              <p>
                <FormattedMessage id="confirm_clause" />{' '}
                <span className={styles['blue']}>
                  <FormattedMessage id="clause_terms" />
                </span>
                。
              </p>
            </div>
          </Checkbox>
        </div>
        <section className={styles['buttons']}>
          <div className={styles['pre']}>
            <Button onClick={handleCancel}>
              <FormattedMessage id="cancel" />
            </Button>
          </div>
          <Button
            disabled={!checked}
            className={styles['create-btn']}
            onClick={onDelete}
          >
            <FormattedMessage id="delist" />
          </Button>
        </section>
      </section>
    </Modal>
  );
}
