export function calculateGrowth(current, previous) {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}

export function calculateFilteredTotal(data) {
  return Object.entries(data)
    .filter(([key]) => key !== 'node_reward')
    .reduce((sum, [, val]) => sum + val, 0);
}

export function extractProfitData(info, nowTotal, yestTotal, growthTotal) {
  return {
    total: {
      now: nowTotal,
      yesterday: yestTotal,
      growth: growthTotal,
      diffValue: growthTotal || 0,
      isDrop: growthTotal < 0,
    },
    invite_reward: {
      now: info.now?.invite_reward,
      growth: calculateGrowth(
        info.now?.invite_reward,
        info.yesterday?.invite_reward,
      ),
    },
    node_reward: {
      now: info.now?.node_reward,
      growth: calculateGrowth(
        info.now?.node_reward,
        info.yesterday?.node_reward,
      ),
    },
    rental_income: {
      now: info.now?.rental_income,
      growth: calculateGrowth(
        info.now?.rental_income,
        info.yesterday?.rental_income,
      ),
    },
    staking_proceeds: {
      now: info.now?.staking_proceeds,
      growth: calculateGrowth(
        info.now?.staking_proceeds,
        info.yesterday?.staking_proceeds,
      ),
    },
    graph: info.by_unit_hour?.point || {},
  };
}
