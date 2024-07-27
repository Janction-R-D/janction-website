import styles from './index.less';
import { useEffect, useRef, useState } from 'react';
import { Statistic, Table, Pagination, ConfigProvider } from 'antd';
import SearchInput from '@/components/SeachInput';
import Pie from './components/Pie';
import JactionEmpty from '../../components/JactionEmpty';
import {
  fetchNodesList,
  fetchRuningNodes,
  fetchSystemInfo,
} from '../../services/explore/nodes';
import numeral from 'numeral';
import { renderBackgroudImg } from '@/utils/lang';
import divider from '@/assets/images/explore/divider.png';
import nodes_statistic_bg from '@/assets/images/explore/nodes_statistic_bg.png';
import highlight_shadow from '@/assets/images/explore/highlight_shadow.png';
import highlight from '@/assets/images/explore/highlight.png';
import echarts_bg from '@/assets/images/explore/echarts_bg.png';
import complete_list_bg from '@/assets/images/explore/complete_list_bg.png';
import nodes_android_bg from '@/assets/images/explore/nodes_android_bg.png';
import complete_list_android_bg from '@/assets/images/explore/complete_list_android_bg.png';
import useIsPC from '../../hooks/usePC';

const statusList = [
  {
    name: 'Show all',
    id: 'nav-show-all',
    value: 0,
  },
  {
    name: 'Runing',
    id: 'nav-runing',
    value: 1,
  },
  {
    name: 'Completed',
    id: 'nav-completed',
    value: 2,
  },
  {
    name: 'Failed',
    id: 'nav-failed',
    value: 3,
  },
  {
    name: 'Destroyed',
    id: 'nav-destroyed',
    value: 4,
  },
];

const Nodes = (props) => {
  const swiperRef = useRef();
  const [runingNodes, setRuningNodes] = useState();
  const [systemInfo, setSystemInfo] = useState([]);
  const [nodesList, setNodesList] = useState([]);
  const [query, setQuery] = useState({ size: 10, current: 1 });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState();
  const isPC = useIsPC();

  useEffect(() => {
    getRuningNodes();
    getSystemInfo();
    getNodesList();
  }, []);

  const getRuningNodes = async () => {
    const runingNodes = await fetchRuningNodes();
    setRuningNodes(runingNodes);
  };

  const getSystemInfo = async () => {
    const systemInfo = await fetchSystemInfo();
    setSystemInfo(systemInfo);
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

  const onStatusClick = (status) => {
    getNodesList({ status });
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
    <div className={styles['explore-nodes-container']}>
      <div
        className={styles['slogan']}
        style={!isPC ? renderBackgroudImg(nodes_android_bg) : {}}
      >
        <h1>
          LAYER 2 FOR
          <br />
          DECENTRALIZED AI
        </h1>
      </div>
      <section className={styles['node-runing']}>
        <h1>Node Runing</h1>
        <div
          className={styles['divider']}
          style={renderBackgroudImg(divider)}
        ></div>
        <div
          ref={swiperRef}
          className={['df jc_sb', styles['statistic-info']].join(' ')}
          style={renderBackgroudImg(nodes_statistic_bg)}
        >
          <div style={{ '--d': -3 }}>
            <Statistic
              title="Live Nodes"
              value={numeral(runingNodes?.liveNodes || 0).format('0,0')}
            />
          </div>
          <div style={{ '--d': -2 }}>
            <Statistic
              title="Total Compute Hours"
              value={numeral(runingNodes?.totalComputerHours || 0).format(
                '0,0',
              )}
            />
          </div>
          <div style={{ '--d': -1 }}>
            <Statistic
              title="Total Nodes"
              value={numeral(runingNodes?.totalNodes || 0).format('0,0')}
            />
          </div>
          <div style={{ '--d': 0 }}>
            <Statistic
              title="Live Nodes"
              value={numeral(runingNodes?.liveNodes || 0).format('0,0')}
            />
          </div>
          <div style={{ '--d': 1 }}>
            <Statistic
              title="Total Compute Hours"
              value={numeral(runingNodes?.totalComputerHours || 0).format(
                '0,0',
              )}
            />
          </div>
          <div
            className={styles['highlight']}
            style={renderBackgroudImg(highlight_shadow)}
          >
            <img src={highlight} />
          </div>
        </div>
      </section>
      <section className={styles['system-infomation']}>
        <h1>System Infomation</h1>
        <div
          className={styles['echarts-container']}
          style={renderBackgroudImg(echarts_bg)}
        >
          {!!systemInfo?.length ? <Pie data={systemInfo} /> : <JactionEmpty />}
        </div>
      </section>
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

export default Nodes;
