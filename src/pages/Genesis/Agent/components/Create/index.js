import { useState } from 'react';
import styles from './index.less';
import { Divider } from 'antd';
import Logs from './Logs';
import AIForm from './AIForm';
import StepButton from '../StepButton';
import { onNavigate } from '../../utils';
import ShareCard from '../ShareCard';
export default function Create() {
  const [shareOpen, setShareOpen] = useState(false);
  const onCloseShare = () => {
    setShareOpen(false);
  };
  const onOpen = () => {
    setShareOpen(true);
  };

  return (
    <main className={styles['create-wrapper']}>
      <header className={styles['orders-header']}>
        <div
          className={styles['btn-back']}
          onClick={() => onNavigate('/genesis/agent')}
        >
          <i className="iconfont icon-pre" />
          Back
        </div>
        <Divider type="vertical" className={styles['divider']} />
        <div className={styles['box']}>
          <span className={styles['title']}> Create My Agent</span>
        </div>
      </header>
      <main className={styles['create__content']}>
        <section className={styles['config']}>
          <AIForm />
        </section>
        <section className={styles['logs']}>
          <Logs />
          <div className={styles['buttons']}>
            <StepButton text="Share" onClick={onOpen} />
            <StepButton text="Create Agent" />
          </div>

          {shareOpen && <ShareCard onClose={onCloseShare} />}
        </section>
      </main>
    </main>
  );
}
