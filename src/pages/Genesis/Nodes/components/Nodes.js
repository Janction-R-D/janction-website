import React from 'react';
import styles from './node.less';
export default function NodeCard() {
  return (
    <section className={styles['card']}>
      <h3>Node1236xxx </h3>
      <div>
        <p>Status</p>
        <span className={styles['node-status']}>normal</span>
      </div>
      <div>
        <p>creation time:</p>
        <span>2020-09-31 20:59:59</span>
      </div>
    </section>
  );
}
