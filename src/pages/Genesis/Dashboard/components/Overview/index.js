import React from 'react';
import styles from './index.less';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const mockOverviewData = [
  {
    id: 'sacnksbjrs341342dgness',
    status: 'Running',
    reward: '100 JTT',
  },
  {
    id: 'sacnksbjrs341342dgness',
    status: 'Listed',
    reward: '100 JTT',
  },
  {
    id: 'sacnksbjrs341342dgness',
    status: 'Running',
    reward: '100 JTT',
  },
  {
    id: 'sacnksbjrs341342dgness',
    status: 'Running',
    reward: '100 JTT',
  },
];

const StatusTag = ({ status }) => {
  const isRunning = status === 'Running';
  const isListed = status === 'Listed';
  const color = isRunning ? '#FFA94D' : isListed ? '#aaa' : '#ccc';

  return (
    <span style={{ color }}>
      {status}{' '}
      <Tooltip title={status}>
        <InfoCircleOutlined style={{ fontSize: 12 }} />
      </Tooltip>
    </span>
  );
};

const OverviewTable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.title}>Overview</div>
        <div className={styles.desc}>
          Your personal
          <br />
          speed mining node
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div>Device ID</div>
          <div>Status</div>
          <div>rewarded</div>
        </div>
        {mockOverviewData.map((item, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.cell_title}>{item.id}</div>
            <div className={styles.cell}>
              <StatusTag status={item.status} />
            </div>
            <div className={styles.cell}>{item.reward}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewTable;
