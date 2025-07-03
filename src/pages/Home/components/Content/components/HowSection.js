import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import img from '@/assets/images/Home_2/arrow.png';

export default function HowSection() {
  const intl = useIntl();

  return (
    <div className={styles['how']}>
      <div className={styles['node']}></div>
      <div className={styles['running']}></div>
      <div className={styles['shadow_4']}></div>

      <div className={styles.how_left}>
        <h2>{intl.formatMessage({ id: 'how.title' })}</h2>
        <div className={styles.underline}>
          <img src={img} />
        </div>
      </div>

      <div className={styles.how_right}>
        <h2>{intl.formatMessage({ id: 'how.subtitle' })}</h2>
        <span>{intl.formatMessage({ id: 'how.description' })}</span>
      </div>
    </div>
  );
}
