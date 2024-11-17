import React from 'react';
import { Card } from 'antd';
import styles from './resources.less';

export default function Resources({ statisticData }) {
  const data = [
    {
      name: 'Running nodes',
      field: 'running',
      value: 24546,
      color: 'white',
    },
    {
      name: 'listed nodes',
      field: 'listed',
      value: 19283,
      color: 'white',
    },
    {
      name: 'active instances',
      field: 'active',
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
              <p className={styles[`${item.color}`]}>
                {statisticData?.[item.field]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
