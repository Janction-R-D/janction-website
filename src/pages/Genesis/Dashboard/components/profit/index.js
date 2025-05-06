// Profit/index.jsx
import React, { useMemo } from 'react';
import { Card } from 'antd';
import numeral from 'numeral';
import styles from './index.less';
import { Graph } from '../Graph';
import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';
import { empty } from '@/utils/lang';
import {
  calculateGrowth,
  calculateFilteredTotal,
  extractProfitData,
} from './utils';

const Profit = ({ lessorsData }) => {
  const profitInfo = lessorsData?.profit || {};

  const totalNow = useMemo(
    () => calculateFilteredTotal(profitInfo.now || {}),
    [profitInfo.now],
  );
  const totalYesterday = useMemo(
    () => calculateFilteredTotal(profitInfo.yesterday || {}),
    [profitInfo.yesterday],
  );
  const totalGrowth = useMemo(
    () => calculateGrowth(totalNow, totalYesterday),
    [totalNow, totalYesterday],
  );

  const profit = useMemo(
    () => extractProfitData(profitInfo, totalNow, totalYesterday, totalGrowth),
    [profitInfo, totalNow, totalYesterday, totalGrowth],
  );

  const cards = [
    { key: 'node_reward', label: 'Node rewards' },
    { key: 'invite_reward', label: 'Invite Reward' },
    { key: 'rental_income', label: 'Rental income' },
    { key: 'staking_proceeds', label: 'Staking proceeds' },
  ];

  return (
    <Card className={styles.mainCard}>
      <div className={styles.profitHeader}>
        <div>
          <p className={styles.title}>Profit</p>
          <span className={styles.subTitle}>Total</span>
          <div className={styles.profitCard}>
            <p className={styles.value_total}>{profit.total.now} veJCT</p>
            <div className={styles.compare}>
              <p
                className={
                  profit.total.isDrop ? styles['drop'] : styles['no-drop']
                }
              >
                <img src={profit.total.isDrop ? drop : rise} alt="change" />
                {!empty(profit.total.diffValue)
                  ? profit.total.diffValue
                    ? '-'
                    : '+' + numeral(profit.total.diffValue).format('0%')
                  : profit.total.diffValue}{' '}
                <span style={{ color: '#ccc' }}>Compared to last week</span>
              </p>
            </div>
          </div>
        </div>
        <Graph data={profit.graph} />
      </div>

      <div className={styles.sub_profit}>
        {cards.map(({ key, label }) => (
          <ProfitCard
            key={key}
            title={label}
            value={profit[key]?.now}
            growth={profit[key]?.growth}
          />
        ))}
      </div>
    </Card>
  );
};
const ProfitCard = ({ title, value, growth }) => {
  const isDrop = growth < 0;

  return (
    <div className={styles.sub_profit_card}>
      <p className={styles.title}>{title}</p>
      <span className={styles.value}>
        {!empty(value) ? `${numeral(value).format('0.00')}` : '~'}
      </span>
      <p className={isDrop ? styles['drop'] : styles['no-drop']}>
        <img src={isDrop ? drop : rise} alt="change" />
        {!empty(growth)
          ? isDrop
            ? '-'
            : '+' + numeral(growth).format('0%')
          : growth}{' '}
        <span style={{ color: '#ccc' }}>Compared to last week</span>
      </p>
    </div>
  );
};

export default Profit;
