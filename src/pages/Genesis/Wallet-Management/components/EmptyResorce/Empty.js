import React from 'react';
import empty from '@/assets/images/genesis/empty_resource.png';
import styles from './index.less';
export default function Empty() {
  return (
    <article className={styles['container']}>
      <div className={styles['img']}>
        <img src={empty} />
        <p>No transaction history</p>
      </div>
    </article>
  );
}
