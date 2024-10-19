import { fetchLessor } from '@/services/genesis/dashboard';
import { Card, Input, Radio, Table } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import HorizontalBar from './components/HorizontalBar';
import Invite from './components/Invite';
import Pie from './components/Pie';
import VerticalBar from './components/VerticalBar';
import { ARITHMETIC_SITUATION, pieColors } from './data';
import numeral from 'numeral';
import styles from './index.less';

export function convertMBtoGB(mb) {
  const gb = mb / 1024; // 1 GB = 1024 MB
  if (gb >= 1) {
    return `${gb.toFixed(2)} GB`; // 保留两位小数
  } else {
    return `${mb} MB`; // 直接返回MB格式
  }
}

const Lessors = (props) => {
  const [lessorsData, setLessorsData] = useState();
  const [monitorList, setMonitorList] = useState([]);

  const percent = useMemo(() => {
    const { monthly_goal = 0, total = 0 } = lessorsData?.Profit || {};
    if (monthly_goal) return (total / monthly_goal) * 100;
    return 0;
  }, [lessorsData]);

  useEffect(() => {
    getLessors();
  }, []);
  const getLessors = async () => {
    const res = await fetchLessor();
    setLessorsData(res);
    setMonitorList(res?.activites || []);
  };

  const sales_by_rep = useMemo(() => {
    const maxPrice = (lessorsData?.sales_by_rep || []).reduce(
      (max, item) => (item.price > max ? item.price : max),
      0,
    );
    return (lessorsData?.sales_by_rep || []).map((item) => {
      let brand = (item.brand || '').toLowerCase();
      const isNvidia = brand == 'nvdia';
      return {
        ...item,
        icon: brand == 'nvdia' ? 'nvidia' : brand == 'apple' ? 'macos' : brand,
        color: isNvidia ? '#76b900' : '#fff',
        percent: maxPrice ? `${(item.price / maxPrice) * 100}%` : 0,
      };
    });
  }, [lessorsData]);

  const arithmetic_situation = useMemo(() => {
    const {
      online_memory_footprint = 0,
      offline_memory_footprint = 0,
      free_memory = 0,
    } = lessorsData?.arithmetic_situation || {};
    return [
      {
        name: ARITHMETIC_SITUATION.online_memory_footprint,
        value: online_memory_footprint,
        format: convertMBtoGB(online_memory_footprint),
      },
      {
        name: ARITHMETIC_SITUATION.offline_memory_footprint,
        value: offline_memory_footprint,
        format: convertMBtoGB(offline_memory_footprint),
      },
      {
        name: ARITHMETIC_SITUATION.free_memory,
        value: free_memory,
        format: convertMBtoGB(free_memory),
      },
    ];
  }, [lessorsData]);

  const handleSearch = (text) => {};
  const onSortChange = (e) => {
    const sortField = e.target.value;
    const _monitorList = monitorList.sort(
      (a, b) => b[sortField] - a[sortField],
    );
    setMonitorList([..._monitorList]);
  };
  const watchColumns = [
    // {
    //   title: 'PID',
    //   dataIndex: 'PID',
    //   key: 'PID',
    // },

    // {
    //   title: 'Command',
    //   dataIndex: 'Command',
    //   key: 'Command',
    // },
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
            <HorizontalBar data={sales_by_rep || []} />
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
              <VerticalBar data={lessorsData?.states || {}} />
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
              <Pie data={arithmetic_situation} />
            </div>
            <div className={styles['info']}>
              {arithmetic_situation.map((item, index) => (
                <div className={styles['info-item']} key={item.name}>
                  <div
                    className={styles['name']}
                    style={{ '--color': pieColors[index] }}
                  >
                    {item.name}
                  </div>
                  <div className={styles['value']}>{item.format}</div>
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
                <div className={styles['value']}>
                  {numeral(lessorsData?.Profit?.total || 0).format('$0.00')}
                </div>
              </div>
              <div className={styles['total-item']}>
                <div className={styles['name']}>Rental income</div>
                <div className={styles['value']}>
                  {numeral(lessorsData?.Profit?.rental_income || 0).format(
                    '$0.00',
                  )}
                </div>
              </div>
              <div className={styles['total-item']}>
                <div className={styles['name']}>Pledge proceeds</div>
                <div className={styles['value']}>
                  {numeral(lessorsData?.Profit?.pledge_proceeds || 0).format(
                    '$0.00',
                  )}
                </div>
              </div>
            </div>
            <div className={styles['progress-wrapper']}>
              <div className={styles['title']}>
                <div className={styles['name']}>Monthly Goal</div>
                <div className={styles['goal']}>
                  <span>
                    Goal{' '}
                    {numeral(lessorsData?.Profit?.monthly_goal || 0).format(
                      '$0.00',
                    )}
                    {' m'}
                  </span>
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
                  >
                    {numeral(lessorsData?.Profit?.total || 0).format('$0.00')}m
                  </span>
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
                  onChange={onSortChange}
                >
                  <Radio.Button value="cpu_usage">CPU</Radio.Button>
                  <Radio.Button value="memory_usage">内存</Radio.Button>
                  <Radio.Button value="energy">能耗</Radio.Button>
                  <Radio.Button value="disk_usage">磁盘</Radio.Button>
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
            dataSource={monitorList}
            pagination={false}
          ></Table>
        </Card>
      </div>
    </div>
  );
};

export default Lessors;
