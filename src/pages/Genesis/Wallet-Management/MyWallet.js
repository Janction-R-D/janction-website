import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';
import { Button, Card, Col, Input, message, Row, Table } from 'antd';
import numeral from 'numeral';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './wallet.less';
import { fetchIncomeInfo, fetchMarketInfo } from '@/services/genesis';
import { formatDate } from '../Income/utils';
import useData from './Hook/useData';

export default function MyWallet() {
  const { revenue, compared_yesterday, list, statisticData } = useData() || {};
  console.log(revenue);
  return (
    <div className={styles['income-wrapper']}>
      <Row>
        <Col span={24}>
          {StatisticInfo({
            title: 'Statistical information',
            value: '00' || {},
            unit: 'veJCT',
          })}
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="mt40">
        <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
          {RenderIncomeCard({
            title: 'Node income',
            value: revenue?.node_income,
            unit: 'veJCT',
            diffValue: compared_yesterday?.node_i,
            date: formatDate(revenue?.node_income_update_time) || '~',
          })}
        </Col>
        <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
          {RenderIncomeCard({
            title: 'Rental server revenue',
            value: revenue?.rental_server_revenue,
            unit: 'veJCT',
            diffValue: compared_yesterday?.rentalServer_i,
            date: formatDate(revenue?.rental_server_revenue_update_time) || '~',
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
            {diffValue ? numeral(diffValue).format('0%') : '~'}
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
            <div>
              <span className={styles['value']}>
                {value ? numeral(value.total).format('0.00') : '~'}
              </span>
              <span className={styles['unit']}>
                <p>{unit}</p>
              </span>
            </div>
            <Button className={styles['create-btn']}>Top-up</Button>
          </section>
        </div>
        <div className={styles['card-data']}>
          <section>
            <p className={styles['text-grey']}>Total revenue</p>
            <span className={styles['box']}>
              <p className={styles['value']}>
                {value ? numeral(value.total_revenue).format('0.00') : '~'}
              </p>
              <span className={styles['unit']}>JCT</span>
            </span>
          </section>
          <section>
            <p className={styles['text-grey']}>Total expenditure</p>
            <span className={styles['red-style']}>
              <p className={styles['value']}>
                {' '}
                {value ? numeral(value.total_revenue).format('0.00') : '~'}
              </p>
              <span className={styles['unit']}>JCT</span>
            </span>
          </section>
          <section>
            <p className={styles['text-grey']}>
              Frozen Amount <i className="iconfont icon-info"></i>
            </p>

            <span className={styles['red-style']}>
              <p className={styles['value']}>
                {' '}
                {value ? numeral(value.gross_pledge).format('0.00') : '~'}
              </p>
              <span className={styles['unit']}>JCT</span>
            </span>
          </section>
        </div>
      </section>
    </Card>
  );
};
