import React, { useMemo, useState } from 'react';
import { Modal, Table } from 'antd';
import styles from './index.less';
import { convertMBtoGB, empty, isExpired } from '@/utils/lang';
import { formatISODate } from '@/utils/datetime';
import { useIntl } from 'umi';

const HistoryInstances = (props) => {
  const intl = useIntl();
  const { open, onOk, onCancel, data } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const allowedStatuses = ['stopped'];
  const mappedOrders = useMemo(() => {
    return data?.map((order) => ({
      ...order,
      key: order?.id,
      Cores: order?.node?.attr.cpu || '--',
      memory: order?.node?.attr.memory,
      status: order?.status_str,
      Location: order?.node?.attr.location || '--',
      isExpired: isExpired(order.expired_at),
      MemoryUsage: convertMBtoGB(order?.activity?.memory_usage?.toFixed(2)),
      downtime: `${formatISODate(order.created_at)}\r\n${formatISODate(
        order.expired_at,
      )}`,
      isTerminated: order?.is_terminated,
      isTerminated: order?.refund,
      isAllowed: order?.is_terminated || order?.refund,
    }));
  }, [data]);
  const filteredInstance = mappedOrders?.filter(
    (item) =>
      allowedStatuses.includes(item.status.toLowerCase()) &&
      item.isExpired &&
      item.isAllowed,
  );

  const handleCancel = () => {
    onCancel();
    setCurrentPage(1);
  };

  const columns = [
    {
      title: (
        <div className="name">
          {' '}
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
      title: (
        <div className="name">
          {intl.formatMessage({ id: 'instanceTable.cores' })}
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
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
              <div className={styles['status-starting']}>
                <span className={styles['icon-loading']}>
                  <i className="iconfont icon-refresh" />
                </span>{' '}
                {intl.formatMessage({ id: 'instanceTable.status.starting' })}
              </div>
            )}
          </>
        );
      },
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
      ellipsis: 'true',
    },
    {
      title: intl.formatMessage({ id: 'instanceTable.downtime' }),
      key: 'downtime',
      dataIndex: 'downtime',
      ellipsis: 'true',
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre' }}>{record.downtime}</div>
      ),
    },
  ];
  return (
    <>
      <Modal
        title={`${intl.formatMessage({ id: 'instance.title.history' })}`}
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
