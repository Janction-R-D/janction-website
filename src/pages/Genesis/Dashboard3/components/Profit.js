import React, { useMemo, useState } from 'react';

import styles from '../index.less';
import numeral from 'numeral';
import { Card } from 'antd';
import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';
import { Graph2 } from './Graph2';
import { empty } from '@/utils/lang';
import { Graph } from './Graph';

export default function Profit({ lessorsData, getLessors, percent }) {
  const profitInfo = lessorsData?.profit || {};

  // Función para calcular el crecimiento
  function calculateGrowth(current, previous) {
    if (previous === 0) {
      return current === 0 ? 0 : 100; // Assume 0% growth if both are 0, or 100% if current is > 0
    }
    return ((current - previous) / previous) * 100;
  }

  // Función para calcular el total de los valores en un objeto, excluyendo node_reward
  function calculateFilteredTotal(data) {
    return Object.entries(data)
      .filter(([key]) => key !== 'node_reward')
      .reduce((total, [, value]) => total + value, 0);
  }

  // Calcular los totales filtrados para 'now' y 'yesterday'
  const totalFilteredNow = useMemo(
    () => calculateFilteredTotal(profitInfo.now || {}),
    [profitInfo.now],
  );
  const totalFilteredYesterday = useMemo(
    () => calculateFilteredTotal(profitInfo.yesterday || {}),
    [profitInfo.yesterday],
  );

  // Calcular el crecimiento basado en los totales filtrados
  const filteredGrowth = useMemo(
    () => calculateGrowth(totalFilteredNow, totalFilteredYesterday),
    [totalFilteredNow, totalFilteredYesterday],
  );

  const profit = {
    total: {
      now: totalFilteredNow,
      yesterday: totalFilteredYesterday,
      growth: filteredGrowth,
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
    graph: profitInfo.by_unit_hour?.point || {},
  };

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
            title="Total"
            income={profit?.total.now || 0}
            diffValue={profit?.total.growth || 0}
          />
          <RewardCard
            profit={profit.graph}
            lessorsData={lessorsData}
            title="Node rewards"
            income={profit?.node_reward.now || 0}
            diffValue={profit?.node_reward.growth || 0}
            unit="veJCT"
          />

          <ProfitCard
            title="Rental income"
            income={profit?.rental_income.now || 0}
            diffValue={profit?.rental_income.growth || 0}
          />

          <ProfitCard
            title="Staking proceeds"
            income={profit?.staking_proceeds.now || 0}
            diffValue={profit?.staking_proceeds.growth || 0}
          />
          <ProfitCard
            title="Invite Reward"
            income={profit?.invite_reward.now || 0}
            diffValue={profit?.invite_reward.growth || 0}
          />
        </div>
      </div>
    </div>
  );
}

function ProfitCard({ title, income, diffValue, unit = '' }) {
  const isDrop = diffValue < 0;

  return (
    <Card title={title} className={styles['card']}>
      <div className={styles['income-value']}>
        <span className={styles['value']}>
          {!empty(income)
            ? `${unit}${numeral(income).format('0.00')} ${unit}`
            : '~'}
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
            {!empty(diffValue) ? numeral(diffValue).format('0%') : diffValue}
          </span>
          <span className={styles['name']}>Compared to yesterday</span>
        </div>
      </div>
    </Card>
  );
}

function ProfitTotal({ title, income, diffValue }) {
  const isDrop = diffValue < 0;

  return (
    <Card title={title} className={styles['card']}>
      <section className={styles['card-total']}>
        <div>
          <div className={styles['income-value']}>
            <span className={styles['total-value']}>
              {!empty(income) ? `${numeral(income).format('0.00')}` : '~'}
            </span>
          </div>
          <div className={styles['card-footer']}>
            <div className={styles['compare']}>
              <span
                className={`${styles['diff-value']}  ${
                  diffValue > 0 ? styles['text-red'] : styles['text-green']
                }`}
              >
                <img src={isDrop ? drop : rise}></img>
                {!empty(diffValue)
                  ? numeral(diffValue).format('0%')
                  : diffValue}
              </span>
              <span className={styles['name']}>Compared to yesterday</span>
            </div>
          </div>
        </div>
      </section>
    </Card>
  );
}

function RewardCard({ title, income, diffValue, profit, lessorsData, unit }) {
  const isDrop = diffValue < 0;

  return (
    <Card title={title} className={styles['card']}>
      <section className={styles['card-reneward']}>
        <div className={styles['card-context']}>
          <div className={styles['income-value']}>
            <span className={styles['value']}>
              {!empty(income) ? `${numeral(income).format('0.00')}` : '~'}
              {unit}
            </span>
          </div>
          <div className={styles['card-footer']}>
            <div className={styles['compare']}>
              <span
                className={`${styles['diff-value']}  ${
                  diffValue > 0 ? styles['text-red'] : styles['text-green']
                }`}
              >
                <img src={isDrop ? drop : rise}></img>
                {!empty(diffValue)
                  ? numeral(diffValue).format('0%')
                  : diffValue}
              </span>
              <span className={styles['name']}>Compared to yesterday</span>
            </div>
          </div>
        </div>
        <Graph data={profit} />
      </section>
    </Card>
  );
}
