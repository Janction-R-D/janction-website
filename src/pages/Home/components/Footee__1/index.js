import React from 'react';
import styles from './index.less';
import logo from '@/assets/images/icons/logo_name.png';
export default function Footer() {
  return (
    <footer className={styles['footer']}>
      <section className={styles['header-left']}>
        <img src={logo} className={styles['logo']} />
      </section>
      <span className={styles['text']}>
        © 2025 JANCTION Inc. All rights reserved.
      </span>
    </footer>
  );
}
