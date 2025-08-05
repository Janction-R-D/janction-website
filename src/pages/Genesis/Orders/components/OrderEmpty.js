import React from 'react';
import empty from '@/assets/images/genesis/empty-orders.png';
import styles from './orders.less';
import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { history, useIntl } from 'umi';

export default function OrderEmpty() {
  const intl = useIntl();

  return (
    <div className={styles['empty']}>
      <div className={styles['empty-box']}>
        <img
          src={empty}
          alt={intl.formatMessage({ id: 'orderEmpty.noOrders' })}
        />
        <p>{intl.formatMessage({ id: 'orderEmpty.noOrders' })}</p>
      </div>
      <Button
        className={styles['connect-btn']}
        onClick={() => history.push('/genesis/purchase')}
      >
        {intl.formatMessage({ id: 'orderEmpty.toPurchase' })}{' '}
        <ShoppingCartOutlined style={{ color: 'orange' }} />
      </Button>
    </div>
  );
}
