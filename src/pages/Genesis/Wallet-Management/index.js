import React, { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import MyWallet from './MyWallet';
import Resources from './Resources';
import AuthHeader from '@/components/Layouts/Auth/AuthHeader';

export default function WalletManagement() {
  const [wallet, setIsWallet] = useState(true);
  const intl = useIntl();

  return (
    <div className={styles['personal-container-wallet']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>{intl.formatMessage({ id: 'wallet.title' })}</h1>
        </header>
        <nav className={styles['main-menu']}>
          <ul className={styles['menu']}>
            <li
              className={`${styles['menu-item']} ${
                wallet === true ? styles['active'] : ''
              } `}
              onClick={() => setIsWallet(true)}
            >
              <a>{intl.formatMessage({ id: 'wallet.my' })}</a>
            </li>
            <li
              className={`${styles['menu-item']} ${
                wallet === false ? styles['active'] : ''
              } `}
              onClick={() => setIsWallet(false)}
            >
              <a>{intl.formatMessage({ id: 'wallet.record' })}</a>
            </li>
          </ul>
        </nav>
      </section>
      <main className={styles['container']}>
        {wallet && <MyWallet />}
        {!wallet && <Resources />}
      </main>
    </div>
  );
}

WalletManagement.wrappers = ['@/wrappers/auth'];
