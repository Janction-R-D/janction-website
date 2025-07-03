import { Space, Table } from 'antd';
import { useEffect, useState, useMemo } from 'react';
import { fetchNodeOperation } from '@/services/genesis/instance';
import styles from './index.less';
import OperationModal from './InstanceComponents/OperationModal';
import { convertMBtoGB } from '../Dashboard3/Lessor';
import { history } from 'umi';
import { formatISODate } from '@/utils/datetime';
import { empty } from '@/utils/lang';
import TooltipBox from '../components/Tooltip';

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
      title: <div className="name">Instance ID</div>,
      dataIndex: 'key',
      key: 'name',
      ellipsis: true,
      render: (text, record) => {
        const textRender = <p style={{ fontSize: '12px' }}>{text}</p>;
        return (
          <TooltipBox TooltipText={textRender} placement="topLeft">
            <span className={styles['ellip-text']}>{text}</span>
          </TooltipBox>
        );
      },
    },
    {
      title: <div className="name">Node ID</div>,
      dataIndex: 'node_id',
      key: 'node_id',
      ellipsis: true,
      render: (text, record) => {
        const textRender = <p style={{ fontSize: '12px' }}>{text}</p>;
        return (
          <TooltipBox TooltipText={textRender}>
            <span className={styles['ellip-text']}>{text}</span>
          </TooltipBox>
        );
      },
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

        const cpuText = !!cpu?.length ? `${cpu[0]} * ${cpu.length}` : '--';
        const gpuText = !!gpu?.length ? `${gpu[0]} * ${gpu.length}` : '--';
        const text = (
          <>
            <p style={{ fontSize: '12px' }}>{cpuText}</p>
            <p style={{ fontSize: '12px' }}>{gpuText}</p>
          </>
        );
        return (
          <TooltipBox TooltipText={text}>
            <p className="ellipsis">{cpuText}</p>
            <p className="ellipsis">{gpuText}</p>
          </TooltipBox>
        );
      },
    },
    {
      title: <div className="memory">Memory</div>,
      dataIndex: 'memory',
      key: 'memory',
      width: 190,
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
            {/* <a
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
            </a> */}

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
  const mappedOrders = useMemo(() => {
    return data?.map((order) => ({
      ...order,
      key: order?.id,
      Cores: order?.node?.attr.cpu || '--',
      memory: order?.node?.attr.memory,
      status: order?.status_str,
      status_2: order?.operating_status_str,
      Location: order?.node?.attr.location || '--',
      MemoryUsage: convertMBtoGB(order?.activity?.memory_usage?.toFixed(2)),
      downtime: `${formatISODate(order.created_at)}\r\n${formatISODate(
        order.expired_at,
      )}`,
    }));
  }, [data]);
  const filteredInstance = mappedOrders?.filter(
    (item) => item.status === 'running' || item.status === 'pending',
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const hasStarting = mappedOrders?.some(
        (order) => order.status?.toLowerCase() === 'pending',
      );
      console.log(hasStarting);
      if (hasStarting) {
        console.log('[Interval] Some instance is still pending...');
        getAllNodes(); // if theres a starting machine
      } else {
        console.log('[Interval] No instance is starting. Clearing interval.');
        clearInterval(interval);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [mappedOrders]);

  const handleModal = () => {
    setShowOverView(!showOverView);
  };
  const classname = showOverView
    ? 'iconfont icon-eye-close'
    : 'iconfont icon-eye';
  return (
    <>
      <Table
        className={styles['table-instance']}
        columns={columns}
        dataSource={filteredInstance}
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
