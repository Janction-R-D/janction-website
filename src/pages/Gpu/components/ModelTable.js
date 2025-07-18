import React from 'react';
import styles from './index.less';
import { Table, Typography } from 'antd';
import { useIntl } from 'umi';
const { Text } = Typography;
export const modelsGpu = [
  {
    key: '1',
    model: 'NVIDIA RTX 3090',
    price: '$3.4/hr (High)',
    realPrice: 3.4,
  },
  {
    key: '2',
    model: 'NVIDIA RTX 3080 Ti',
    price: '$2.8/hr (Medium)',
    realPrice: 2.8,
  },
  {
    key: '3',
    model: 'AMD Radeon RX 6900 XT',
    price: '$2.5/hr (Low)',
    realPrice: 2.5,
  },
  {
    key: '4',
    model: 'NVIDIA RTX 4070',
    price: '$2.1/hr (Medium)',
    realPrice: 2.1,
  },
  {
    key: '5',
    model: 'AMD Radeon RX 6800',
    price: '$1.9/hr (Low)',
    realPrice: 1.9,
  },
  {
    key: '6',
    model: 'NVIDIA GTX 1660 Super',
    price: '$0.9/hr (Low)',
    realPrice: 0.9,
  },
];

export default function ModelTable() {
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage({
        id: 'card.model',
        defaultMessage: 'GPU Model',
      }),
      dataIndex: 'model',
      key: 'model',
      className: styles.header,
      render: (text) => <Text className={styles.model}>{text}</Text>,
    },
    {
      title: intl.formatMessage({
        id: 'card.price',
        defaultMessage: 'Price (Demand)',
      }),
      dataIndex: 'price',
      key: 'price',
      className: styles.header,
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={modelsGpu}
        pagination={false}
        bordered={false}
        className={styles.table}
      />
    </div>
  );
}
