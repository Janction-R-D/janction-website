import React from 'react';
import { Card, Divider } from 'antd';
import styles from './resources.less';

export default function ResourcesHeader({ summary }) {
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

  return (
    <Card className={styles['card']}>
      <section>
        <div className={styles['resource-container']}>
          <div className={styles['card-header']}>
            <h2>My Resources</h2>
          </div>
          <ul className={styles['resources']}>
            {data.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <p className={styles[`${item.color}`]}>{item.value || 0}</p>
              </li>
            ))}
          </ul>
        </div>

        <Divider className={styles['divider']} type="vertical" />
        <ul className={styles['help']}>
          <p className={styles['text']}>Help for newbies</p>
          <li>1. Create an instance in a few simple steps</li>
          <li>2. How to choose a GPU</li>
          <span>
            More{' '}
            <div className={styles['icon']}>
              <i className="iconfont icon-up" />
            </div>
          </span>
        </ul>
      </section>
    </Card>
  );
}
