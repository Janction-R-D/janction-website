import React from 'react';
import { Card, Divider } from 'antd';
import styles from './resources.less';
import { history, useIntl } from 'umi';

export default function ResourcesHeader({ summary }) {
  const intl = useIntl();

  const data = [
    {
      name: intl.formatMessage({ id: 'resourcesHeader.cloudServer' }),
      value: summary?.total,
      color: 'white',
    },
    {
      name: intl.formatMessage({ id: 'resourcesHeader.running' }),
      value: summary?.running,
      color: 'white',
    },
    {
      name: intl.formatMessage({ id: 'resourcesHeader.expiringSoon' }),
      value: summary?.expiring_soon,
      color: 'yellow',
    },
    {
      name: intl.formatMessage({ id: 'resourcesHeader.expired' }),
      value: summary?.expired,
      color: 'red',
    },
  ];

  return (
    <Card className={styles['card']}>
      <section>
        <div className={styles['resource-container']}>
          <div className={styles['card-header']}>
            <h2>{intl.formatMessage({ id: 'resourcesHeader.title' })}</h2>
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
          <p className={styles['text']}>
            {intl.formatMessage({ id: 'resourcesHeader.helpTitle' })}
          </p>
          <li>{intl.formatMessage({ id: 'resourcesHeader.help.step1' })}</li>
          <li>{intl.formatMessage({ id: 'resourcesHeader.help.step2' })}</li>
          <span
            onClick={() => {
              history.push('/genesis/newbies');
            }}
          >
            {intl.formatMessage({ id: 'resourcesHeader.more' })}{' '}
            <div className={styles['icon']}>
              <i className="iconfont icon-up" />
            </div>
          </span>
        </ul>
      </section>
    </Card>
  );
}
