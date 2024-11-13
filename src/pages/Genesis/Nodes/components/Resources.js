import React from 'react';
import { Card } from 'antd';
import styles from './resources.less';

export default function Resources({ summary }) {
  const data = [
    {
      name: (
        <div className={styles['cloud-resources']}>
          <p>Running nodes</p>
        </div>
      ),
      value: 24546,
      color: 'white',
    },
    {
      name: 'listed nodes',
      value: 19283,
      color: 'white',
    },
    {
      name: 'active instances',
      value: 2193,
      color: 'white',
    },
  ];

  return (
    <Card className={styles['card']}>
      <div className={styles['card-header']}>
        <h2>My nodes</h2>
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
