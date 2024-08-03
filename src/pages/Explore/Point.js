import styles from './index.less';
import { useEffect, useState } from 'react';
import { Statistic, Table, Pagination, ConfigProvider } from 'antd';
import Line from './components/Line';
import {
  fetchNetworkEarnings,
  fetchTotalNetworkEarnings,
  fetchTotalPoints,
  fetchUserCreditsInfo,
} from '../../services/explore/point';
import JactionEmpty from '../../components/JactionEmpty';
import { fetchNodesList, fetchSystemInfo } from '../../services/explore/nodes';
import numeral from 'numeral';
import SearchInput from '@/components/SeachInput';
import { MONTH } from '../../constant';
import { renderBackgroudImg } from '@/utils/lang';
import ripple from '@/assets/images/explore/ripple.png';
import wave_line from '@/assets/images/explore/wave_line.png';
import statistic_bg from '@/assets/images/explore/statistic_bg.png';
import complete_list_bg from '@/assets/images/explore/complete_list_bg.png';
import nodes_android_bg from '@/assets/images/explore/nodes_android_bg.png';
import complete_list_android_bg from '@/assets/images/explore/complete_list_android_bg.png';
import useIsPC from '../../hooks/usePC';

const statusList = [
  {
    name: 'Show all',
    id: 'nav-0',
    value: 0,
  },
  {
    name: 'Runing',
    id: 'nav-1',
    value: 1,
  },
  {
    name: 'Completed',
    id: 'nav-2',
    value: 2,
  },
  {
    name: 'Failed',
    id: 'nav-3',
    value: 3,
  },
  {
    name: 'Destroyed',
    id: 'nav-4',
    value: 4,
  },
];

function extendArray(arr, len) {
  if (arr.length === 0 || arr.length >= len) return arr.slice(0, len);

  let result = arr.slice();
  while (result.length < len) {
    result.push(...arr.slice(0, len - result.length));
  }
  return result;
}

const Point = (props) => {
  const [userCreditsList, setUserCreditsList] = useState();
  const [totalPoints, setTotalPoints] = useState();
  const [totalNetworkEarnings, setTotalNetworkEarnings] = useState();
  const [networkEarnings, setNetworkEarnings] = useState([]);
  const [nodesList, setNodesList] = useState([]);
  const [query, setQuery] = useState({ size: 10, current: 1 });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState();
  const isPC = useIsPC();

  useEffect(() => {
    getUserCreditsInfo();
    getTotalPoints();
    getTotalNetworkEarnings();
    getNetworkEarnings();
    getNodesList();
  }, []);

  const onStatusClick = (status) => {
    getNodesList({ status });
  };

  const getUserCreditsInfo = async () => {
    const userCreditsList = await fetchUserCreditsInfo();
    const arr = extendArray(userCreditsList, 5);
    setUserCreditsList(arr);
  };

  const getTotalPoints = async () => {
    const totalPoints = await fetchTotalPoints();
    setTotalPoints(totalPoints);
  };

  const getTotalNetworkEarnings = async () => {
    const totalNetworkEarnings = await fetchTotalNetworkEarnings();
    setTotalNetworkEarnings(totalNetworkEarnings);
  };

  const getNetworkEarnings = async () => {
    const networkEarningsList = await fetchNetworkEarnings();
    const networkEarnings = MONTH.map((item) => {
      const res = networkEarningsList.find(
        (earnItem) => earnItem.month == item.value,
      );
      return res?.earning || 0;
    });
    setNetworkEarnings(networkEarnings);
  };

  const getNodesList = async (params = {}) => {
    setLoading(true);
    const _params = { ...query, ...params };
    const { list, total } = await fetchNodesList(_params);
    setNodesList(list);
    setQuery(_params);
    setTotal(total);
    setLoading(false);
  };

  const renderUserCreditsInfo = () => {
    return (
      <ul className={styles['user-credits-info']}>
        {(userCreditsList || []).map((item, index) => (
          <li key={`${item.userId}${index}`} style={{ '--d': index - 2 }}>
            <i></i>
            <span>{`${item.userName}获得${item.creditsNum}积分`}</span>
          </li>
        ))}
      </ul>
    );
  };

  const columns = [
    {
      title: 'Status',
      dataIndex: 'name',
    },
    {
      title: 'CLUSTER ID',
      dataIndex: 'age',
    },
    {
      title: 'COMPUTE HRS REMAINING',
      dataIndex: 'address',
    },
    {
      title: 'CHIP/GPUS',
      dataIndex: 'chipOrGpu',
    },
  ];

  return (
    <div className={styles['explore-point-container']}>
      <div
        className={styles['point-slogan']}
        style={renderBackgroudImg(ripple)}
      >
        <h1>
          LAYER 2 FOR <br />
          DECENTRALIZED AI
        </h1>
        {renderUserCreditsInfo()}
      </div>
      <div
        className={styles['node-statistic']}
        style={renderBackgroudImg(wave_line)}
      >
        <div
          className={styles['statistic']}
          style={renderBackgroudImg(statistic_bg)}
        >
          <h1>{totalPoints ? numeral(totalPoints).format('0,0 +') : '~'}</h1>
          <p>Points</p>
        </div>
        <div className={styles['label']}>Total Points</div>
      </div>
      <div className={styles['total-network-earning']}>
        <div className={styles['header']}>
          <i></i>
          <div className={styles['info']}>
            <h1>TOTAL NETWORK EARNINGS</h1>
            <p>
              {totalNetworkEarnings
                ? numeral(totalNetworkEarnings).format('0,0.00')
                : '~'}
            </p>
          </div>
        </div>
        <div className={styles['chart-container']}>
          <Line data={networkEarnings} />
        </div>
      </div>
      <section
        className={styles['completed-list']}
        style={renderBackgroudImg(
          isPC ? complete_list_bg : complete_list_android_bg,
        )}
      >
        <div className={styles['filter']}>
          <SearchInput className={styles['filter-search']} />
          <div className={styles['status']}>
            {statusList.map((item) => (
              <input type="radio" key={item.id} name="nav" id={item.id} />
            ))}
            <nav>
              <ul>
                {statusList.map((item) => (
                  <li
                    key={item.value}
                    onClick={() => onStatusClick(item.value)}
                  >
                    <label for={item.id}>{item.name}</label>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles['table-list']}>
          <ConfigProvider renderEmpty={() => <JactionEmpty />}>
            <Table
              loading={loading}
              columns={columns}
              dataSource={nodesList}
              pagination={{
                current: query?.current,
                size: query?.size,
                total,
                showLessItems: true,
                showSizeChanger: false,
                position: ['bottomRight'],
                onChange: (page) => {
                  getNodesList({ current: page });
                },
              }}
            ></Table>
          </ConfigProvider>
          <ul className={styles['android-list']}>
            {(nodesList || []).map((item) => (
              <li key={item.key}>
                <div>
                  <span className={styles['label']}>STATUS：</span>
                  <span className={styles['value']}>{item.name}</span>
                </div>
                <div>
                  <span className={styles['label']}>
                    COMPUTE HRS REMAINING：
                  </span>
                  <span className={styles['value']}>{item.address}</span>
                </div>
                <div>
                  <span className={styles['label']}>CHIP/GPUS：</span>
                  <span className={styles['value']}>{item.chipOrGpu}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Point;
