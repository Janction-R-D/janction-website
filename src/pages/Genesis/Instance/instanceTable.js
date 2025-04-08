import JanctionTable from '@/components/JanctionTable';
import { message, Space } from 'antd';
import { useState } from 'react';
import { fetchNodeOperation } from '@/services/genesis/instance';
// import { convertMBtoGB } from '../Dashboard/Lessors';
import styles from './index.less';
import OperationModal from './InstanceComponents/OperationModal';
import { convertMBtoGB } from '../Dashboard/Lessor';
import { history } from 'umi';
import { formatISODate } from '@/utils/datetime';
function InstanceTable({ data, getAllNodes }) {
  const [showOverView, setShowOverView] = useState(true);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOperation = (operation, resource, id) => {
    const payload = JSON.stringify({
      resource_id: resource,
      operation,
      id,
    });
    fetchNodeOperation(payload)
      .then((res) => {
        if (res.code) {
          message.error(res.message);
          return;
        }
        getAllNodes();
        setSuccess(true);
      })
      .catch((err) => {
        setError(true);
        console.log('💥 Error capturado:', err);
      })
      .finally(() => {
        setTimeout(() => {
          setError(false);
          setSuccess(false);
        }, 5000);

        // window.location.reload();
      });
  };
  const columns = [
    {
      title: <div className="name">Instance ID / Name</div>,
      dataIndex: 'key',
      key: 'name',
      ellipsis: true,
    },
    {
      title: <div className="name">Cores</div>,
      dataIndex: 'Cores',
      key: 'Cores',
      ellipsis: true,
      render: (text) => <>{text !== '--' ? <p>{text} Cores</p> : '--'}</>,
    },
    {
      title: <div className="memory">Memory</div>,
      dataIndex: 'memory',
      key: 'memory',
      ellipsis: true,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
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
    },
    // {
    //   title: 'GPU Rate',
    //   dataIndex: 'GPUrate',
    //   key: 'GPUrate',
    //   ellipsis: 'true',
    // },

    {
      title: 'Memory Usage Rates',
      dataIndex: 'MemoryUsage',
      key: 'MemoryUsage',
      ellipsis: 'true',
    },
    {
      title: 'Release time / Downtime',
      key: 'downtime',
      dataIndex: 'downtime',
      ellipsis: 'true',
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre' }}>{record.downtime}</div>
      ),
    },

    {
      title: <div className="operation">Operation</div>,
      key: 'action',
      width: 'auto',
      fixed: 'right',
      render: (error, record) => {
        return (
          <Space
            size="middle"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <a
              className={`${'operation-action'}  ${
                record.status?.toLowerCase() === 'stopped' ||
                record.status?.toLowerCase() === 'expired'
                  ? 'recent-status'
                  : ''
              }`}
              onClick={() =>
                handleOperation('stop', record?.id, record?.node?.id)
              }
            >
              <p>Stop</p>
            </a>
            <a
              className={`${'operation-action'}  ${
                record.status?.toLowerCase() === 'running' ||
                record.status?.toLowerCase() === 'expired'
                  ? 'recent-status'
                  : ''
              }`}
              onClick={() =>
                handleOperation('start', record?.id, record?.node?.id)
              }
            >
              <p>Start</p>
            </a>

            <OperationModal
              record={record}
              styles={styles}
              getAllNodes={getAllNodes}
            />
          </Space>
        );
      },
    },
  ];
  const mappedOrders = data?.map((order) => ({
    ...order,
    key: order?.id,
    Cores: order?.node?.attr.cpu || '--',
    memory: order?.node?.attr.memory || '--',
    status: order?.status_str,
    Location: order?.node?.attr.location || '--',
    GPUrate: '0.254%',
    MemoryUsage: convertMBtoGB(order?.activity?.memory_usage?.toFixed(2)),
    downtime: `${formatISODate(order.created_at)}\r\n${formatISODate(
      order.expired_at,
    )}`,
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
        emptyDescription={
          <p>
            No instance is currently available. Please{' '}
            <a onClick={() => history.push('/genesis/purchase')}>
              create an instance
            </a>
            .
          </p>
        }
        pagination={{
          pageSize: 5,
          position: ['bottomCenter'],
        }}
        scroll={{ x: 'auto' }}
      />
    </>
  );
}

export default InstanceTable;
