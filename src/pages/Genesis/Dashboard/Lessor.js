import JanctionTable from '@/components/JanctionTable';
import { fetchLessor } from '@/services/genesis/dashboard';
import { empty } from '@/utils/lang';
import { Input, message, Radio } from 'antd';
import numeral from 'numeral';
import { useEffect, useMemo, useState } from 'react';
import HorizontalBar from './components/HorizontalBar';
import Invitation from './components/Invitation';
import Pie from './components/Pie';
import Profit from './components/Profit';
import { ARITHMETIC_SITUATION, pieColors } from './data';
import styles from './index.less';
import NTFcard from './components/NTFcard';
import ContributorReward from './components/ContributorReward';
import { useModel } from 'umi';

export function convertMBtoGB(mb) {
  if (empty(mb)) return '~';
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
  const { code } = useModel('common');

  const percent = useMemo(() => {
    const { monthly_goal = 0, total = 0 } = lessorsData?.profit || {};
    if (monthly_goal) return (total / monthly_goal) * 100;
    return 0;
  }, [lessorsData]);

  useEffect(() => {
    getLessors();
  }, []);
  const getLessors = async () => {
    try {
      const res = await fetchLessor();
      setLessorsData(res);
      setMonitorList(res?.activites || []);
    } catch (error) {
      console.log('『error』', error);
    }
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

  const nft_sumary = useMemo(() => {
    const { ammount, detail } = lessorsData?.nft_summary || {};
    return {
      ammount: ammount || 0,
      detail: detail || [],
    };
  }, [lessorsData]);

  const onSortChange = (e) => {
    const sortField = e.target.value;
    const _monitorList = monitorList.sort(
      (a, b) => b[sortField] - a[sortField],
    );
    setMonitorList([..._monitorList]);
  };
  const watchColumns = [
    {
      title: 'Platform',
      dataIndex: 'platform',
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
    },
    {
      title: 'CPU',
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
      title: 'MEM',
      dataIndex: 'memory_usage',
    },
    {
      title: 'State',
      dataIndex: 'status',
    },
  ];
  return (
    <div className={styles['dashboard-wrapper']}>
      <Invitation />

      <div className={styles['dashboard-content']}>
        {!!nft_sumary?.ammount && (
          <ContributorReward nft={nft_sumary.ammount} />
        )}
        <div className={styles['dashboard-cards']}>
          <div className={styles['dashboard-content-left']}>
            {nft_sumary.ammount !== 0 ? (
              <div
                className={[
                  styles['content-item'],
                  styles['sales-wrapper'],
                ].join(' ')}
              >
                <NTFcard nft={nft_sumary} />
              </div>
            ) : (
              <div
                className={[
                  styles['content-item'],
                  styles['sales-wrapper'],
                ].join(' ')}
              >
                <div className={styles['title']}>
                  <span>Sales by Rep</span>
                  {/* <div className={styles['extra']}>
                    <span>See All</span>
                    <i className="iconfont icon-next_page"></i>
                  </div> */}
                </div>
                <div className={styles['content']}>
                  <HorizontalBar data={sales_by_rep || []} />
                </div>
              </div>
            )}
            <div
              className={[
                styles['content-item'],
                styles['sales-pipeline-wrapper'],
              ].join(' ')}
            >
              <div className={styles['title']}>
                <span>Arithmetic situation</span>
                {/* <div className={styles['extra']}>
              <span>See All</span>
              <i className="iconfont icon-next_page"></i>
            </div> */}
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
          </div>
          <Profit
            lessorsData={lessorsData}
            getLessors={getLessors}
            percent={percent}
          />
        </div>

        <div
          className={[styles['content-item'], styles['monitor-wrapper']].join(
            ' ',
          )}
        >
          <section className={styles['filters']}>
            <div className={styles['activity-filter']}>
              <div className={styles['title']}>
                <span>Activity Monitor</span>
              </div>
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
            <div className={styles['activity-filter-search']}>
              <Radio.Group
                defaultValue="large"
                buttonStyle="solid"
                className={styles['activity-monitor']}
                onChange={onSortChange}
              >
                <Radio.Button value="cpu_usage">CPU</Radio.Button>
                <Radio.Button value="memory_usage">Memory</Radio.Button>
                {/* <Radio.Button value="energy">Energy</Radio.Button> */}
                <Radio.Button value="disk_usage">Disk</Radio.Button>
                <Radio.Button value="network">Network</Radio.Button>
              </Radio.Group>
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
          </section>
          <JanctionTable
            bordered={false}
            className={styles['table']}
            columns={watchColumns}
            dataSource={monitorList}
            pagination={false}
            scroll={{ x: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Lessors;
