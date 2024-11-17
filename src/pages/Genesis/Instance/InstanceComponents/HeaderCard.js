import React from 'react';
import { Card } from 'antd';
import styles from './headerCard.less';

export default function HeaderCard({ summary }) {
  const data = [
    {
      name: 'Cloud server',
      value: summary?.total,
      color: 'white',
    },
    {
      name: 'Running',
      value: summary?.running,
      color: 'white',
    },
    {
      name: 'Expiring Soon',
      value: summary?.expiring_soon,
      color: 'yellow',
    },
    {
      name: 'Expired',
      value: summary?.expired,
      color: 'red',
    },
  ];
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <Card className={styles['card']}>
      <div className={styles['card-header']}>
        <h2>My Resources</h2>
        <span className={styles['refresh']} onClick={handleRefresh}>
          <i className="iconfont icon-refresh"></i>
          Refresh
        </span>
      </div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <p className={styles[`${item.color}`]}>{item.value || 0}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
