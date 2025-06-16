import { Table } from 'antd';

import styles from './index.less';

import { useState } from 'react';
import { getTableData } from '../utils';

export default function QuickTable(props) {
  const { onChange, formValues, value, data, loading } = props;
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
  console.log(data);

  const columns = [
    {
      title: 'ID',
      ellipsis: true,
      dataIndex: 'id',
    },
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
      title: 'Processor',
      dataIndex: 'attr',
      ellipsis: true,
      render: (attr, record) => {
        if (!attr?.gpu_chip && !attr?.cpu_chip) return '--';
        const cpu = attr.cpu_chip;
        const gpu = attr.gpu_chip;
        return (
          <>
            <p>{cpu ? `${cpu[0]} * ${cpu.length}` : '--'}</p>
            <p>{gpu ? `${gpu[0]} * ${gpu.length}` : '--'}</p>
          </>
        );
      },
    },
  ];

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={list}
      loading={loading}
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
