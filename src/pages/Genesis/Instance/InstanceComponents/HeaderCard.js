import React from 'react';
import { Card } from 'antd';
import styles from './headerCard.less';

export default function HeaderCard() {
  const data = [
    {
      name: 'Cloud server',
      value: 46,
      color: 'white',
    },
    {
      name: 'Running',
      value: 23,
      color: 'white',
    },
    {
      name: 'Expiring Soon',
      value: 23,
      color: 'yellow',
    },
    {
      name: 'Expired',
      value: 1,
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
            <p className={styles[`${item.color}`]}>{item.value}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
