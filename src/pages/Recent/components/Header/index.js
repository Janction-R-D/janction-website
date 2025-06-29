import React from 'react';
import styles from './index.less';
import logo from '@/assets/images/icons/logo_name.png';
import { Button } from 'antd';
import { history } from 'umi';
export default function Header() {
  return (
    <header className={styles['main-header']}>
      <section className={styles['header-left']}>
        <img src={logo} className={styles['logo']} />
      </section>
      <section className={styles['header-right']}>
        <span>Doc</span>
        <Button
          className={styles['connect-btn']}
          onClick={() => history.push('/genesis')}
        >
          Dashboard
        </Button>
      </section>
    </header>
  );
}
