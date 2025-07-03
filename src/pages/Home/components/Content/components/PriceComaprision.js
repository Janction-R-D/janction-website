import React from 'react';
import styles from './index.less';
import { Progress } from 'antd';
import { useIntl } from 'umi';

export default function PriceComparison() {
  const intl = useIntl();

  return (
    <section className={styles.price_comparision}>
      <h1 className={styles.title}>
        {intl.formatMessage({ id: 'priceComparison.title' })}
      </h1>
      <p className={styles.subtitle}>
        {intl.formatMessage({ id: 'priceComparison.subtitle' })}
      </p>

      <div className={styles.card}>
        <span className={styles.card_title}>
          {intl.formatMessage({ id: 'priceComparison.cardTitle' })}
        </span>
        <section>
          <div className={styles.left}>
            <JanctionProgressBar
              label={intl.formatMessage({
                id: 'priceComparison.janctionLabel',
              })}
              value="$3.3/h"
              percent={30}
              color="#00e0ff"
            />

            <JanctionProgressBar
              label={intl.formatMessage({
                id: 'priceComparison.onPremisesLabel',
              })}
              value="$50/month"
              percent={100}
              color="#ff9a00"
            />
          </div>

          <div className={styles.right}>
            <div className={styles.bullet}>
              <span className={styles.dotBlue}></span>
              {intl.formatMessage({ id: 'priceComparison.bullet1' })}
            </div>
            <div className={styles.bullet}>
              <span className={styles.dotBlue}></span>
              {intl.formatMessage({ id: 'priceComparison.bullet2' })}
            </div>
            <div className={styles.bullet}>
              <span className={styles.dotOrange}></span>
              {intl.formatMessage({ id: 'priceComparison.bullet3' })}
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
