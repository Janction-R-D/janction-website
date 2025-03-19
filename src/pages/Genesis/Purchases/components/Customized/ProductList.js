import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';
import { fetchListFilter, fetchListOptions } from '@/services/genesis';

function ProductList(props) {
  const { onChange, formValues, current } = props;
  const [selectKey, setSelectKey] = useState();

  const [list, setList] = useState([]);
  useEffect(() => {
    // getOpt();
    if (current !== 4) return;
    console.log(formValues);
    const {
      location: region,
      gpu: cpu_name,
      processor: gpu_name,
      conectivity_tier: memory,
      operating_system_str: operating_system,
    } = formValues || {};
    const payload = {
      region,
      cpu_name: [cpu_name],
      gpu_name: [gpu_name],
      operating_system,
    };
    getList(payload);
  }, []);
  const getList = async (data) => {
    try {
      const listItems = await fetchListFilter(data);
      setList(listItems);
    } catch (error) {
      console.log(error);
    }
  };
  const getOpt = async () => {
    const data = await fetchListOptions();
    return data;
  };
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
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

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
          <span>{text}</span>/mon.
        </p>
      ),
    },
  ];

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={list}
      pagination={false}
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

export default ProductList;
