import { useMemo, useState, useEffect } from 'react';
import styles from './index.less';
import { empty } from '@/utils/lang';
import numeral from 'numeral';
import { ArrowDownOutlined } from '@ant-design/icons';
import { fetchNodePoints } from '@/services/genesis';
import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';
function calculateFilteredTotal(data) {
  return Object.entries(data)
    .filter(([key]) => key !== 'node_reward')
    .reduce((sum, [, val]) => sum + val, 0);
}
function extractProfitData(info, nowTotal, yestTotal, growthTotal) {
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
export function calculateGrowth(current, previous) {
  if (previous === 0) {
    return current === 0 ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}
const NodeStats = ({ statisticData, lessorsData }) => {
  const [nodeStat, setNodeStat] = useState({});

  const totalNow = useMemo(
    () => calculateFilteredTotal(nodeStat.now || {}),
    [nodeStat.now],
  );
  const totalYesterday = useMemo(
    () => calculateFilteredTotal(nodeStat.yesterday || {}),
    [nodeStat.yesterday],
  );
  const profit = useMemo(
    () => extractProfitData(nodeStat, totalNow, totalYesterday, totalGrowth),
    [nodeStat, totalNow, totalYesterday, totalGrowth],
  );
  const totalGrowth = useMemo(
    () => calculateGrowth(totalNow, totalYesterday),
    [totalNow, totalYesterday],
  );

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
  useEffect(() => {
    const getNodeInfo = async () => {
      try {
        const res = await fetchNodePoints();
        setNodeStat(res);
      } catch (error) {
        console.log(error);
      }
    };
    getNodeInfo();
  }, []);
  const isDrop = profit['total'].growth < 0;
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
              {nodeStat?.now?.node_reward.toFixed(2)}{' '}
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
        {/* <div className={styles.date}>--</div> */}
        <div className={styles.footer}>
          <div className={styles.todayIncome}>
            {nodeStat?.now?.total_currency.toFixed(2)}{' '}
            <span className={styles.unit}>veJCT</span>
          </div>
          <div className={styles.comparison}>
            <img
              src={isDrop ? drop : rise}
              alt="change"
              style={{ width: '15px', heigth: '15px', marginRight: '4px' }}
            />
            Compared to yesterday{' '}
            {!empty(profit.total.diffValue)
              ? profit.total.diffValue
                ? '-'
                : '+' + numeral(profit.total.diffValue).format('0%')
              : profit.total.diffValue}{' '}
            {/* <ArrowDownOutlined /> */}
            {/* <span className={styles.down}>
              {changePercent}%
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeStats;
