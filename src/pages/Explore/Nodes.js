import styles from './index.less';
import { useEffect, useRef, useState } from 'react';
import { Statistic, Table, Pagination } from 'antd';
import SearchInput from '@/components/SeachInput';
import Pie from './components/Pie';

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
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    chipOrGpu: 'Geforce Rtx 3060 ti',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    chipOrGpu: 'Geforce Rtx 3060 ti',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    chipOrGpu: 'Geforce Rtx 3060 ti',
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    chipOrGpu: 'Geforce Rtx 3060 ti',
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    chipOrGpu: 'Geforce Rtx 3060 ti',
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    chipOrGpu: 'Geforce Rtx 3060 ti',
  },
  {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    chipOrGpu: 'Geforce Rtx 3060 ti',
  },
  {
    key: '8',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    chipOrGpu: 'Geforce Rtx 3060 ti',
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    chipOrGpu: 'Geforce Rtx 3060 ti',
  },
  {
    key: '10',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    chipOrGpu: 'Geforce Rtx 3060 ti',
  },
];
const Nodes = (props) => {
  const [active, setActive] = useState(0);
  const [list, setList] = useState();
  const [query, setQuery] = useState({ size: 10, current: 1 });
  const [total, setTotal] = useState(0);
  const swiperRef = useRef();

  useEffect(() => {
    getList();
  }, []);

  const getList = async (params = {}) => {
    const _params = { ...query, ...params };
    setList(data);
    setQuery(_params);
    setTotal(100);
  };

  const onStatusClick = (Status) => {
    setActive(Status);
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
      <div className={styles['slogan']}>
        <h1>
          LAYER 2 FOR
          <br />
          DECENTRALIZED AI
        </h1>
      </div>
      <section className={styles['node-runing']}>
        <h1>Node Runing</h1>
        <div className={styles['divider']}></div>
        <div
          ref={swiperRef}
          className={['df jc_sb', styles['statistic-info']].join(' ')}
        >
          <div style={{ '--d': -3 }}>
            <Statistic title="Live Nodes" value={112893} />
          </div>
          <div style={{ '--d': -2 }}>
            <Statistic title="Total Compute Hours" value={112893} />
          </div>
          <div style={{ '--d': -1 }}>
            <Statistic title="Total Nodes" value={112893} />
          </div>
          <div style={{ '--d': 0 }}>
            <Statistic title="Live Nodes" value={112893} />
          </div>
          <div style={{ '--d': 1 }}>
            <Statistic title="Total Compute Hours" value={112893} />
          </div>
          <div className={styles['highlight']}>
            <img src={require('../../assets/images/explore/highlight.png')} />
          </div>
        </div>
      </section>
      <section className={styles['system-infomation']}>
        <h1>System Infomation</h1>
        <div className={styles['echarts-container']}>
          <Pie />
        </div>
      </section>
      <section className={styles['completed-list']}>
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
          <Table
            columns={columns}
            dataSource={list}
            pagination={{
              current: query?.current,
              size: query?.size,
              total,
              showLessItems: true,
              showSizeChanger: false,
              position: ['bottomRight'],
              onChange: (page) => {
                getList({ current: page });
              },
            }}
          ></Table>
          <ul className={styles['android-list']}>
            {(list || []).map((item) => (
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
