import React, { useState } from 'react';
import { Button } from 'antd';
import { useIntl, history } from 'umi';
import styles from './index.less';
import Guide from '@/pages/Genesis/Dashboard/components/Guide/Guide';
import ChatModal from '../ChatModal';

export default function SectionInput() {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onAiOpen = () => setIsAiOpen(true);
  const onAiClose = () => setIsAiOpen(false);

  return (
    <div className={styles['sectionInput']}>
      <ChatModal open={isAiOpen} onClose={onAiClose} />

      <span className={styles['title']}>
        {intl.formatMessage({ id: 'sectionInput.title' })}
      </span>

      <div className={styles.container} onClick={onAiOpen}>
        <div className={styles.glow}></div>
        <button className={styles.neon}>
          <span className={styles.neon_title}>
            {intl.formatMessage({ id: 'sectionInput.button.deployTitle' })}
          </span>
          <span className={styles.right}>
            {intl.formatMessage({ id: 'sectionInput.button.askAi' })}
          </span>
        </button>
      </div>

      <section className={styles['buttons']}>
        <Button className={styles['connect-btn']} onClick={onOpen}>
          {intl.formatMessage({ id: 'sectionInput.button.download' })}
        </Button>

        <Guide onOpen={onOpen} isOpen={isOpen} setIsOpen={setIsOpen} />

        <Button
          className={styles['connect-btn']}
          onClick={() => history.push('/genesis')}
        >
          {intl.formatMessage({ id: 'sectionInput.button.getStarted' })}
        </Button>

        <Button
          className={styles['connect-btn']}
          onClick={() => history.push('/gpu')}
        >
          {intl.formatMessage({ id: 'sectionInput.button.provideGpu' })}
        </Button>
      </section>
    </div>
  );
}
