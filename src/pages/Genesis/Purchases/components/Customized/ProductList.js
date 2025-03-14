import React, { useState } from 'react';
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';
const data = [
  {
    id: 'ec9a4c77-9b26-4863-9017-720a850394fc',
    operatingSystem: 'Android',
    architecture: 'ARM64',
    internet: 'NAT',
    connectivity: '600 Mbps',
    location: 'China',
    process: { name: 'INTEL | CPU', model: ' H100 PCIe' },
    price: '¥180,000.00',
  },
  {
    id: 'c1810c72-5c8a-4ce4-9a03-862d3418641e',
    operatingSystem: 'Android',
    architecture: 'ARM64',
    internet: 'NAT',
    connectivity: '600 Mbps',
    location: 'China',
    process: { name: 'INTEL | CPU', model: ' H100 PCIe' },
    price: '180,000.00',
  },
];

function ProductList(props) {
  const { onChange, formValues } = props;
  const [selectKey, setSelectKey] = useState(null);

  const rowSelection = {
    selectedRowKeys: [selectKey],
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectKey(selectedRowKeys[0]);
      onChange?.(selectedRows[0]);
    },

    // columnWidth: 0, // Oculta la columna
    // renderCell: () => null, // Evita que se renderice el checkbox en cada fila
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
  const getRowClassName = (record) =>
    record.key === selectKey ? 'selected-row' : '';
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
      dataSource={data}
      pagination={false}
      rowKey={'id'}
      rowClassName={getRowClassName} // Agrega clase a la fila seleccionada
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
