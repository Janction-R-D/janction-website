import Icons from '@/components/Icons';
import styles from './index.less';
import { useState } from 'react';
import { Statistic, Table } from 'antd';
import SearchInput from '@/components/SeachInput';
import Bar from './Bar';

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
    name: 'Paused',
    value: 2,
  },
  {
    name: 'Offline',
    value: 3,
  },
  {
    name: 'Terminated',
    value: 4,
  },
  {
    name: 'Unsupported',
    value: 5,
  },
  {
    name: 'Blocked',
    value: 6,
  },
  {
    name: 'Pending',
    value: 7,
  },
];
const Point = (props) => {
  const [active, setActive] = useState(0);

  const columns = [
    {
      title: 'Status',
      dataIndex: 'name',
    },
    {
      title: 'DEVICE ID',
      dataIndex: 'age',
    },
    {
      title: 'AI TASK',
      dataIndex: 'address',
      render: (value) => <div className={styles['task']}>Test 1</div>,
    },
    {
      title: 'UP FOR',
      dataIndex: 'address',
    },
    {
      title: 'CHIP/GPUS',
      dataIndex: 'tags',
      render: (value) => (
        <div className={styles['chip-gpus']}>
          <Icons name="nvidia" />
          <span className={styles['name']}>GeForce RTX 3060 Ti</span>
          <div className={styles['num']}>×4</div>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const onStatusClick = (Status) => {
    setActive(Status);
  };

  return (
    <div className={styles['explore-point-container']}>
      <div className={styles['slogan']}>
        <h1>JANCTION</h1>
        <h2>AYER 2 F0R DECENTRALIZED AI</h2>
      </div>
      <section className={styles['node-runing']}>
        <div className="df ai_c jc_sb gap10 wp100">
          <Statistic title="Total Points" value={112893} suffix="Point" />
          <Statistic title="Today Points" value={112893} suffix="Point" />
          <Statistic title="Top 1 User" value={112893} suffix="Point" />
        </div>
      </section>
      <section className={styles['total-network-earning']}>
        <h1>
          <Statistic
            title="TOTAL NETWORK EARNINGS"
            value={1060463}
            prefix="$"
          />
        </h1>
        <div className={styles['echarts-container']}>
          <Bar />
        </div>
      </section>
      <section className={styles['completed-list']}>
        <div className={styles['filter']}>
          <SearchInput />
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
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            position: ['bottomCenter'],
          }}
        ></Table>
      </section>
    </div>
  );
};

export default Point;
