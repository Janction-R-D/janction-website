import JanctionTable from '@/components/JanctionTable';
import { Space } from 'antd';
import { useState } from 'react';
import { fetchNodeOperation } from '@/services/genesis/instance';
import { convertMBtoGB } from '../Dashboard/Lessors';
import styles from './index.less';
import OperationModal from './InstanceComponents/OperationModal';

function InstanceTable({ data }) {
  const [showOverView, setShowOverView] = useState(true);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  console.log(data, 'hola');
  const handleOperation = (operation, resource, id) => {
    const payload = JSON.stringify({
      resource_id: resource,
      operation,
      id,
    });

    fetchNodeOperation(payload)
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setError(false);
          setSuccess(false);
        }, 5000);

        window.location.reload();
      });
  };
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
      render: (text) => <p>{text} Cores</p>,
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
      width: 70,
      render: (text) => (
        <>
          {text.toLowerCase() === 'running' ? (
            <div className="status status-running">
              <i className="iconfont  icon-check"></i> Running
            </div>
          ) : text.toLowerCase() === 'stopped' ? (
            <div className="status status-stopped">
              <i className="iconfont  icon-play_pause"></i> Stopped
            </div>
          ) : text.toLowerCase() === 'expired' ? (
            <div className="status status-expired">
              <i className="iconfont  icon-icforbidden"></i> Expired
            </div>
          ) : text.toLowerCase() === 'expiring soon' ? (
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
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
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
      render: (error, record) => {
        console.log(record.status);
        return (
          <Space
            size="middle"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <a
              className={`${styles['operation-action']} , ${
                record.status.toLowerCase() === 'stop' ||
                record.status.toLowerCase() === 'expired'
                  ? styles['recent-status']
                  : ''
              }`}
              onClick={() =>
                handleOperation(
                  'stop',
                  record?.activity?.resource_id,
                  record?.id,
                )
              }
            >
              <p>Stop</p>
            </a>
            <a
              className={`${'operation-action'}  ${
                record.status.toLowerCase() === 'running' ||
                record.status.toLowerCase() === 'expired'
                  ? 'recent-status'
                  : ''
              }`}
              onClick={() =>
                handleOperation(
                  'start',
                  record?.activity?.resource_id,
                  record?.id,
                )
              }
            >
              <p>Start</p>
            </a>

            <OperationModal record={record} styles={styles} />
          </Space>
        );
      },
    },
  ];
  const mappedOrders = data?.map((order) => ({
    key: order?.id,
    name: order?.name,
    Cores: order?.node.attr.cpu,
    memory: order?.node.attr.memory,
    status: order?.activity.status,
    Location: order?.node.attr.location,
    GPUrate: '0.254%',
    MemoryUsage: convertMBtoGB(order?.activity.memory_usage.toFixed(2)),
    downtime: '2024-09-15 10:00:00\r\n2024-09-16 18:00:00',
    activity: order.activity,
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
        dataSource={mappedOrders}
        emptyDescription="目前无实例，请添加实例"
        pagination={{
          pageSize: 5,
          position: ['bottomCenter'],
        }}
      />
    </>
  );
}

export default InstanceTable;
