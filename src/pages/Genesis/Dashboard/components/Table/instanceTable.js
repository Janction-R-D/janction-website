import JanctionTable from '@/components/JanctionTable';
import { Table } from 'antd';

import styles from './index.less';

import { history } from 'umi';
import { formatISODate } from '@/utils/datetime';
import { convertMBtoGB, empty } from '@/utils/lang';
import { RedoOutlined } from '@ant-design/icons';
function InstanceTable({ data, getAllNodes, loading }) {
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
        const cpu = node?.attr.cpu_chip;
        const gpu = node?.attr.gpu_chip;
        return (
          <>
            <p>{cpu ? `${cpu[0]} * ${cpu.length}` : '--'}</p>
            <p>{gpu ? `${gpu[0]} * ${gpu.length}` : '--'}</p>
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
            <div className="status status-starting">
              <i className="iconfont  icon-refresh"></i> Starting
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
    // {
    //   title: 'Operation',
    //   key: 'operation',
    //   dataIndex: 'operation',
    //   ellipsis: 'true',
    //   render: (_, record) => (
    //     <div style={{ whiteSpace: 'pre' }}>
    //       Refresh{' '}
    //       <RedoOutlined
    //         rotate={90}
    //         spin={loading}
    //         loading={loading}
    //         className={styles['icon-orange']}
    //         onClick={getAllNodes}
    //       />
    //     </div>
    //   ),
    // },
  ];
  const mappedOrders = data?.slice(0, 5).map((order) => ({
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

  return (
    <>
      <Table
        className={styles['table-instance']}
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
        pagination={false}
      />
    </>
  );
}

export default InstanceTable;
