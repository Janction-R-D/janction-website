import styles from './index.less';
import Icons from '@/components/Icons';
import { useState } from 'react';
import { Steps, Checkbox } from 'antd';

const Overview = (props) => {
  return (
    <section className={styles['overview-container']}>
      <hgroup>
        <h1>Overview</h1>
        <span>This is the prompt text</span>
      </hgroup>
      <div className={styles['content']}>
        <div className={styles['info']}>
          <div className={styles['name']}>Completed Task</div>
          <div className={styles['value']}>
            <span>300 Points</span>
            <Icons name="downturn" />
          </div>
        </div>
        <div className={styles['info']}>
          <div className={styles['name']}>Earned by task</div>
          <div className={styles['value']}>
            <span>100 Points</span>
            <Icons name="uptrend" />
          </div>
        </div>
        <div className={styles['info']}>
          <div className={styles['name']}>Earning per task</div>
          <div className={styles['value']}>
            <span>110 Points</span>
            <Icons name="downturn" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
