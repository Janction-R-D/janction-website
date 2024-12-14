import React from 'react';
import { Card } from 'antd';
import styles from './headerCard.less';

export default function HeaderCard({ summary }) {
  const data = [
    {
      name: 'Total Wallet Balance',
      value: summary?.total,
      color: 'white',
    },
    {
      name: 'Total Active Stake',
      value: summary?.running,
      color: 'white',
    },
    {
      name: 'Total in refunding',
      value: summary?.expiring_soon,
      color: 'yellow',
    },
  ];
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <Card className={styles['card']}>
      <div className={styles['card-header']}>
        <h2>Statistical info</h2>
      </div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <p className={styles[`${item.color}`]}>
              {item.value}
              <span>veJCT</span>
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
