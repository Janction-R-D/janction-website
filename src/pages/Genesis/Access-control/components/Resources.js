import React from 'react';
import { Card } from 'antd';
import styles from './resources.less';

export default function Resources({ summary }) {
  const data = [
    {
      name: (
        <div className={styles['cloud-resources']}>
          <p>Cloud server</p>
          <span className={styles['blue']}>Manage</span>
        </div>
      ),
      value: 46,
      color: 'white',
    },
    {
      name: 'Active session',
      value: 19283,
      color: 'white',
    },
    {
      name: 'Abnormal log',
      value: 2193,
      color: 'white',
    },
  ];

  return (
    <Card className={styles['card']}>
      <div className={styles['card-header']}>
        <h2>My Resources</h2>
      </div>
      <div>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <p className={styles[`${item.color}`]}>{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
