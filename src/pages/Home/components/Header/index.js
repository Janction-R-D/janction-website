import React from 'react';
import styles from './index.less';
import logo from '@/assets/images/icons/logo_name.png';
import { Button } from 'antd';
import { history, useIntl } from 'umi';
import { DropLanguage } from '../DropLanguage';

export default function HomeHeader() {
  const intl = useIntl();

  return (
    <header className={styles['main-header']}>
      <section className={styles['header-left']}>
        <img
          src={logo}
          className={styles['logo']}
          onClick={() => history.push('/')}
        />
      </section>
      <section className={styles['header-right']}>
        <DropLanguage />
        <a
          href="https://docs.janction.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {intl.formatMessage({ id: 'header.doc' })}
        </a>
        <Button
          className={styles['connect-btn']}
          onClick={() => history.push('/login')}
        >
          {intl.formatMessage({ id: 'header.dashboard' })}
        </Button>
      </section>
    </header>
  );
}
