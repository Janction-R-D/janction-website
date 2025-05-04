import React, { useEffect, useMemo, useRef } from 'react';
import { Card, Typography, Row, Col } from 'antd';
import * as echarts from 'echarts';
import styles from './index.less';
import { Graph } from '../Graph';

const { Title, Text } = Typography;

const Profit = ({ lessorsData }) => {
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

  const cards = [
    'Nodes income',
    'Invite profit',
    'Staking proceeds',
    'Invite Reward',
  ];
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
    <Card className={styles.mainCard}>
      <div className={styles.profitHeader}>
        <div>
          <p className={styles.title}>Profit</p>
          <span className={styles.subTitle}>Total</span>
          <div className={styles.profitCard}>
            <p className={styles.value}>$1,900.00</p>
            <p className={styles.compare}>+15% Compared to last week</p>
          </div>
        </div>
        <Graph data={profit.graph} />
      </div>
      <div className={styles.sub_profit}>
        {cards.map((title, index) => (
          <div className={styles.sub_profit_card} key={index}>
            <p className={styles['title']}>{title}</p>
            <Title level={3}>$1,90.00</Title>
            <Text type="danger">-15% Compared to last week</Text>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Profit;
