import { Table, Typography } from 'antd';
import { useIntl } from 'umi';
import styles from './index.less';

const { Text } = Typography;

const dataSource = [
  {
    key: 1,
    model: 'NVIDIA RTX 3090',
    location: 'User1 - Tokyo',
    vram: 24,
    cuda: 10496,
    price: '¥102/hr',
  },
  {
    key: 2,
    model: 'NVIDIA H100',
    location: 'DC1 - Osaka',
    vram: 40,
    cuda: 6912,
    price: '¥363/hr',
  },
  {
    key: 4,
    model: 'NVIDIA RTX 4080',
    location: 'User2 - Fukuoka',
    vram: 16,
    cuda: 9728,
    price: '¥131/hr',
  },
  {
    key: 5,
    model: 'NVIDIA H100',
    location: 'Azure - Tokyo',
    vram: 80,
    cuda: 16896,
    price: '¥1,015/hr',
  },
  {
    key: 6,
    model: 'NVIDIA RTX 3080',
    location: 'User3 - Nagoya',
    vram: 10,
    cuda: 8704,
    price: '¥87/hr',
  },
  {
    key: 9,
    model: 'NVIDIA RTX 4070',
    location: 'User4 - Yokohama',
    vram: 12,
    cuda: 5888,
    price: '¥80/hr',
  },
];
const dataSourceEn = [
  {
    key: 1,
    model: 'NVIDIA RTX 3090',
    location: 'User1 - Tokyo',
    vram: 24,
    cuda: 10496,
    price: '$0.70/hr',
  },
  {
    key: 2,
    model: 'NVIDIA H100',
    location: 'DC1 - Osaka',
    vram: 40,
    cuda: 6912,
    price: '$2.50/hr',
  },
  {
    key: 4,
    model: 'NVIDIA RTX 4080',
    location: 'User2 - Fukuoka',
    vram: 16,
    cuda: 9728,
    price: '$0.90/hr',
  },
  {
    key: 6,
    model: 'NVIDIA RTX 3080',
    location: 'User3 - Nagoya',
    vram: 10,
    cuda: 8704,
    price: '$0.60/hr',
  },
  {
    key: 9,
    model: 'NVIDIA RTX 4070',
    location: 'User4 - Yokohama',
    vram: 12,
    cuda: 5888,
    price: '$0.55/hr',
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
      title: intl.formatMessage({ id: 'products.column.location' }),
      dataIndex: 'location',
      key: 'location',
      className: styles.header,
    },
    {
      title: intl.formatMessage({ id: 'products.column.vram' }),
      dataIndex: 'vram',
      key: 'vram',
      className: styles.header,
    },
    {
      title: intl.formatMessage({ id: 'products.column.cuda' }),
      dataIndex: 'cuda',
      key: 'cuda',
      className: styles.header,
    },
    {
      title: intl.formatMessage({ id: 'products.cost.price' }),
      dataIndex: 'price',
      key: 'price',
      render: (text) => <Text style={{ color: '#00B2FF' }}>{text}</Text>,
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
          dataSource={intl.locale == 'ja-JP' ? dataSource : dataSourceEn}
          pagination={false}
          bordered={false}
          className={styles.table}
        />
      </div>
    </section>
  );
}
