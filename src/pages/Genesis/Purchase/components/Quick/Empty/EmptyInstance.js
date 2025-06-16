import React from 'react';
import emptyImage from '@/assets/images/genesis/empty_instance.png';
import styles from './index.less';
export default function EmptyInstance() {
  return (
    <div className={styles['empty-instance-wrapper']}>
      <p className={styles['empty-instance-text']}>
        More products are on the shelves, please wait! Or switch to another
        system to take a look
      </p>
      <img
        src={emptyImage}
        alt="Empty Instance"
        className={styles['empty-instance-img']}
      />
    </div>
  );
}
