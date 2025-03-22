import { Table } from 'antd';

import styles from './index.less';

import { useState } from 'react';
import { getTableData } from '../utils';

export default function QuickTable(props) {
  const { onChange, formValues, value, data } = props;
  const [selectKey, setSelectKey] = useState(value || null);
  const list = getTableData(data);
  const rowSelection = {
    selectedRowKeys: [selectKey],
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectKey(selectedRowKeys[0]);
      onChange?.(selectedRows[0]);
    },
  };
  const getRowClassName = (record) => {
    return record.id === selectKey ? styles['selected-row'] : '';
  };

  const columns = [
    {
      title: 'Operating System',
      ellipsis: true,
      dataIndex: 'operatingSystem',
      filters: [{ text: 'Android', value: 'Android' }],
      onFilter: (value, record) => record.operatingSystem.includes(value),
    },
    {
      title: 'Architecture',
      ellipsis: true,
      dataIndex: 'architecture',
      filters: [{ text: 'ARM64', value: 'ARM64' }],
      onFilter: (value, record) => record.architecture.includes(value),
    },
    {
      title: 'Internet',
      ellipsis: true,
      dataIndex: 'internet',
    },
    {
      title: 'Connectivity Tier',
      ellipsis: true,
      dataIndex: 'connectivity',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      filters: [{ text: 'China', value: 'China' }],
      onFilter: (value, record) => record.location.includes(value),
    },
    {
      title: 'Processor',
      dataIndex: 'process',
      ellipsis: true,
      render: (text, record) => (
        <div>
          <p>{text?.name}</p>
          <p>{text?.model}</p>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text, record) => (
        <p className="price">
          <span>{text}</span>USDT
        </p>
      ),
    },
  ];

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={list}
      pagination={{ pageSize: 5 }}
      rowKey={'id'}
      rowClassName={getRowClassName}
      className={styles['table']}
      scroll={{ x: 'auto' }}
      onRow={(record) => ({
        onClick: () => {
          setSelectKey(record.id);
          onChange?.(record);
        },
      })}
    />
  );
}
