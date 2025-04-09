import React, { useState } from 'react';
import styles from './index.less';
import { Button, Divider } from 'antd';
import { AppstoreAddOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Web3Card from './components/Card/Card';
import Guide from './components/Guide/Guide';

export default function Lessee() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  return (
    <main className={styles['dashboard-wrapper']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Dashboard</h1>
          <Divider type="vertical" className={styles['line']} />
          <span>
            <p>Your personal speed </p>
            <p>mining node</p>
          </span>
        </header>
        <p className={styles['text--blue']}>Try download the desktop app now</p>
        <section className={styles['buttons-box']}>
          <Button className={styles['button']} onClick={() => onOpen()}>
            Donwload App <AppstoreAddOutlined />
          </Button>
          <Guide isOpen={isOpen} setIsOpen={setIsOpen} onOpen={onOpen} />
          <Button className={styles['button']}>
            Generate Token ID <ArrowUpOutlined />
          </Button>
        </section>
      </section>
      <section className={styles['container']}>
        <li className={styles['container-text__list']}>Web3 Starter Hub</li>
        <article>
          <Web3Card />
          <Web3Card />
          <Web3Card />
          <Web3Card />
          <Web3Card />
          <Web3Card />
        </article>
      </section>
    </main>
  );
}
