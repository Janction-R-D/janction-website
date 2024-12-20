import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';
import { Card, Col, Input, Row, Table } from 'antd';
import numeral from 'numeral';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import { fetchIncomeInfo } from '@/services/genesis';
import { empty } from '@/utils/lang';
import dayjs from 'dayjs';
import JanctionTable from '@/components/JanctionTable';
import { formatDate } from './utils';

export default function Income() {
  const [list, setList] = useState([]);
  const [revenue, setRevenue] = useState();
  const [statisticData, setStatisticData] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  console.log(list);
  const getData = async () => {
    try {
      const { statistical_info, transaction_records, ...extra } =
        await fetchIncomeInfo();
      setStatisticData(statistical_info);

      const newList = transaction_records.map((item, index) => ({
        ...item,
        key: index,
      }));

      setList(newList || []);

      setRevenue(extra);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const compared_yesterday = useMemo(() => {
    let node_i = '~';
    let rentalServer_i = '~';
    if (!revenue) return { node_i, rentalServer_i };
    const {
      node_income = 0,
      node_income_yesterday = 0,
      rental_server_revenue = 0,
      rental_server_revenue_yesterday = 0,
    } = revenue;
    if (!node_income_yesterday) {
      node_i = 1;
    }
    if (!rental_server_revenue_yesterday) {
      rentalServer_i = 1;
    }
    node_i = (node_income - node_income_yesterday) / node_income_yesterday;
    rentalServer_i =
      (rental_server_revenue - rental_server_revenue_yesterday) /
      rental_server_revenue_yesterday;
    return { node_i, rentalServer_i };
  }, [revenue]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text, record) => {
        if (empty(text)) return '--';
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Number',
      dataIndex: 'ammount',
      render: (text, record) => {
        if (empty(text)) return '--';
        return `${text} ${record.unit}`;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      render: (text) => text || '--',
    },
    {
      title: 'Remark',
      dataIndex: 'comment',
    },
  ];

  const renderIncomeCard = ({ title, value, unit, diffValue, date }) => {
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
            <span className={styles['diff-value']}>
              {diffValue ? numeral(diffValue).format('0%') : '~'}
            </span>
          </div>
          <span className={styles['update-time']}>Last Updated: {date}</span>
        </div>
      </Card>
    );
  };
  return (
    <div className={styles['income-wrapper']}>
      <h1 className={styles['title']}>Income management</h1>
      <Row gutter={[20, 20]} className="mt40">
        <Col span={12}>
          {renderIncomeCard({
            title: 'Node income',
            value: revenue?.node_income,
            unit: 'veJCT',
            diffValue: compared_yesterday?.node_i,
            date: formatDate(revenue?.node_income_update_time),
          })}
        </Col>
        <Col span={12}>
          {renderIncomeCard({
            title: 'Rental server revenue',
            value: revenue?.rental_server_revenue,
            unit: 'veJCT',
            diffValue: compared_yesterday?.rentalServer_i,
            date: formatDate(revenue?.rental_server_revenue_update_time),
          })}
        </Col>
        <Col span={24}>
          <Card title="Transaction record" className={styles['card']}>
            <div className={styles['activity-filter']}>
              <Input
                suffix={
                  <i
                    className="iconfont icon-search"
                    style={{ fontSize: '1vw' }}
                  />
                }
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
                className={styles['search-input']}
              />
            </div>
            <JanctionTable
              bordered={false}
              className={styles['table']}
              columns={columns}
              dataSource={list}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Statistical information" className={styles['card']}>
            <div className={styles['total-wrapper']}>
              <div className={styles['total-item']}>
                <div className={styles['name']}>Total</div>
                <div className={styles['value-wrapper']}>
                  <span className={styles['value']}>
                    {numeral(statisticData?.total_revenue || 0).format('0.00')}
                  </span>
                  <span className={styles['unit']}>veJCT</span>
                </div>
              </div>
              <div className={styles['total-item']}>
                <div className={styles['name']} title="Rental income">
                  Rental income
                </div>
                <div className={styles['value-wrapper']}>
                  <span className={styles['value']}>
                    {numeral(statisticData?.gross_pledge || 0).format('0.00')}
                  </span>
                  <span className={styles['unit']}>veJCT</span>
                </div>
              </div>
              <div className={styles['total-item']}>
                <div className={styles['name']} title="Staking proceeds">
                  Staking proceeds
                </div>
                <div className={styles['value-wrapper']}>
                  <span className={styles['value']}>
                    {numeral(statisticData?.gross_let || 0).format('0.00')}
                  </span>
                  <span className={styles['unit']}>veJCT</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
