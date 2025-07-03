import React from 'react';
import styles from './index.less';
import { Table, Typography } from 'antd';
const { Text } = Typography;
export default function ModelTable() {
  const columns = [
    {
      title: 'GPU Model',
      dataIndex: 'model',
      key: 'model',
      className: styles.header,
      render: (text) => <Text className={styles.model}>{text}</Text>,
    },

    {
      title: 'Price (Demand)',
      dataIndex: 'price',
      key: 'price',
      className: styles.header,
    },
  ];
  const dataSource = [
    {
      key: '1',
      model: 'NVIDIA RTX 3090',
      price: '$3.4/hr (High)',
    },
    {
      key: '2',
      model: 'NVIDIA RTX 3080 Ti',
      price: '$2.8/hr (Medium)',
    },
    {
      key: '3',
      model: 'AMD Radeon RX 6900 XT',
      price: '$2.5/hr (Low)',
    },
    {
      key: '4',
      model: 'NVIDIA RTX 4070',
      price: '$2.1/hr (Medium)',
    },
    {
      key: '5',
      model: 'AMD Radeon RX 6800',
      price: '$1.9/hr (Low)',
    },
    {
      key: '6',
      model: 'NVIDIA GTX 1660 Super',
      price: '$0.9/hr (Low)',
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered={false}
        className={styles.table}
      />
    </div>
  );
}
