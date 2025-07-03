import { Table, Typography } from 'antd';
import { useIntl } from 'umi';
import styles from './index.less';
const { Text } = Typography;

const dataSource = [
  {
    key: '1',
    model: 'Nvidia H100',
    cost: '$3.4/H',
    specs: '80GB HBM3, NVLLINK',
    remarks: '1 unit',
  },
  {
    key: '2',
    model: 'Nvidia A100',
    cost: '$1.8/H',
    specs: '40/80GB HBM2e',
    remarks: '1 unit',
  },
  {
    key: '3',
    model: 'Nvidia 4090',
    cost: '$0.3/H',
    specs: '24GB GDDR6X',
    remarks: '1 unit',
  },
  {
    key: '4',
    model: 'Nvidia A200',
    cost: 'comingSoon',
    specs: '80GB HBM3, NVLLINK',
    remarks: '1 unit',
  },
];

export default function ProductsTable() {
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage({ id: 'products.column.model' }),
      dataIndex: 'model',
      key: 'model',
      className: styles.header,
      render: (text) => <Text className={styles.model}>{text}</Text>,
    },
    {
      title: intl.formatMessage({ id: 'products.column.cost' }),
      dataIndex: 'cost',
      key: 'cost',
      className: styles.header,
      render: (cost) =>
        cost === 'comingSoon' ? (
          <Text style={{ color: 'orange' }}>
            {intl.formatMessage({ id: 'products.cost.comingSoon' })}
          </Text>
        ) : (
          <Text className={styles.cost}>{cost}</Text>
        ),
    },
    {
      title: intl.formatMessage({ id: 'products.column.specs' }),
      dataIndex: 'specs',
      key: 'specs',
      className: styles.header,
    },
    {
      title: intl.formatMessage({ id: 'products.column.remarks' }),
      dataIndex: 'remarks',
      key: 'remarks',
      className: styles.header,
    },
  ];

  return (
    <section className={styles['products']}>
      <div className={styles['products-table']}>
        <div className={styles['section_header']}>
          <h2 className={styles['title']}>
            {intl.formatMessage({ id: 'products.title' })}
          </h2>
          <span className={styles['description']}>
            {intl.formatMessage({ id: 'products.description' })}
          </span>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered={false}
          className={styles.table}
        />
      </div>
    </section>
  );
}
