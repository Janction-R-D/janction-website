import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

export default function SectionInput() {
  return (
    <div className={styles['sectionInput']}>
      <span className={styles['title']}> Rent out / Rent your processor</span>
      <div className={styles.container}>
        <div className={styles.glow}></div>
        <button className={styles.neon}>
          <span className={styles.neon_title}>How to deploy node</span>
          <span className={styles.right}>Ask Smart Janction ✦</span>
        </button>
      </div>
      <section className={styles['buttons']}>
        <Button className={styles['connect-btn']}>Download Janction app</Button>
        <Button className={styles['connect-btn']}>Get Started</Button>
      </section>
    </div>
  );
}
