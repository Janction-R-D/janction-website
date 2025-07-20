import React from 'react';
import styles from './index.less';
import numeral from 'numeral';
import PieChart from '../Pie/Pie';
export default function Card({ total }) {
  const unit = 'veJCT';
  return (
    <div className={styles['total-wrapper']}>
      <div className={styles['total-context']}>
        <span className={styles['total-text']}>Total income </span>
        <span className={[styles['value'], styles['total-value']].join(' ')}>
          {`${numeral(total?.sum).format('0.00')} `}
          <span className={styles['currency']}>{unit}</span>
        </span>
      </div>
      <span className={styles['equal-mobile']}>=</span>
      <div className={styles['cols']}>
        <span className={styles['equal']}>=</span>
        <div className={styles['col-left']}>
          <div>
            <span className={`${styles['desc']} ${styles['blue']}`}>
              {' '}
              Cash payment{' '}
            </span>
            <span className={styles['value']}>{`${numeral(total?.cash).format(
              '0.00',
            )} ${unit}`}</span>
          </div>
          <div>
            <span className={`${styles['desc']} ${styles['red']}`}>
              Share bonus
            </span>
            <span className={styles['value']}>{`${numeral(total?.share).format(
              '0.00',
            )} ${unit}`}</span>
          </div>
        </div>
        <span className={styles['equal-add']}>+</span>
        <div className={styles['col-right']}>
          <div>
            <span className={`${styles['desc']} ${styles['yellow']}`}>
              {' '}
              Gift money{' '}
            </span>
            <span className={styles['value']}>{`${numeral(total?.gift).format(
              '0.00',
            )} ${unit}`}</span>
          </div>
          <div>
            <span className={`${styles['desc']} ${styles['cyan']}`}>
              Coupon
            </span>
            <span className={styles['value']}>{`${numeral(total?.coupon).format(
              '0.00',
            )} ${unit}`}</span>
          </div>
        </div>
      </div>
      <div>
        <PieChart total={total} styles={styles} />
      </div>
    </div>
  );
}
