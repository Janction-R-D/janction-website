import device_bg from '@/assets/images/explore/device_bg.png';
import '@/assets/images/explore/node_overview_bg.png';
import '@/assets/images/explore/node_overview_android_bg.png';
import '@/assets/images/explore/statistic_bg.png';
import '@/assets/images/explore/nav_bg.png';
import { renderBackgroudImg } from '@/utils/lang';
import { List, Statistic } from 'antd';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import DevicePie from './components/DevicePie';
import styles from './index.less';
import {
  mockNodesPoints,
  mockPointsData,
  nodesOverviewColumns,
  nodesPointsFilters,
} from './data';
import {
  fetchNodesPoints,
  fetchOverviewNodes,
  fetchRuningNodes,
} from '../../services/explore/nodes';
import { formatToHours } from '../../utils/datetime';

const Nodes = (props) => {
  // Node Runing's data
  const [statisticData, setStatisticData] = useState();
  // Node Overview's data
  const [nodes, setNodes] = useState([]);
  // NODES POINTS's data
  const [nodesPoints, setNodesPoints] = useState([]);
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deviceType, setDeviceType] = useState('all');
  const [query, setQuery] = useState({});
  const [noMore, setNoMore] = useState(false);

  useEffect(() => {
    getStatistic();
    getNodes();
  }, []);

  useEffect(() => {
    getNodesPoints({ task_name: 'simple_linear_regression' });
  }, [deviceType]);

  const onFilterChange = (filter) => {
    setDeviceType(filter);
  };

  const getStatistic = async () => {
    try {
      const data = await fetchRuningNodes();
      const liveData = await fetchRuningNodes({ is_online: true });
      setStatisticData({ ...data, liveNodes: liveData.total });
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const getNodes = async () => {
    try {
      const data = await fetchOverviewNodes();
      setNodes(
        Object.keys(data)
          .filter((item) => item !== 'total_online_time' && item !== 'total')
          .map((item) => ({
            name: item,
            value: data[item],
          })),
      );
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const getNodesPoints = async (values = {}) => {
    const params = { ...query, ...values };
    setLoading(true);
    try {
      const data = await fetchNodesPoints(params);
      if (!data || !data.total || data?.total < params.size) {
        setNoMore(true);
      } else {
        setQuery(params);
      }
      if (params.page == 1) {
        setNodesPoints(data.list);
      } else {
        setNodesPoints([...nodesPoints, ...(data.list || [])]);
      }
    } catch (err) {}
    setLoading(false);
  };

  const loadMore = async () => {
    await getNodesPoints({ page: query.page + 1 });
  };

  return (
    <div className={styles['node-wrapper']}>
      <div className={[styles['wrapper'], styles['node-running']].join(' ')}>
        <h1>Node Running</h1>
        <div className={styles['content']}>
          <Statistic
            title="Live Nodes"
            value={numeral(statisticData?.liveNodes || 0).format('0,0')}
          />
          <Statistic
            title="Total Compute Hours"
            value={numeral(
              formatToHours(statisticData?.total_online_time) || 0,
            ).format('0,0')}
          />
          <Statistic
            title="Total Nodes"
            value={numeral(statisticData?.total || 0).format('0,0')}
          />
        </div>
      </div>
      <div className={[styles['wrapper'], styles['node-overview']].join(' ')}>
        <h1>Node Overview</h1>
        <div className={styles['content']}>
          <div className={styles['echart-wrapper']}>
            <DevicePie data={nodes} />
          </div>
          <div
            className={styles['device-wrapper']}
            style={renderBackgroudImg(device_bg)}
          >
            <div className={styles['header']}>
              {nodesOverviewColumns.map((item) => (
                <div className={styles['th']} key={item.dataIndex}>
                  {item.title}
                </div>
              ))}
            </div>
            <div className={styles['body']}>
              {nodes.map((item, index) => (
                <div
                  className={styles['td']}
                  key={item.name}
                  style={{
                    '--opacity': index == 0 ? 1 : 1 - 0.2 * (index - 1),
                    '--color': index == 0 ? '#73D5F4' : '#D9ACA2',
                  }}
                >
                  <i
                    className={[
                      'iconfont',
                      `icon-${item.type}`,
                      styles[item.type],
                    ].join(' ')}
                  ></i>
                  <div className={styles['name']}>{item.name}</div>
                  <div className={styles['value']}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={[styles['wrapper'], styles['node-points']].join(' ')}>
        <h1>Nodes Points</h1>
        <div className={styles['filters']}>
          {nodesPointsFilters.map((item) => (
            <div
              key={item.value}
              onClick={() => onFilterChange(item.value)}
              className={`${deviceType === item.value ? styles['active'] : ''}`}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className={styles['content']}>
          <List
            className={styles['device-list']}
            loading={initLoading}
            itemLayout="vertical"
            loadMore={
              initLoading || loading || noMore ? null : (
                <div className={styles['load-more']}>
                  <span onClick={loadMore}>Show More</span>
                </div>
              )
            }
            dataSource={nodesPoints}
            renderItem={(item) => (
              <List.Item>
                <div className={styles['device-item']}>
                  <div className={styles['icon']}>
                    <i
                      className={[
                        'iconfont',
                        `icon-${item.type}`,
                        styles[item.type],
                      ].join(' ')}
                    ></i>
                  </div>
                  <div className={styles['name']}>{item.deviceName}</div>
                  <div className={styles['price']}>{item.price}</div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Nodes;
