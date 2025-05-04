import React from 'react';
import styles from './index.less';
import {
  InfoCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';

const NodeCard = ({ item }) => {
  const {
    id,
    gpu,
    status = 'running',
    yesterdayReward,
    rewarded,
    runningTime,
    listTime,
  } = item;

  const onList = () => {};
  const onDelist = () => {};
  const onReceive = () => {};
  const onReload = () => {};
  const onDelete = () => {};

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <i className="iconfont icon-nvidia" />
          <div>
            <div className={styles.id}>ID：{id}</div>
            <div className={styles.gpu}>CHIP/GPUS：{gpu}</div>
          </div>
        </div>
        <div className={styles.status}>
          <span
            className={status === 'running' ? styles.running : styles.stopped}
          >
            {status}
          </span>
          <Tooltip title="Node is active">
            <InfoCircleOutlined className={styles.infoIcon} />
          </Tooltip>
        </div>
      </div>

      <section className={styles.container}>
        <div className={styles.rewards}>
          <div className={styles.rewardBlock}>
            <div className={styles.label}>Yesterday's reward</div>
            <div className={styles.value}>
              {yesterdayReward?.toFixed(2)}{' '}
              <span className={styles.unit}>veJCT</span>
            </div>
          </div>
          <div className={styles.rewardBlock}>
            <div className={styles.label}>Rewarded</div>
            <div className={styles.value}>
              {rewarded?.toFixed(2)} <span className={styles.unit}>veJCT</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.meta}>
            <span>
              Node running time: <b>{runningTime}</b>
            </span>
            <span>
              list time: <b>{listTime}</b>
            </span>
          </div>
          <div className={styles.actions}>
            <span onClick={onList}>List</span>
            <span className={styles.divider}>|</span>
            <span onClick={onDelist}>Delist</span>
            <span className={styles.divider}>|</span>
            <span className={styles.receive} onClick={onReceive}>
              Receive Rewards
            </span>
            <span className={styles.divider}>|</span>
            <ReloadOutlined onClick={onReload} className={styles.iconBtn} />
            <DeleteOutlined onClick={onDelete} className={styles.iconBtn} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NodeCard;
