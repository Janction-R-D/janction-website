import device_bg from '@/assets/images/explore/device_bg.png';
import node_overview_bg from '@/assets/images/explore/node_overview_bg.png';
import '@/assets/images/explore/statistic_bg.png';
import { renderBackgroudImg } from '@/utils/lang';
import { List, Statistic } from 'antd';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import { fetchUserCreditsInfo } from '../../services/explore/point';
import DevicePie from './components/DevicePie';
import styles from './main.less';
import useScale from '../../hooks/useScale';

function extendArray(arr, len) {
  if (arr.length === 0 || arr.length >= len) return arr.slice(0, len);

  let result = arr.slice();
  while (result.length < len) {
    result.push(...arr.slice(0, len - result.length));
  }
  return result;
}

const filters = [
  { value: 'all', label: 'All' },
  { value: 'nvidia', label: 'Nvidia' },
  { value: 'macos', label: 'Apple' },
  { value: 'cpu', label: 'CPU' },
];
const testDeviceList = [
  {
    deviceName: 'GeForce RTX 3080',
    type: 'nvidia',
    price: '2338/hr',
  },
  {
    deviceName: 'GeForce RTX 3090',
    type: 'nvidia',
    price: '1002/hr',
  },
  {
    deviceName: 'M2 MAX',
    type: 'macos',
    price: '784/hr',
  },
  {
    deviceName: 'GeForce RTX 3070',
    type: 'nvidia',
    price: '448/hr',
  },
  {
    deviceName: 'GeForce RTX 4090',
    type: 'nvidia',
    price: '128/hr',
  },
];

const deviceColumns = [
  {
    title: 'Device',
    dataIndex: 'deviceName',
  },
  {
    title: 'Live nodes',
    dataIndex: 'liveNodes',
  },
];

const Nodes = (props) => {
  const [statisticData, setStatisticData] = useState({
    liveNodes: 44667,
    computeHours: 112893,
    total: 57122,
  });
  const [filterActive, setFilterActive] = useState('all');
  const [devices, setDevices] = useState([]);
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deviceList, setDeviceList] = useState(testDeviceList);
  const [query, setQuery] = useState({ page: 1, size: 15 });
  const [noMore, setNoMore] = useState(false);

  const scale = useScale();

  useEffect(() => {
    getDevices();
    getDeviceList();
  }, []);

  const onFilterChange = (filter) => {
    setFilterActive(filter);
  };

  const loadMore = async () => {
    await getDeviceList({ page: query.page + 1 });
  };

  const getDevices = async () => {
    const devices = await fetchUserCreditsInfo();
    setDevices([
      {
        deviceName: 'GeForce RTX 3080',
        type: 'nvidia',
        liveNodes: 2338,
      },
      {
        deviceName: 'GeForce RTX 3090',
        type: 'nvidia',
        liveNodes: 1002,
      },
      {
        deviceName: 'M2 MAX',
        type: 'macos',
        liveNodes: 784,
      },
      {
        deviceName: 'GeForce RTX 3070',
        type: 'nvidia',
        liveNodes: 448,
      },
      {
        deviceName: 'GeForce RTX 4090',
        type: 'nvidia',
        liveNodes: 128,
      },
      {
        deviceName: 'other',
        type: 'other',
        liveNodes: 38,
      },
    ]);
  };

  const getDeviceList = async (values = {}) => {
    const params = { ...query, ...values };
    setLoading(true);
    const devices = await fetchUserCreditsInfo(params);
    console.log('『devices』', devices);
    // if (!devices || !devices.total || devices?.total < params.size) {
    //   setNoMore(true);
    // } else {
    //   setQuery(params);
    // }
    // if (params.page !== 1) {
    //   setDeviceList(devices.list);
    // } else {
    //   setDeviceList([...deviceList, ...(devices.list || [])]);
    // }
    setDeviceList([...deviceList, ...testDeviceList]);
    setLoading(false);
  };

  return (
    <div className={styles['node-wrapper']}>
      <div className={[styles['wrapper'], styles['node-running']].join(' ')}>
        <h1>Node Runing</h1>
        <div className={styles['content']}>
          <Statistic
            title="Live Nodes"
            value={numeral(statisticData?.liveNodes || 0).format('0,0')}
          />
          <Statistic
            title="Total Compute Hours"
            value={numeral(statisticData?.computeHours || 0).format('0,0')}
          />
          <Statistic
            title="Total Nodes"
            value={numeral(statisticData?.total || 0).format('0,0')}
          />
        </div>
      </div>
      <div className={[styles['wrapper'], styles['node-overview']].join(' ')}>
        <h1>Node Overview</h1>
        <div
          className={styles['content']}
          style={renderBackgroudImg(node_overview_bg)}
        >
          <div className={styles['echart-wrapper']}>
            <DevicePie scale={scale} />
          </div>
          <div
            className={styles['device-wrapper']}
            style={renderBackgroudImg(device_bg)}
          >
            <div className={styles['header']}>
              {deviceColumns.map((item) => (
                <div className={styles['th']} key={item.dataIndex}>
                  {item.title}
                </div>
              ))}
            </div>
            <div className={styles['body']}>
              {devices.map((item, index) => (
                <div
                  className={styles['td']}
                  key={item.deviceName}
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
                  <div className={styles['name']}>{item.deviceName}</div>
                  <div className={styles['value']}>{item.liveNodes}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={[styles['wrapper'], styles['node-points']].join(' ')}>
        <h1>Nodes Points</h1>
        <div className={styles['filters']}>
          {filters.map((item) => (
            <div
              key={item.value}
              onClick={() => onFilterChange(item.value)}
              className={filterActive == item.value && styles['active']}
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
            dataSource={deviceList}
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
