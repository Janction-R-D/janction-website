import React, { useState } from 'react';
import styles from './index.less';
import MyWallet from './MyWallet';
import Resources from './Resources';
import AuthHeader from '@/components/Layouts/Auth/AuthHeader';
export default function WalletManagement() {
  const [wallet, setIsWallet] = useState(true);

  return (
    <main className={styles['main-container']}>
      <AuthHeader />
      <div className={styles['personal-container-wallet']}>
        <aside className={styles['aside']}>
          <h1>Wallet Management</h1>
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
        </aside>
        {wallet && <MyWallet />}
        {!wallet && <Resources />}
      </div>
    </main>
  );
}
