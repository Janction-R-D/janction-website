import JanctionTable from '@/components/JanctionTable';
import { Input } from 'antd';
import { Tag, Button, Space, Col, Row, Card } from 'antd';
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import styles from './index.less';
import data1 from './Instance.json';
import HeaderCard from './InstanceComponents/HeaderCard';
import { useState } from 'react';
import OperationModal from './InstanceComponents/OperationModal';

function InstanceTable({ data }) {
  const [showOverView, setShowOverView] = useState(true);
  console.log(data);
  const columns = [
    {
      title: <div className="name">Instance ID / Name</div>,
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 75,
    },
    {
      title: <div className="name">Cores</div>,
      dataIndex: 'Cores',
      key: 'Cores',
      ellipsis: true,
      width: 55,
    },
    {
      title: <div className="memory">Memory</div>,
      dataIndex: 'memory',
      key: 'memory',
      ellipsis: true,
      width: 60,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 75,
      render: (text) => (
        <>
          {text === 'Running' ? (
            <div className="status status-running">
              <i className="iconfont  icon-check"></i> Running
            </div>
          ) : text === 'Stopped' ? (
            <div className="status status-stopped">
              <i className="iconfont  icon-play_pause"></i> Stopped
            </div>
          ) : text === 'Expired' ? (
            <div className="status status-expired">
              <i className="iconfont  icon-icforbidden"></i> Expired
            </div>
          ) : text === 'Expiring Soon' ? (
            <div className="status status-expiring-soon">
              <i className="iconfont  icon-questioncircle"></i> Expiring Soon
            </div>
          ) : (
            <div>other</div>
          )}
        </>
      ),
    },
    {
      title: 'Public IP',
      dataIndex: 'PublicIp',
      key: 'PublicIp',
      ellipsis: true,
      width: 50,
    },
    {
      title: 'GPU Rate',
      dataIndex: 'GPUrate',
      key: 'GPUrate',
      width: 50,
    },

    {
      title: 'Memory Usage Rates',
      dataIndex: 'MemoryUsage',
      key: 'MemoryUsage',
      width: 50,
    },
    {
      title: 'Release time / Downtime',
      key: 'downtime',
      dataIndex: 'downtime',
      width: 100,
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre' }}>{record.downtime}</div>
      ),
    },

    {
      title: <div className="operation">Operation</div>,
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space
          size="middle"
          style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          <a>Stop</a>
          <a>Start</a>

          <OperationModal record={record} styles={styles} />
        </Space>
      ),
    },
  ];
  const mappedOrders = data.map((order) => ({
    key: order.id,
    name: order.name,
    Cores: order.architechture,
    memory: order.attr.memory,
    status: order.status,
    PublicIp: '192.168.0.1',
    GPUrate: '0.254%',
    MemoryUsage: '25%',
    downtime: '2024-09-15 10:00:00\r\n2024-09-16 18:00:00',
  }));
  const handleModal = () => {
    setShowOverView(!showOverView);
  };
  const classname = showOverView
    ? 'iconfont icon-eye-close'
    : 'iconfont icon-eye';
  return (
    <>
      <JanctionTable
        className={styles['table']}
        columns={columns}
        dataSource={data1}
        pagination={{
          pageSize: 5,
          position: ['bottomCenter'],
        }}
      />
    </>
  );
}

export default InstanceTable;
