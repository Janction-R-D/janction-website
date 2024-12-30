import JanctionTable from '@/components/JanctionTable';
import { Space } from 'antd';
import { useState } from 'react';

// import { convertMBtoGB } from '../Dashboard/Lessors';
import styles from './resources.less';

import { history } from 'umi';
import useData from './Hook/useData';

function ResourceTable({ data }) {
  const { list } = useData() || {};
  const columns = [
    {
      title: <div className="name">Date</div>,
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: <div className="name">Type</div>,
      dataIndex: 'type',
      key: 'type',
      ellipsis: true,
    },
    {
      title: <div className="quantity">Quantity</div>,
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: <div className="curency">Currency</div>,
      dataIndex: 'curency',
      key: 'curency',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text) => (
        <>
          {text.toLowerCase() === 'success' ? (
            <div className="status status-running">
              <i className="iconfont  icon-check"></i> Success
            </div>
          ) : (
            <div className="status status-stopped">
              <i className="iconfont  icon-play_pause"></i> Fail
            </div>
          )}
        </>
      ),
    },
  ];
  const mappedOrders = list?.map((resource) => ({
    key: resource?.key,
    date: resource?.date,
    node: resource?.node,
    type: resource?.type,
    status: resource?.status,
    curency: resource?.curency,
    quantity: resource?.quantity,
  }));

  return (
    <>
      <JanctionTable
        className={styles['table']}
        columns={columns}
        dataSource={mappedOrders}
        emptyDescription={<p>No Data</p>}
        pagination={{
          pageSize: 5,
          position: ['bottomCenter'],
        }}
        scroll={{ x: 'auto' }}
      />
    </>
  );
}

export default ResourceTable;
