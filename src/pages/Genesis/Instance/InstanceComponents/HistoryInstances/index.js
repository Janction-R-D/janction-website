import React, { useMemo, useState } from 'react';
import { Modal, Table } from 'antd';
import styles from './index.less';
import { convertMBtoGB, empty } from '@/utils/lang';
import { formatISODate } from '@/utils/datetime';

const columns = [
  {
    title: <div className="name">Instance ID / Name</div>,
    dataIndex: 'key',
    key: 'name',
    ellipsis: true,
  },
  {
    title: <div className="name">Node ID / Name</div>,
    dataIndex: 'node_id',
    key: 'node_id',
    ellipsis: true,
  },
  {
    title: <div className="name">Cores</div>,
    dataIndex: 'node',
    key: 'Cores',
    ellipsis: true,
    render: (node, record) => {
      if (!node?.attr?.gpu_chip && !node?.attr?.cpu_chip) return '--';
      const cpu = node?.attr?.cpu_chip;
      const gpu = node?.attr?.gpu_chip;
      return (
        <>
          <p>{!!cpu?.length ? `${cpu[0]} * ${cpu.length}` : '--'}</p>
          <p>{!!gpu?.length ? `${gpu[0]} * ${gpu.length}` : '--'}</p>
        </>
      );
    },
  },
  {
    title: <div className="memory">Memory</div>,
    dataIndex: 'memory',
    key: 'memory',
    ellipsis: true,
    render: (memory, rowData) => (
      <>{!empty(rowData.memory) ? convertMBtoGB(rowData.memory) : '--'}</>
    ),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (text) => (
      <>
        {text?.toLowerCase() === 'running' ? (
          <div className="status status-running">
            <i className="iconfont  icon-check"></i> Running
          </div>
        ) : text?.toLowerCase() === 'stopped' ? (
          <div className="status status-stopped">
            <i className="iconfont  icon-play_pause"></i> Stopped
          </div>
        ) : text?.toLowerCase() === 'expired' ? (
          <div className="status status-expired">
            <i className="iconfont  icon-icforbidden"></i> Expired
          </div>
        ) : text?.toLowerCase() === 'expiring soon' ? (
          <div className="status status-expiring-soon">
            <i className="iconfont  icon-questioncircle"></i> Expiring Soon
          </div>
        ) : (
          <div className={styles['status-starting']}>
            <span className={styles['icon-loading']}>
              <i className="iconfont icon-refresh "></i>
            </span>{' '}
            Starting
          </div>
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
];

const HistoryInstances = (props) => {
  const { open, onOk, onCancel, data } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const mappedOrders = useMemo(() => {
    return data?.map((order) => ({
      ...order,
      key: order?.id,
      Cores: order?.node?.attr.cpu || '--',
      memory: order?.node?.attr.memory,
      status: order?.status_str,
      Location: order?.node?.attr.location || '--',
      MemoryUsage: convertMBtoGB(order?.activity?.memory_usage?.toFixed(2)),
      downtime: `${formatISODate(order.created_at)}\r\n${formatISODate(
        order.expired_at,
      )}`,
    }));
  }, [data]);
  const filteredInstance = mappedOrders?.filter(
    (item) => item.status !== 'running' && item.status !== 'starting',
  );
  const handleCancel = () => {
    onCancel();
    setCurrentPage(1);
  };
  return (
    <>
      <Modal
        title="Instance History"
        open={open}
        onCancel={handleCancel}
        onOk={onOk}
        footer={null}
        closable
        className={styles.customModal}
        width="80%"
        centered
      >
        <div className={styles.tableWrapper}>
          <Table
            dataSource={filteredInstance}
            columns={columns}
            className={styles['table-instance']}
            emptyDescription={<p>No Data</p>}
            pagination={{
              current: currentPage,
              onChange: (page) => setCurrentPage(page),
              pageSize: 5,
              position: ['bottomCenter'],
            }}
            scroll={{ x: true }}
          />
        </div>
      </Modal>
    </>
  );
};

export default HistoryInstances;
