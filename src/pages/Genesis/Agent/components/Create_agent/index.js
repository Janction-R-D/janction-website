import React, { useState } from 'react';
import styles from './index.less';
import { Divider } from 'antd';
import { onNavigate } from '@/utils/utils';
import Logs from './Logs';
import AIForm from './AIForm';
import { useIntl } from 'umi';
import StepButton from '@/components/button/step_button';
import ShareCard from '@/components/cards/share_card/share_card';
export default function CreateAgentt() {
  const [shareOpen, setShareOpen] = useState(false);
  const onCloseShare = () => {
    setShareOpen(false);
  };
  const onOpen = () => {
    setShareOpen(true);
  };
  const { formatMessage } = useIntl();
  return (
    <main className={styles['create-wrapper']}>
      <header className={styles['orders-header']}>
        <div
          className={styles['btn-back']}
          onClick={() => onNavigate('/my_agent')}
        >
          <i className="iconfont icon-pre" />
          {formatMessage({ id: 'button.back' })}
        </div>
        <Divider type="vertical" className={styles['divider']} />
        <div className={styles['box']}>
          <span className={styles['title']}>FinChat AI</span>
          <span className={styles['title-sm']}>
            {formatMessage({ id: 'text.income' })} : 23usdt
          </span>
        </div>{' '}
      </header>
      <main className={styles['create__content']}>
        <section className={styles['config']}>
          <AIForm />
        </section>
        <section className={styles['logs']}>
          <Logs />
          <div className={styles['buttons']}>
            <StepButton
              text={formatMessage({ id: 'create.created_share' })}
              onClick={onOpen}
            />
            <StepButton text={formatMessage({ id: 'create.created_chat' })} />
          </div>

          {shareOpen && <ShareCard onClose={onCloseShare} />}
        </section>
      </main>
    </main>
  );
}
