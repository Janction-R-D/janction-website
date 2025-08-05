import React from 'react';
import styles from './index.less';
import Cost from './Cost';
import JasmyCard from './JasmyCard';
import Payment from './Payment';
import Methods from './Methods';
import CompliancePlainText from './Compliance';
export default function Company() {
  return (
    <section className={styles['main']}>
      <JasmyCard />
      <Payment />
      <Cost />
      {/* <CompliancePlainText /> */}
      <Methods />
    </section>
  );
}
