import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import Guide from '@/pages/Genesis/Dashboard/components/Guide/Guide';
import { history } from 'umi';

export default function SectionInput() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
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
        <Button className={styles['connect-btn']} onClick={onOpen}>
          Download Janction app
        </Button>
        <Guide onOpen={onOpen} isOpen={isOpen} setIsOpen={setIsOpen} />
        <Button
          className={styles['connect-btn']}
          onClick={() => history.push('/genesis')}
        >
          Get Started
        </Button>
      </section>
    </div>
  );
}
