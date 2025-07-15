import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { ArrowDownOutlined } from '@ant-design/icons';
import { fetchLessor } from '@/services/genesis';

const NodeStats = ({ statisticData, lessorsData }) => {
  const totalNodes = statisticData.total;
  const running = statisticData.running;
  const listed = statisticData.listed;
  const active = statisticData.active;

  const totalIncome = 0;
  const todayIncome = 0;
  const changePercent = 0;

  const nft_sumary = useMemo(() => {
    const { amount } = lessorsData?.nft_summary || {};
    return {
      ammount: amount || 0,
    };
  }, [lessorsData]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <section className={styles.left_header}>
          <div className={styles.item}>
            <div className={styles.label}>Total node</div>
            <div className={styles.value}>
              {statisticData.total + nft_sumary.ammount}
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>Total income</div>
            <div className={styles.value}>
              {totalIncome.toFixed(2)}{' '}
              <span className={styles.unit}>veJCT</span>
            </div>
          </div>
        </section>

        <div className={styles.usageBox}>
          <div className={styles.usageBar}>
            <div
              className={styles.running}
              style={{ width: `${(running / totalNodes) * 100}%` }}
            />
            <div
              className={styles.active}
              style={{ width: `${(active / totalNodes) * 100}%` }}
            />
            <div
              className={styles.listed}
              style={{ width: `${(listed / totalNodes) * 100}%` }}
            />
          </div>
          <div className={styles.legend}>
            <span>
              <i className={styles.runningDot} /> Running nodes:{' '}
              {statisticData.running}
            </span>
            <span>
              <i className={styles.listedDot} /> Listed nodes:{' '}
              {statisticData.listed}
            </span>
            <span>
              <i className={styles.activeDot} /> Active instances:{' '}
              {statisticData.active}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.label}>Node income</div>
        <div className={styles.date}>--</div>
        <div className={styles.footer}>
          <div className={styles.todayIncome}>
            {todayIncome.toFixed(2)} <span className={styles.unit}>veJCT</span>
          </div>
          <div className={styles.comparison}>
            Compared to yesterday{' '}
            <span className={styles.down}>
              <ArrowDownOutlined /> {changePercent}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeStats;
