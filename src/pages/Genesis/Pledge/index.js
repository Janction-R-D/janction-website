import JanctionTable from '@/components/JanctionTable';
import SearchInput from '@/components/SeachInput';
import { fetchNodeList } from '@/services/genesis/instance';
import { Card, Input, Pagination, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Redirect, useModel } from 'umi';
import styles from './index.less';
import HeaderCard from './InstanceComponents/HeaderCard';
import JanctionTip from '@/components/JanctionTip';
import Operation from './InstanceComponents/Operation';

function Staking() {
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};

  const [summary, setSummary] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [current, setCurrent] = useState(1);
  const pageSize = 8;

  const paginatedData = filteredData.slice(
    (current - 1) * pageSize,
    current * pageSize,
  );

  useEffect(() => {
    fetchNodeList()
      .then((res) => {
        setSummary(res?.summary ?? null);
        setFilteredData(res?.resource ?? []);
      })
      .catch((err) => console.error('Error fetching node list:', err));
  }, []);

  const columns = [
    {
      title: 'Device ID',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'Cores',
      key: 'Cores',
      ellipsis: true,
      render: (text) => <p>{text} Cores</p>,
    },
    {
      title: 'CHP / GPUS',
      dataIndex: 'memory',
      key: 'memory',
      ellipsis: true,
    },
    {
      title: 'Stake in cooling',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Withdrawable',
      dataIndex: 'Location',
      key: 'Location',
      ellipsis: true,
    },
    {
      title: (
        <div className="df ai_c gap10">
          <span>Will undercarriage</span>
          <JanctionTip
            placement="topRight"
            title="Instances with less than 7 days until expiration will be displayed here"
          />
        </div>
      ),
      dataIndex: 'GPUrate',
      key: 'GPUrate',
    },
    {
      title: 'Memory Usage Rates',
      dataIndex: 'MemoryUsage',
      key: 'MemoryUsage',
    },
    {
      title: 'Release time / Downtime',
      dataIndex: 'downtime',
      key: 'downtime',
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre' }}>{record.downtime}</div>
      ),
    },
    {
      title: 'Operation',
      key: 'action',
      render: (_, record) => <Operation record={record} />,
    },
  ];

  if (isLessee) return <Redirect to="/genesis/dashboard" />;

  return (
    <main className={styles['stake-wrapper']}>
      <div className={styles['title']}>
        <h1>Stake</h1>
      </div>

      <HeaderCard summary={summary} />

      <Card className={styles['card-table']}>
        <div className={styles['card-header']}>
          <div>
            <span>Manage Stake</span>
            <JanctionTip
              placement="topLeft"
              title='The pledge status is divided into three states: "paid, not paid, and refunded", and the pledge information after refund can be viewed in the "Bill".'
            />
          </div>
          <Input
            suffix={
              <i
                className="iconfont icon-search"
                style={{ fontSize: '0.8rem' }}
              />
            }
            placeholder="Search"
            className={styles['search-input']}
          />
        </div>

        <Table
          className={styles['table']}
          columns={columns}
          dataSource={paginatedData}
          scroll={{ x: 'auto' }}
          pagination={false}
          rowKey="id" // importante para performance
        />

        <div className={styles['pagination-wrapper']}>
          <Pagination
            current={current}
            total={filteredData.length}
            pageSize={pageSize}
            onChange={setCurrent}
            showSizeChanger={false}
          />
        </div>
      </Card>
    </main>
  );
}

Staking.wrappers = ['@/wrappers/auth'];
export default Staking;
