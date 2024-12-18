import React, { useState } from 'react';

import styles from '../index.less';
import numeral from 'numeral';
import { Card } from 'antd';
import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';
import { Graph } from './Graph';

export default function Profit({ lessorsData, getLessors, percent }) {
  const profitInfo = lessorsData?.profit || {};
  function calculateGrowth(current, previous) {
    if (previous === 0) {
      return current === 0 ? 0 : 100; // Assume 0% growth if both are 0, or 100% if current is > 0
    }
    return ((current - previous) / previous) * 100;
  }
  function calculateTotal(data) {
    return Object.values(data).reduce((total, value) => total + value, 0);
  }

  const totalNow = calculateTotal(profitInfo?.now || 0);
  const totalYesterday = calculateTotal(profitInfo?.yesterday || 0);
  const profit = {
    total: {
      now: totalNow,
      yesterday: totalYesterday,
      growth: calculateGrowth(totalNow, totalYesterday),
    },
    invite_reward: {
      now: profitInfo.now?.invite_reward,
      growth: calculateGrowth(
        profitInfo.now?.invite_reward,
        profitInfo.yesterday?.invite_reward,
      ),
    },
    node_reward: {
      now: profitInfo.now?.node_reward,
      growth: calculateGrowth(
        profitInfo.now?.node_reward,
        profitInfo.yesterday?.node_reward,
      ),
    },
    rental_income: {
      now: profitInfo.now?.rental_income,
      growth: calculateGrowth(
        profitInfo.now?.rental_income,
        profitInfo.yesterday?.rental_income,
      ),
    },
    staking_proceeds: {
      now: profitInfo.now?.staking_proceeds,
      growth: calculateGrowth(
        profitInfo.now?.staking_proceeds,
        profitInfo.yesterday?.staking_proceeds,
      ),
    },
  };

  console.log(profitInfo.by_date);

  return (
    <div
      className={[styles['content-item'], styles['profit-wrapper']].join(' ')}
    >
      <div className={styles['title']}>
        <span>Profit</span>
      </div>

      <div className={styles['content']}>
        <div className={styles['total-wrapper']}>
          <ProfitTotal
            profit={profitInfo.by_date}
            lessorsData={lessorsData}
            title={'Total'}
            income={numeral(profit?.invite_reward.now || 0).format('$0.00')}
            diffValue={numeral(profit?.invite_reward.growth || 0).format(
              '0.0%',
            )}
          />

          <ProfitCard
            title={' Node rewards'}
            income={numeral(profit?.node_reward.now || 0).format('$0.00')}
            diffValue={numeral(profit?.node_reward.growth || 0).format('0.0%')}
          />

          <ProfitCard
            title={' Rental income'}
            income={numeral(profit?.rental_income.now || 0).format('$0.00')}
            diffValue={numeral(profit?.rental_income.growth || 0).format(
              '0.0%',
            )}
          />

          <ProfitCard
            title={'Staking proceeds'}
            income={numeral(profit?.staking_proceeds.now || 0).format('$0.00')}
            diffValue={numeral(profit?.staking_proceeds.growth || 0).format(
              '0.0%',
            )}
          />
          <ProfitCard
            title={'Invite Reward'}
            income={numeral(profit?.invite_reward.now || 0).format('$0.00')}
            diffValue={numeral(profit?.invite_reward.growth || 0).format(
              '0.0%',
            )}
          />
        </div>
      </div>
    </div>
  );
}

function ProfitCard({ title, income, diffValue }) {
  const isDrop = diffValue < 0;
  console.log(diffValue);
  return (
    <Card title={title} className={styles['card']}>
      <div className={styles['income-value']}>
        <span className={styles['value']}>
          ${income ? numeral(income).format('0.00') : '~'}
        </span>
      </div>
      <div className={styles['card-footer']}>
        <div className={styles['compare']}>
          <img src={isDrop ? drop : rise}></img>
          <span
            className={`${styles['diff-value']} ${
              diffValue > 0 ? styles['text-red'] : styles['text-green']
            }`}
          >
            {diffValue ? numeral(diffValue).format('0%') : diffValue}
          </span>
          <span className={styles['name']}>Compared to yesterday</span>
        </div>
      </div>
    </Card>
  );
}
function ProfitTotal({ title, income, diffValue, profit, lessorsData }) {
  const isDrop = diffValue < 0;

  return (
    <Card title={title} className={styles['card']}>
      <section className={styles['card-total']}>
        <div>
          <div className={styles['income-value']}>
            <span className={styles['total-value']}>
              ${income ? numeral(income).format('0.00') : '~'}
            </span>
          </div>
          <div className={styles['card-footer']}>
            <div className={styles['compare']}>
              <img src={isDrop ? drop : rise}></img>
              <span
                className={`${styles['diff-value']} ${
                  diffValue > 0 ? styles['text-red'] : styles['text-green']
                }`}
              >
                {diffValue ? numeral(diffValue).format('0%') : diffValue}
              </span>
              <span className={styles['name']}>Compared to yesterday</span>
            </div>
          </div>
        </div>
        <Graph data={profit} lessorsData={lessorsData} />
      </section>
    </Card>
  );
}
