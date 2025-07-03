import React from 'react';
import styles from './index.less';
import Cost from './Cost';
import JasmyCard from './JasmyCard';
import Payment from './Payment';
import Methods from './Methods';
export default function Company() {
  return (
    <section className={styles['main']}>
      <section className={styles['header']}>Jasmy</section>
      <JasmyCard />
      <Cost />
      <Payment />
      <Methods />
    </section>
  );
}
