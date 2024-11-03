import drop from '@/assets/images/icons/drop.png';
import rise from '@/assets/images/icons/rise.png';
import { Card, Col, Input, Row, Table } from 'antd';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

export default function Income() {
  const [list, setList] = useState([]);
  const [statisticData, setStatisticData] = useState(null);

  useEffect(() => {}, []);

  const columns = [
    {
      title: 'Platform',
      dataIndex: 'platform',
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
    },
    {
      title: '%CPU',
      dataIndex: 'cpu_usage',
    },
    {
      title: 'ENERGY',
      dataIndex: 'energy',
    },
    {
      title: 'DISK',
      dataIndex: 'disk_usage',
    },
    {
      title: 'Time',
      dataIndex: 'uptime',
      render: (text) => {
        return numeral(text || 0).format('0.0s');
      },
    },
    {
      title: '#TH',
      dataIndex: 'TH',
      key: 'TH',
    },
    {
      title: '#WQ',
      dataIndex: 'WQ',
      key: 'WQ',
    },
    {
      title: '#Ports',
      dataIndex: 'Ports',
      key: 'Ports',
    },
    {
      title: 'MEM',
      dataIndex: 'memory_usage',
    },
    {
      title: 'PURG',
      dataIndex: 'PURG',
      key: 'PURG',
    },
    {
      title: 'Cmprs',
      dataIndex: 'Cmprs',
      key: 'Cmprs',
    },
    {
      title: 'PPID',
      dataIndex: 'PPID',
      key: 'PPID',
    },
    {
      title: 'State',
      dataIndex: 'status',
    },
    {
      title: 'Boosts',
      dataIndex: 'Boosts',
      key: 'Boosts',
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
              {diffValue ? numeral(diffValue).format('0%') : diffValue}
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
            value: '5831.20',
            unit: 'JTT',
            diffValue: '-0.15',
            date: '2020-09-31 20:59:59',
          })}
        </Col>
        <Col span={12}>
          {renderIncomeCard({
            title: 'Rental server revenue',
            value: '5831.20',
            unit: 'JTT',
            diffValue: '0.15',
            date: '2020-09-31 20:59:59',
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
            <Table
              bordered={false}
              className={styles['table']}
              columns={columns}
              dataSource={list}
              pagination={false}
            ></Table>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Statistical information" className={styles['card']}>
            <div className={styles['total-wrapper']}>
              <div className={styles['total-item']}>
                <div className={styles['name']}>Total</div>
                <div className={styles['value-wrapper']}>
                  <span className={styles['value']}>
                    {numeral(statisticData?.total_revenue || 0).format('$0.00')}
                  </span>
                  <span className={styles['unit']}>JTT</span>
                </div>
              </div>
              <div className={styles['total-item']}>
                <div className={styles['name']} title="Rental income">
                  Rental income
                </div>
                <div className={styles['value-wrapper']}>
                  <span className={styles['value']}>
                    {numeral(statisticData?.gross_pledge || 0).format('$0.00')}
                  </span>
                  <span className={styles['unit']}>JTT</span>
                </div>
              </div>
              <div className={styles['total-item']}>
                <div className={styles['name']} title="Pledge proceeds">
                  Pledge proceeds
                </div>
                <div className={styles['value-wrapper']}>
                  <span className={styles['value']}>
                    {numeral(statisticData?.gross_let || 0).format('$0.00')}
                  </span>
                  <span className={styles['unit']}>JTT</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
