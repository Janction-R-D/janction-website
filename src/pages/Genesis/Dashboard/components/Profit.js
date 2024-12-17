import React, { useState } from 'react';
import styles from '../index.less';
import numeral from 'numeral';
import { Card } from 'antd';
import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';
import { Graph } from './Graph';

export default function Profit({ lessorsData, getLessors, percent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
            title={'Total'}
            income={numeral(lessorsData?.profit?.total || 0).format('$0.00')}
            diffValue={0}
          />

          <ProfitCard
            title={' Node rewards'}
            income={numeral(lessorsData?.profit?.rewards || 0).format('$0.00')}
            diffValue={0}
          />

          <ProfitCard
            title={' Rental income'}
            income={numeral(lessorsData?.profit?.rental_income || 0).format(
              '$0.00',
            )}
            diffValue={0}
          />

          <ProfitCard
            title={'Staking proceeds'}
            income={numeral(lessorsData?.profit?.pledge_proceeds || 0).format(
              '$0.00',
            )}
            diffValue={0}
          />
        </div>
      </div>
    </div>
  );
}

function ProfitCard({ title, income, diffValue }) {
  const isDrop = diffValue < 0;
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
function ProfitTotal({ title, income, diffValue }) {
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
        <Graph />
      </section>
    </Card>
  );
}
