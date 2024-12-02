import React, { useState } from 'react';
import styles from './index.less';
import ProfileHeader from '@/components/ProfileHeader';
import MyWallet from './MyWallet';
export default function WalletManagement() {
  const [wallet, setIsWallet] = useState(true);

  return (
    <main className={styles['main-container']}>
      <header className={styles['main-header']}>
        <ProfileHeader />
      </header>
      <div className={styles['personal-container']}>
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
      </div>
    </main>
  );
}
