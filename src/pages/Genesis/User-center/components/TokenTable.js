import JanctionTable from '@/components/JanctionTable';
import { Space } from 'antd';
import { useState } from 'react';

import styles from '../index.less';
import OperationModal from './OperationModal';

function TokenTable({ tokens }) {
  const [showOverView, setShowOverView] = useState(true);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const columns = [
    {
      title: <div className="name">Token</div>,
      dataIndex: 'token',
      key: 'token',
      ellipsis: true,
    },

    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: 'Node',
      dataIndex: 'node',
      key: 'node',
    },
    {
      title: 'Remark',
      key: 'remark',
      dataIndex: 'remark',
    },

    {
      title: <div className="operation">Operation</div>,
      key: 'action',
      width: 'auto',
      fixed: 'right',
      render: (error, record) => {
        return <OperationModal record={record} />;
      },
    },
  ];
  const mappedOrders = tokens?.map((token) => ({
    token: token?.token,
    date: token?.date,
    node: token?.node,
    remark: token?.remark,
    deployed: token?.deployed,
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
        className="wp100"
        columns={columns}
        dataSource={mappedOrders}
        emptyDescription={
          <p>
            No Token is currently available. Please{' '}
            <a onClick={() => {}}>create a token</a>.
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

export default TokenTable;
