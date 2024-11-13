import JanctionTable from '@/components/JanctionTable';
import { Space } from 'antd';
import { useState } from 'react';
import { fetchNodeOperation } from '@/services/genesis/instance';
import styles from './table.less';

import { history } from 'umi';
import JanctionTip from '@/components/JanctionTip';

function NodesTable({ data }) {
  const [showOverView, setShowOverView] = useState(true);

  const columns = [
    {
      title: <div className="name">Device ID</div>,
      dataIndex: 'deviceId',
      key: 'deviceId',
      ellipsis: true,
    },
    {
      title: <div className="name">API</div>,
      dataIndex: 'api',
      key: 'api',
      ellipsis: true,
    },

    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      width: 100,
      render: (text) => (
        <>
          {text.toLowerCase() === 'running' ? (
            <div className="status status-running ">
              <p>running</p>
              <JanctionTip
                placement="topLeft"
                title='您的节点还未完成挂单，为了避免不必要的浪费，请尽快完成。"'
              />
            </div>
          ) : text.toLowerCase() === 'listed' ? (
            <div className="status ">
              <p>listed</p>
              <JanctionTip
                placement="topLeft"
                title="您的节点已完成挂单，等待客户购买中。"
              />
            </div>
          ) : text.toLowerCase() === 'active' ? (
            <div className="status  status-active">
              <p>active</p>
              <JanctionTip
                placement="left"
                title="您的节点已被他人购买，将持续产生收益。"
              />
            </div>
          ) : (
            <div>other</div>
          )}
        </>
      ),
    },
    {
      title: 'CHIP/GPUS',
      dataIndex: 'chipGpu',
      key: 'chipGpu',
      ellipsis: true,
    },
    {
      title: (
        <div>
          <p>'节点运行的时间 </p>
          <p>UP FOR </p>
        </div>
      ),
      dataIndex: 'upFor',
      key: 'upFor',
    },

    {
      title: '挂单时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'rewarded',
      key: 'rewarded',
      dataIndex: 'rewarded',
      width: 80,
      render: (_, record) => (
        <div style={{ whiteSpace: 'pre' }}>{record.rewarded}</div>
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
                record.status?.toLowerCase() === 'listed' ? 'recent-status' : ''
              }`}
              onClick={() =>
                handleOperation(
                  'stop',
                  record?.activity?.resource_id,
                  record?.id,
                )
              }
            >
              <p>List</p>
            </a>
            <a
              className={`${'operation-action'}  ${
                record.status?.toLowerCase() !== 'listed' ? 'recent-status' : ''
              }`}
              onClick={() =>
                handleOperation(
                  'start',
                  record?.activity?.resource_id,
                  record?.id,
                )
              }
            >
              <p>Delist</p>
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <JanctionTable
        className={styles['table']}
        columns={columns}
        dataSource={data}
        pagination={false}
        emptyDescription={
          <p>
            No instance is currently available. Please{' '}
            <a onClick={() => history.push('/genesis/purchase')}>
              create an instance
            </a>
          </p>
        }
      />
    </>
  );
}

export default NodesTable;
