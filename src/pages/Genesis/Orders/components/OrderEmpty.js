import React from 'react';
import empty from '@/assets/images/genesis/empty-orders.png';
import styles from './orders.less';
import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { history } from 'umi';
export default function OrderEmpty() {
  return (
    <div className={styles['empty']}>
      <div className={styles['empty-box']}>
        <img src={empty} />
        <p>No Orders</p>
      </div>
      <Button
        className={styles['connect-btn']}
        onClick={() => history.push('/genesis/purchase')}
      >
        To Purchase <ShoppingCartOutlined style={{ color: 'orange' }} />
      </Button>
    </div>
  );
}
