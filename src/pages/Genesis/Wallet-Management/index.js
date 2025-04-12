import React, { useState } from 'react';
import styles from './index.less';
import MyWallet from './MyWallet';
import Resources from './Resources';
import AuthHeader from '@/components/Layouts/Auth/AuthHeader';
export default function WalletManagement() {
  const [wallet, setIsWallet] = useState(true);

  return (
    <div className={styles['personal-container-wallet']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Wallet Management</h1>
        </header>
        <nav className={styles['main-menu']}>
          <ul className={styles['menu']}>
            <li
              className={`${styles['menu-item']} ${
                wallet === true ? styles['active'] : ''
              } `}
              onClick={() => setIsWallet(true)}
            >
              <a>My wallet</a>
            </li>
            <li
              className={`${styles['menu-item']} ${
                wallet === false ? styles['active'] : ''
              } `}
              onClick={() => setIsWallet(false)}
            >
              <a>Record</a>
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
