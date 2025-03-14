import React from 'react';
import styles from './index.less';
import { Avatar, Button } from 'antd';
export default function AsidePrice() {
  return (
    <aside className={styles['aside-wrapper']}>
      <header className={styles['aside-header']}>
        <h2 className={styles['aside-title']}>Total price</h2>
      </header>
      <main className={styles['aside-content']}>
        <section>
          <p className={styles['text__type']}>Operating System</p>
          <div className={styles['text__content']}>
            <span className={styles['description']}>
              <i className="iconfont icon-nvidia" />
              <p className={styles['text__description']}>NAT | 1200 Mbps</p>
            </span>
            <span className={styles['price']}>$35.669</span>
          </div>
        </section>
        <section>
          <p className={styles['text__type']}>Operating System</p>
          <div className={styles['text__content']}>
            <span className={styles['description']}>
              <p className={styles['text__description']}>Manchester, UK</p>
            </span>
            <span className={styles['price']}>$35.669</span>
          </div>
        </section>
        <section>
          <p className={styles['text__type']}>Location </p>
          <div className={styles['text__content']}>
            <span className={styles['description']}>
              <p className={styles['text__description']}>NAT | 1200 Mbps</p>
            </span>
            <span className={styles['price']}>$35.669</span>
          </div>
        </section>
        <section>
          <p className={styles['text__type']}>Basic configuration </p>
          <div className={styles['text__content']}>
            <span className={styles['description']}>
              <p className={styles['text__description']}>
                <span>INTEL | CPU |</span>
                <span>GeForce RTX 4090</span>
              </p>
            </span>
            <span className={styles['price']}>$35.669</span>
          </div>
        </section>
      </main>
      <footer className={styles['aside-footer']}>
        <span className={styles['text__price']}>$34.669</span>
        <Button className={styles['btn-confirm']}>Confirm the order</Button>
      </footer>
    </aside>
  );
}
