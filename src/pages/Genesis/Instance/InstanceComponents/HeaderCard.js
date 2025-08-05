import React from 'react';
import { Card, message } from 'antd';
import styles from './headerCard.less';
import { useIntl } from 'umi';

export default function HeaderCard({ summary, getAllNodes }) {
  const intl = useIntl();

  const data = [
    {
      name: intl.formatMessage({ id: 'headerCard.cloudServer' }),
      value: summary?.total,
      color: 'white',
    },
    {
      name: intl.formatMessage({ id: 'headerCard.running' }),
      value: summary?.running,
      color: 'white',
    },
    {
      name: intl.formatMessage({ id: 'headerCard.expiringSoon' }),
      value: summary?.expiring_soon,
      color: 'yellow',
    },
    {
      name: intl.formatMessage({ id: 'headerCard.expired' }),
      value: summary?.expired,
      color: 'red',
    },
  ];

  const handleRefresh = async () => {
    try {
      await getAllNodes();
      message.success(intl.formatMessage({ id: 'headerCard.refreshSuccess' }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={styles['card']}>
      <div className={styles['card-header']}>
        <h2>{intl.formatMessage({ id: 'headerCard.myResources' })}</h2>
        <span className={styles['refresh']} onClick={handleRefresh}>
          <i className="iconfont icon-refresh" />
          {intl.formatMessage({ id: 'headerCard.refresh' })}
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
