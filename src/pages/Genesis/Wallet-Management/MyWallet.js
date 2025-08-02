import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';
import { Card, Col, Row } from 'antd';
import numeral from 'numeral';
import React from 'react';
import styles from './wallet.less';
import { formatDate } from '../Income/utils';
import useData from './Hook/useData';
import Graph from './components/Graph/Graph';
import { useIntl } from 'umi';

export default function MyWallet() {
  const { revenue, compared_yesterday } = useData() || {};
  const intl = useIntl();

  return (
    <div className={styles['income-wrapper']}>
      <Row>
        <Col span={24}>
          {StatisticInfo({
            title: intl.formatMessage({ id: 'wallet.statistics.title' }),
            value: '00' || {},
            unit: 'veJCT',
            intl,
          })}
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="mt40">
        <Col span={12}>
          {RenderIncomeCard({
            title: intl.formatMessage({ id: 'wallet.node.income' }),
            value: revenue?.node_income,
            unit: 'veJCT',
            diffValue: compared_yesterday?.node_i,
            date: formatDate(revenue?.node_income_update_time) || '~',
            intl,
          })}
        </Col>
        <Col span={12}>
          {RenderIncomeCard({
            title: intl.formatMessage({ id: 'wallet.rental.revenue' }),
            value: revenue?.rental_server_revenue,
            unit: 'veJCT',
            diffValue: compared_yesterday?.rentalServer_i,
            date: formatDate(revenue?.rental_server_revenue_update_time) || '~',
            intl,
          })}
        </Col>
      </Row>
    </div>
  );
}

const RenderIncomeCard = ({ title, value, unit, diffValue, date, intl }) => {
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
          <span className={styles['name']}>
            {intl.formatMessage({ id: 'wallet.compare.yesterday' })}
          </span>
          <img src={isDrop ? drop : rise} alt="diff" />
          <span
            className={`${styles['diff-value']} ${
              diffValue > 0 ? styles['text-red'] : styles['text-green']
            }`}
          >
            {diffValue ? numeral(diffValue).format('0%') : '~'}
          </span>
        </div>
        <span className={styles['update-time']}>
          {intl.formatMessage({ id: 'wallet.last.updated' })}: {date}
        </span>
      </div>
      <section className={styles['graph']}>
        <Graph />
      </section>
    </Card>
  );
};

const StatisticInfo = ({ title, value, unit, intl }) => {
  return (
    <Card title={title} className={styles['card-statistic']}>
      <section>
        <div className={styles['statistic-value']}>
          <p className={styles['text-grey']}>
            {intl.formatMessage({ id: 'wallet.balance.available' })}
          </p>
          <section>
            <div>
              <span className={styles['value']}>
                {value ? numeral(value.total).format('0.00') : '~'}
              </span>
              <span className={styles['unit']}>
                <p>{unit}</p>
              </span>
            </div>
          </section>
        </div>
        <div className={styles['card-data']}>
          <section>
            <p className={styles['text-grey']}>
              {intl.formatMessage({ id: 'wallet.total.revenue' })}
            </p>
            <span className={styles['box']}>
              <p className={styles['value']}>
                {value ? numeral(value.total_revenue).format('0.00') : '~'}
              </p>
              <span className={styles['unit']}>JCT</span>
            </span>
          </section>
          <section>
            <p className={styles['text-grey']}>
              {intl.formatMessage({ id: 'wallet.total.expenditure' })}
            </p>
            <span className={styles['red-style']}>
              <p className={styles['value']}>
                {value ? numeral(value.total_revenue).format('0.00') : '~'}
              </p>
              <span className={styles['unit']}>JCT</span>
            </span>
          </section>
          <section>
            <p className={styles['text-grey']}>
              {intl.formatMessage({ id: 'wallet.frozen.amount' })}{' '}
              <i className="iconfont icon-info"></i>
            </p>
            <span className={styles['red-style']}>
              <p className={styles['value']}>
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
