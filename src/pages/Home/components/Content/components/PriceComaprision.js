import React from 'react';
import styles from './index.less';
import { Progress } from 'antd';
export default function PriceComparison() {
  return (
    <section className={styles.price_comparision}>
      <h1 className={styles.title}>Price Comparison & Cost Savings</h1>
      <p className={styles.subtitle}>
        Unbeatable Cost Performance vs. On-Premises
      </p>

      <div className={styles.card}>
        <span className={styles.card_title}>JANCTION H100 vs On-Premises</span>
        <section>
          <div className={styles.left}>
            <JanctionProgressBar
              label="JANCTION H100"
              value="$3.3/h"
              percent={30}
              color="#00e0ff"
            />

            <JanctionProgressBar
              label="On-Premises (Monthly Equivalent Cost)"
              value="$50/month"
              percent={100}
              color="#ff9a00"
            />
          </div>

          <div className={styles.right}>
            <div className={styles.bullet}>
              <span className={styles.dotBlue}></span> 1.4x Higher GPU Memory
              Bandwidth
            </div>
            <div className={styles.bullet}>
              <span className={styles.dotBlue}></span> Zero Upfront Investment
            </div>
            <div className={styles.bullet}>
              <span className={styles.dotOrange}></span> 90% Lower Operational
              Costs
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function JanctionProgressBar({ label, value, percent = 0, color = '#1677ff' }) {
  return (
    <div className={styles.progressBar}>
      <div className={styles.row}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
      <Progress
        percent={percent}
        showInfo={false}
        strokeColor={color}
        strokeWidth={15}
        size="small"
      />
    </div>
  );
}
