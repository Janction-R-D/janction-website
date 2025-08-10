import JanctionTable from '@/components/JanctionTable';
import { Table } from 'antd';
import styles from './index.less';
import { history, useIntl } from 'umi';
import { formatISODate } from '@/utils/datetime';
import { convertMBtoGB, empty } from '@/utils/lang';

function InstanceTable({ data }) {
  const intl = useIntl();

  const columns = [
    {
      title: (
        <div className="name">
          {intl.formatMessage({ id: 'instanceTable.instanceId' })}
        </div>
      ),
      dataIndex: 'key',
      key: 'name',
      ellipsis: true,
    },
    {
      title: (
        <div className="name">
          {intl.formatMessage({ id: 'instanceTable.name' })}
        </div>
      ),
      dataIndex: 'node_id',
      key: 'node_id',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'instanceTable.status' }),
      key: 'status',
      dataIndex: 'status',
      render: (text) => {
        const lower = text?.toLowerCase();
        return (
          <>
            {lower === 'running' ? (
              <div className="status status-running">
                <i className="iconfont icon-check" />{' '}
                {intl.formatMessage({ id: 'instanceTable.status.running' })}
              </div>
            ) : lower === 'stopped' ? (
              <div className="status status-stopped">
                <i className="iconfont icon-play_pause" />{' '}
                {intl.formatMessage({ id: 'instanceTable.status.stopped' })}
              </div>
            ) : lower === 'expired' ? (
              <div className="status status-expired">
                <i className="iconfont icon-icforbidden" />{' '}
                {intl.formatMessage({ id: 'instanceTable.status.expired' })}
              </div>
            ) : lower === 'expiring soon' ? (
              <div className="status status-expiring-soon">
                <i className="iconfont icon-questioncircle" />{' '}
                {intl.formatMessage({
                  id: 'instanceTable.status.expiringSoon',
                })}
              </div>
            ) : (
              <div className="status status-starting">
                <i className="iconfont icon-refresh" />{' '}
                {intl.formatMessage({ id: 'instanceTable.status.starting' })}
              </div>
            )}
          </>
        );
      },
    },
    {
      title: (
        <div className="name">
          {intl.formatMessage({ id: 'instanceTable.message' })}
        </div>
      ),
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: (
        <div className="name">
          {intl.formatMessage({ id: 'instanceTable.cores' })}
        </div>
      ),
      dataIndex: 'node',
      key: 'Cores',
      ellipsis: true,
      render: (node) => {
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
      title: (
        <div className="memory">
          {intl.formatMessage({ id: 'instanceTable.memory' })}
        </div>
      ),
      dataIndex: 'memory',
      key: 'memory',
      ellipsis: true,
      render: (memory, rowData) => (
        <>{!empty(rowData.memory) ? convertMBtoGB(rowData.memory) : '--'}</>
      ),
    },
    {
      title: intl.formatMessage({ id: 'instanceTable.location' }),
      dataIndex: 'Location',
      key: 'Location',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'instanceTable.memoryUsage' }),
      dataIndex: 'MemoryUsage',
      key: 'MemoryUsage',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'instanceTable.downtime' }),
      key: 'downtime',
      dataIndex: 'downtime',
      ellipsis: true,
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre' }}>{record.downtime}</div>
      ),
    },
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
    message: order?.message || '~',
  }));

  return (
    <Table
      className={styles['table-instance']}
      columns={columns}
      dataSource={mappedOrders}
      emptyDescription={
        <p>
          {intl.formatMessage({ id: 'instanceTable.empty' })}
          <a onClick={() => history.push('/genesis/purchase')}>
            {intl.formatMessage({ id: 'instanceTable.createInstance' })}
          </a>
          。
        </p>
      }
      scroll={{ x: 'auto' }}
      pagination={false}
    />
  );
}

export default InstanceTable;
