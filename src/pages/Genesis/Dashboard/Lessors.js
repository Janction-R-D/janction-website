import { Progress, Table, Input, Radio } from 'antd';
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
  const watchColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div className="activity-name">
          <div className="activity-name-img">
            <img src="" />
          </div>
          <p>{text}</p>
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
        <div
          className={[styles['content-item'], styles['monitor-wrapper']].join(
            ' ',
          )}
        >
          <div className={styles['activity-header']}>
            <h2 className={styles['activity-title']}>Activity</h2>
            <section className={styles['activity-content']}>
              <article>
                <Radio.Group
                  value={size}
                  className={styles['activity-process']}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <Radio.Button value="large">CPU</Radio.Button>

                  <Radio.Button value="memory">Memory</Radio.Button>
                  <Radio.Button value="disk">Disk</Radio.Button>
                  <Radio.Button value="network">Network</Radio.Button>
                </Radio.Group>
              </article>
              <Input
                prefix={
                  <i
                    className="iconfont icon-search"
                    style={{ fontSize: '1vw' }}
                  />
                }
                placeholder="You can fuzzy search for cloud servers"
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
        </div>
      </div>
    </div>
  );
};

export default Lessors;
