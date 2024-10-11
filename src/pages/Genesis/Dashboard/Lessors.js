import { Progress, Table } from 'antd';
import numeral from 'numeral';
import { useState } from 'react';
import HorizontalBar from './components/HorizontalBar';
import Pie from './components/Pie';
import VerticalBar from './components/VerticalBar';
import { mockSalesPipeline, newsData, pieColors } from './data';
import data from './Instance.json';
import styles from './index.less';
import Invite from './components/Invite';

const Lessors = (props) => {
  const [news, setNews] = useState(newsData);
  const [watchList, setWatchList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  const [salesPipeline, setSalesPipeline] = useState(mockSalesPipeline);

  const watchColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div>
          <div>
            <img src="" />
          </div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: '%CPU',
      dataIndex: 'GPU-PERCENT',
      render: (text) => <p>{numeral(text || 0).format('$0,0')}</p>,
    },
    {
      title: 'CPU Time',
      dataIndex: 'CPUtime',
      key: 'CPUtime',
    },
    {
      title: 'Threads',
      dataIndex: 'Threads',
      key: 'Threads',
    },
    {
      title: 'Idle wake-up',
      dataIndex: 'Idle',
      key: 'Idle',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
    },
    {
      title: '%GPU',
      dataIndex: 'GPUPERCENT',
      render: (text) => numeral(text || 0).format('$0,0'),
    },
    {
      title: 'GPU Time',
      dataIndex: 'GPUTime',
      key: 'GPUTime',
    },
    {
      title: 'PID',
      dataIndex: 'PID',
      key: 'PID',
    },
    {
      title: 'other',
      dataIndex: 'other',
      key: 'other',
    },
  ];

  return (
    <div className={styles['dashboard-wrapper']}>
      <h1>Dashboard</h1>
      <Invite />
      <div className={styles['dashboard-content']}>
        <div
          className={[styles['content-item'], styles['sales-wrapper']].join(
            ' ',
          )}
        >
          <div className={styles['title']}>
            <span>Sales by Rep</span>
            <div className={styles['extra']}>
              <span>See All</span>
              <i className="iconfont icon-next_page"></i>
            </div>
          </div>
          <div className={styles['content']}>
            <HorizontalBar />
          </div>
        </div>
        <div
          className={[styles['content-item'], styles['state-wrapper']].join(
            ' ',
          )}
        >
          <div className={styles['title']}>
            <span>State</span>
          </div>
          <div className={styles['content']}>
            <div className={styles['chart-wrapper']}>
              <VerticalBar />
            </div>
            <div className={styles['progress-wrapper']}>
              <div className={styles['title']}>
                <span>Conversion</span>
                <span>100 / 30 % </span>
              </div>
              <Progress percent={30} strokeColor="#00BBD4" showInfo={false} />
              <div className={styles['range']}>
                <span>0</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={[
            styles['content-item'],
            styles['sales-pipeline-wrapper'],
          ].join(' ')}
        >
          <div className={styles['title']}>
            <span>Sales Pipeline</span>
            <div className={styles['extra']}>
              <span>See All</span>
              <i className="iconfont icon-next_page"></i>
            </div>
          </div>
          <div className={styles['content']}>
            <div className={styles['chart-wrapper']}>
              <Pie />
            </div>
            <div className={styles['info']}>
              {salesPipeline.map((item, index) => (
                <div className={styles['info-item']} key={item.name}>
                  <div
                    className={styles['name']}
                    style={{ '--color': pieColors[index] }}
                  >
                    {item.name}
                  </div>
                  <div className={styles['value']}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={[styles['content-item'], styles['profit-wrapper']].join(
            ' ',
          )}
        >
          <div className={styles['title']}>
            <span>Profit</span>
          </div>
          <div className={styles['content']}>
            <div className={styles['total-wrapper']}>
              <div className={styles['total-item']}>
                <div className={styles['value']}>$1900.00</div>
                <div className={styles['name']}>Total</div>
              </div>
              <div className={styles['total-item']}>
                <div className={styles['value']}>$190.00</div>
                <div className={styles['name']}>Rental income</div>
              </div>
              <div className={styles['total-item']}>
                <div className={styles['value']}>$19.00</div>
                <div className={styles['name']}>Pledge proceeds</div>
              </div>
            </div>
            <div className={styles['progress-wrapper']}>
              <div className={styles['title']}>Monthly Goal</div>
              <div className={styles['goal']}>
                <span>Goal $8.2m</span>
              </div>
              <Progress
                percent={30}
                strokeColor="#00BBD4"
                strokeWidth={33}
                style={{ '--curVal': '$6.2m' }}
                // strokeLinecap="butt"
                showInfo={false}
              />
            </div>
          </div>
        </div>
        <div
          className={[styles['content-item'], styles['monitor-wrapper']].join(
            ' ',
          )}
        >
          <Table
            bordered={false}
            className={styles['table']}
            columns={watchColumns}
            dataSource={data}
            pagination={false}
          ></Table>
        </div>
      </div>
    </div>
  );
};

export default Lessors;
