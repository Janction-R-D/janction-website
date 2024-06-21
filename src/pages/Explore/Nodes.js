import Icons from '@/components/Icons';
import styles from './index.less';
import { useState } from 'react';
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
const Nodes = (props) => {
  const [active, setActive] = useState(0);

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
    <div className={styles['explore-nodes-container']}>
      <div className={styles['slogan']}>
        <h1>JANCTION</h1>
        <h2>AYER 2 F0R DECENTRALIZED AI</h2>
      </div>
      <section className={styles['node-runing']}>
        <h1>Node Runing</h1>
        <div className="df ai_c jc_sb fw_w gap10 wp100">
          <Statistic
            title="Live Nodes"
            value={112893}
            suffix="Node"
            className="hvr-shrink"
          />
          <Statistic
            title="Total Compute Hours"
            value={112893}
            suffix="Hours"
            className="hvr-shrink"
          />
          <Statistic
            title="Total Nodes"
            value={112893}
            suffix="Node"
            className="hvr-shrink"
          />
        </div>
      </section>
      <section className={styles['system-infomation']}>
        <h1>System Infomation</h1>
        <div className={styles['echarts-container']}>
          <section>
            <h1>Opeartor System</h1>
            <div>
              <Pie />
            </div>
          </section>
          <section>
            <h1>GPU Type</h1>
            <div>
              <Pie />
            </div>
          </section>
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
            dataSource={data}
            pagination={{
              position: ['bottomCenter'],
            }}
          ></Table>
          <div className={styles['android-list']}>
            {data.map((item) => (
              <div className={styles['item']}>
                <div className={styles['id']}>{item.id}</div>
                <div className={styles['status']}>
                  <span className={styles['name']}>STATUS:</span>
                  <span className={styles['value']}>2% Completed</span>
                </div>
                <div className={styles['timer']}>
                  <span className={styles['name']}>COMPUTE HRS REMAINING:</span>
                  <span className={styles['value']}>0 Hrs 59 Mins</span>
                </div>
                <div>
                  <span className={styles['name']}>CHIP/GPUS:</span>
                  <div className={styles['chip-gpus']}>
                    <Icons name="nvidia" />
                    <span className={styles['name']}>GeForce RTX 3060 Ti</span>
                    <div className={styles['num']}>×4</div>
                  </div>
                </div>
              </div>
            ))}
            {data.length && (
              <div className={styles['list-pagination']}>
                <Pagination defaultCurrent={1} total={data.length} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

Nodes.wrappers = ['@/wrappers/auth'];
export default Nodes;
