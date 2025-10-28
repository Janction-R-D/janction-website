import { Table } from 'antd';

import styles from './index.less';

import { useState } from 'react';
import { getTableData } from '../utils';
import { useIntl } from 'umi';

export default function QuickTable(props) {
  const { onChange, formValues, value, data, loading } = props;
  const [selectKey, setSelectKey] = useState(value || null);
  const list = getTableData(data);
  const intl = useIntl();
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
      title: intl.formatMessage({ id: 'common.title.id' }),
      ellipsis: true,
      dataIndex: 'id',
    },
    {
      title: intl.formatMessage({ id: 'common.title.arch' }),
      ellipsis: true,
      dataIndex: 'operatingSystem',
      filters: [{ text: 'Android', value: 'Android' }],
      onFilter: (value, record) => record.operatingSystem.includes(value),
      render: (text, record) => {
        const displayText = `${record.operatingSystem} / ${record.architecture}`;
        return <span>{displayText}</span>;
      },
    },
    {
      title: intl.formatMessage({ id: 'common.title.location' }),
      ellipsis: true,
      dataIndex: 'location',
    },
    {
      title: intl.formatMessage({ id: 'common.title.processor' }),
      dataIndex: 'attr',
      ellipsis: true,
      render: (attr, record) => {
        if (!attr?.gpu_chip && !attr?.cpu_chip) return '--';
        const cpu = attr?.cpu_chip;
        const gpu = attr?.gpu_chip;

        return (
          <>
            <p>{!!cpu?.length ? `${cpu[0]} * ${cpu?.length}` : '--'}</p>
            <p>{!!gpu?.length ? `${gpu[0]} * ${gpu?.length}` : '--'}</p>
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
      className={`${styles['table']} ${styles.scrollTable}`}
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
