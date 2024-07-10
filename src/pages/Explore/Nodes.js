import styles from './index.less';
import { useEffect, useState } from 'react';
import { Statistic, Table, Pagination } from 'antd';
import SearchInput from '@/components/SeachInput';
import Pie from './components/Pie';

const statusList = [
  {
    name: 'Show all',
    value: 0,
  },
  {
    name: 'Runing',
    value: 1,
  },
  {
    name: 'Completed',
    value: 2,
  },
  {
    name: 'Failed',
    value: 3,
  },
  {
    name: 'Destroyed',
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
        <div className={['df jc_sb', styles['statistic-info']].join(' ')}>
          <Statistic title="Live Nodes" value={112893} />
          <Statistic title="Total Compute Hours" value={112893} />
          <Statistic title="Total Nodes" value={112893} />
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
              <button
                key={item.value}
                className={`${item.value == 0 && styles['all']} ${
                  active == item.value && styles['active']
                }`}
                onClick={() => onStatusClick(item.value)}
              >
                {item.name}
              </button>
            ))}
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
