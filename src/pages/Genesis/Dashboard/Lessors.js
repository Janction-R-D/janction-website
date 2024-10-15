import { Progress, Table, Input, Radio, Card } from 'antd';
import numeral from 'numeral';
import { useMemo, useState } from 'react';
import HorizontalBar from './components/HorizontalBar';
import Pie from './components/Pie';
import VerticalBar from './components/VerticalBar';
import { mockSalesPipeline, newsData, pieColors } from './data';
import data from './Instance.json';
import styles from './index.less';
import Invite from './components/Invite';
import Graph from './Graph';

const Lessors = (props) => {
  const [news, setNews] = useState(newsData);
  const [watchList, setWatchList] = useState([]);
  const [recommendList, setRecommendList] = useState([]);
  const [salesPipeline, setSalesPipeline] = useState(mockSalesPipeline);
  const [size, setSize] = useState('large');
  const [monthlyGoal, setMonthlyGoal] = useState({ value: 9.2, goal: 10 });

  const percent = useMemo(() => {
    if (!monthlyGoal) return 0;
    const { value, goal } = monthlyGoal;
    if (goal) return (value / goal) * 100;
    return 0;
  }, monthlyGoal);

  const handleSearch = (text) => {};
  // const watchColumns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: (text) => (
  //       <div className="activity-name">
  //         <p>{text}</p>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: '%CPU',
  //     dataIndex: 'GPU-PERCENT',
  //     render: (text) => <p>{numeral(text || 0).format('$0,0')}</p>,
  //   },
  //   {
  //     title: 'CPU Time',
  //     dataIndex: 'CPUtime',
  //     key: 'CPUtime',
  //   },
  //   {
  //     title: 'Threads',
  //     dataIndex: 'Threads',
  //     key: 'Threads',
  //   },
  //   {
  //     title: 'Idle wake-up',
  //     dataIndex: 'Idle',
  //     key: 'Idle',
  //   },
  //   {
  //     title: 'Type',
  //     dataIndex: 'Type',
  //     key: 'Type',
  //   },
  //   {
  //     title: '%GPU',
  //     dataIndex: 'GPUPERCENT',
  //     render: (text) => numeral(text || 0).format('$0,0'),
  //   },
  //   {
  //     title: 'GPU Time',
  //     dataIndex: 'GPUTime',
  //     key: 'GPUTime',
  //   },
  //   {
  //     title: 'PID',
  //     dataIndex: 'PID',
  //     key: 'PID',
  //   },
  //   {
  //     title: 'other',
  //     dataIndex: 'other',
  //     key: 'other',
  //   },
  // ];
  const watchColumns = [
    {
      title: 'PID',
      dataIndex: 'PID',
      key: 'PID',
    },

    {
      title: 'Command',
      dataIndex: 'Command',
      key: 'Command',
    },
    {
      title: '%CPU',
      dataIndex: 'GPU-PERCENT',
    },
    {
      title: '%CPU',
      dataIndex: 'CPU',
      key: 'CPU',
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
      dataIndex: 'MEM',
      key: 'MEM',
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
      dataIndex: 'State',
      key: 'State',
    },
    {
      title: 'Boosts',
      dataIndex: 'Boosts',
      key: 'Boosts',
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
          </div>
        </div>
        <div
          className={[
            styles['content-item'],
            styles['sales-pipeline-wrapper'],
          ].join(' ')}
        >
          <div className={styles['title']}>
            <span>Arithmetic situation</span>
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
                <div className={styles['name']}>Total</div>
                <div className={styles['value']}>$1900.00</div>
              </div>
              <div className={styles['total-item']}>
                <div className={styles['name']}>Rental income</div>
                <div className={styles['value']}>$190.00</div>
              </div>
              <div className={styles['total-item']}>
                <div className={styles['name']}>Pledge proceeds</div>
                <div className={styles['value']}>$19.00</div>
              </div>
            </div>
            <div className={styles['progress-wrapper']}>
              <div className={styles['title']}>
                <div className={styles['name']}>Monthly Goal</div>
                <div className={styles['goal']}>
                  <span>Goal $8.2m</span>
                </div>
              </div>
              <div className={styles['progress-bar']}>
                <div
                  className={styles['value-bar']}
                  style={{ width: `${percent}%` }}
                >
                  <span
                    style={
                      percent > 90
                        ? { right: '8px', transform: `translate(0, -50%)` }
                        : { right: '-8px', transform: `translate(100%, -50%)` }
                    }
                  >{`$${monthlyGoal.value}m`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Card
          className={[styles['content-item'], styles['monitor-wrapper']].join(
            ' ',
          )}
        >
          <div className={styles['activity-header']}>
            <h2 className={styles['activity-title']}>Activity Monitor</h2>
            <section className={styles['activity-content']}>
              <article>
                <Radio.Group
                  defaultValue="large"
                  buttonStyle="solid"
                  className={styles['activity-monitor']}
                >
                  <Radio.Button value="large">CPU</Radio.Button>
                  <Radio.Button value="memory">内存</Radio.Button>
                  <Radio.Button value="energy">能耗</Radio.Button>
                  <Radio.Button value="disk">磁盘</Radio.Button>
                  <Radio.Button value="network">网络</Radio.Button>
                </Radio.Group>
              </article>
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
            </section>
          </div>
          <Table
            bordered={false}
            className={styles['table']}
            columns={watchColumns}
            dataSource={data}
            pagination={false}
          ></Table>
          <section className={styles['graph']}>
            <div className={styles['graph-container']}>
              <div className={styles['graph-data']}>
                <span>
                  <p>系统:</p>
                  <p className={styles['red']}>4.24%</p>
                </span>
                <span>
                  <p>用户:</p>
                  <p className={styles['blue']}>7.24%</p>
                </span>
                <span>
                  <p>闲置:</p>
                  <p>7.24%</p>
                </span>
              </div>
              <div className={styles['graph-cpu']}>
                <h4>CPU 负载</h4>
                <Graph />
              </div>
              <div className={styles['graph-infos']}>
                <span>
                  <p>线程:</p>
                  <p>6,226</p>
                </span>
                <span>
                  <p>进程:</p>
                  <p>956</p>
                </span>
              </div>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
};

export default Lessors;
