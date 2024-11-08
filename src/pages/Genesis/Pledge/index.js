import JanctionTable from '@/components/JanctionTable';
import SearchInput from '@/components/SeachInput';
import { fetchNodeList } from '@/services/genesis/instance';
import { Card, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Redirect, useModel } from 'umi';
import styles from './index.less';
import HeaderCard from './InstanceComponents/HeaderCard';
import JantionTip from '@/components/JanctionTip';

function Pledge() {
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const [summary, setSummary] = useState();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchNodeList()
      .then((data) => {
        setSummary(data?.summary || null);
        setFilteredData(data?.resource || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: 'Device ID',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Statu',
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
      key: 'status',
      dataIndex: 'status',
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
          <JantionTip title="Instances with less than 7 days until expiration will be displayed here" />
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
      key: 'downtime',
      dataIndex: 'downtime',
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre' }}>{record.downtime}</div>
      ),
    },

    {
      title: 'Operation',
      key: 'action',
      render: (text, record) => {
        return (
          <Space
            size="middle"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <a onClick={() => {}}>
              <p>Stake</p>
            </a>
            <a onClick={() => {}}>
              <p>Refund</p>
            </a>
          </Space>
        );
      },
    },
  ];

  if (isLessee) return <Redirect to="/genesis/dashboard"></Redirect>;

  return (
    <>
      <div className={styles['title']}>
        <h1>Stake</h1>
      </div>
      <HeaderCard summary={summary} />
      <Card className={styles['card-table']}>
        <div className={styles['card-header']}>
          <span>Manage Stake</span>
          <i className="iconfont icon-info"></i>
        </div>
        <SearchInput />
        <JanctionTable
          className={styles['table']}
          columns={columns}
          dataSource={filteredData}
          showEmptyIcon={false}
          emptyDescription="No instance is currently available. Please create an instance."
          pagination={{
            pageSize: 5,
            position: ['bottomCenter'],
          }}
          scroll={{ x: 'auto' }}
        />
      </Card>
    </>
  );
}

Pledge.wrappers = ['@/wrappers/auth'];
export default Pledge;
