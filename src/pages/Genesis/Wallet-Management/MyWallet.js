import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';
import { Button, Card, Col, Input, Row, Table } from 'antd';
import numeral from 'numeral';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './wallet.less';

export default function MyWallet() {
  return (
    <div className={styles['income-wrapper']}>
      <Row className="mt40">
        <Col span={24}>
          {StatisticInfo({
            title: 'Statistical information',
            value: '5831.20',
            unit: 'veJCT',
          })}
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="mt40">
        <Col span={12}>
          {RenderIncomeCard({
            title: 'Transaction record',
            value: '5831.20',
            unit: 'JCT',
            diffValue: -0.15,
            date: ' 2020-09-31 20:59:59',
          })}
        </Col>
        <Col span={12}>
          {RenderIncomeCard({
            title: 'Rental server revenue',
            value: '5831.20',
            unit: 'USDT',
            diffValue: 0.15,
            date: '2020-09-31 20:59:59',
          })}
        </Col>
      </Row>
    </div>
  );
}

const RenderIncomeCard = ({ title, value, unit, diffValue, date }) => {
  const isDrop = diffValue < 0;
  return (
    <Card title={title} className={styles['card']}>
      <div className={styles['income-value']}>
        <span className={styles['value']}>
          {value ? numeral(value).format('0.00') : '~'}
        </span>
        <span className={styles['unit']}>{unit}</span>
      </div>
      <div className={styles['card-footer']}>
        <div className={styles['compare']}>
          <span className={styles['name']}>Compared to yesterday</span>
          <img src={isDrop ? drop : rise}></img>
          <span
            className={`${styles['diff-value']} ${
              diffValue > 0 ? styles['text-red'] : styles['text-green']
            }`}
          >
            {diffValue ? numeral(diffValue).format('0%') : diffValue}
          </span>
        </div>
        <span className={styles['update-time']}>Last Updated: {date}</span>
      </div>
    </Card>
  );
};
const StatisticInfo = ({ title, value, unit }) => {
  return (
    <Card title={title} className={styles['card-statistic']}>
      <section>
        <div className={styles['statistic-value']}>
          <p className={styles['text-grey']}>Current available balance</p>
          <section>
            <span className={styles['value']}>
              {value ? numeral(value).format('0.00') : '~'}
            </span>
            <span className={styles['unit']}>
              <p>{unit}</p>
            </span>
            <Button className={styles['create-btn']}>Top-up</Button>
          </section>
        </div>
        <div className={styles['card-data']}>
          <section>
            <p className={styles['text-grey']}>Total revenue</p>
            <span className={styles['box']}>
              <p className={styles['value']}>5831.20</p>
              <span className={styles['unit']}>JCT</span>
            </span>
          </section>
          <section>
            <p className={styles['text-grey']}>Total expenditure</p>
            <span className={styles['red-style']}>
              <p className={styles['value']}>5831.20</p>
              <span className={styles['unit']}>JCT</span>
            </span>
          </section>
          <section>
            <p className={styles['text-grey']}>
              Frozen Amount <i className="iconfont icon-info"></i>
            </p>

            <span className={styles['red-style']}>
              <p className={styles['value']}>5831.20</p>
              <span className={styles['unit']}>JCT</span>
            </span>
          </section>
        </div>
      </section>
    </Card>
  );
};
