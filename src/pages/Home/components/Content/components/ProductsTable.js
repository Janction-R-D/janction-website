import { Table, Typography, Tag } from 'antd';
import styles from './index.less';
import Shadow from '@/assets/images/Home_2/shadow_3.png';
const { Text } = Typography;

const columns = [
  {
    title: 'GPU Model',
    dataIndex: 'model',
    key: 'model',
    className: styles.header,
    render: (text) => <Text className={styles.model}>{text}</Text>,
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
    className: styles.header,
    render: (cost) => {
      if (cost === 'Coming Soon') {
        return <Text style={{ color: 'orange' }}>{cost}</Text>;
      }
      return <Text className={styles.cost}>{cost}</Text>;
    },
  },
  {
    title: 'Specification',
    dataIndex: 'specs',
    key: 'specs',
    className: styles.header,
  },
  {
    title: 'Remarks',
    dataIndex: 'remarks',
    key: 'remarks',
    className: styles.header,
  },
];

const dataSource = [
  {
    key: '1',
    model: 'Nvidia H100',
    cost: '$3.4/H',
    specs: '80GB HBM3,NVLLINK',
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
    cost: 'Coming Soon',
    specs: '80GB HBM3,NVLLINK',
    remarks: '1 unit',
  },
];

export default function ProductsTable() {
  return (
    <section className={styles['products']}>
      {/* <div className={styles['banner']}>
        <img src={Shadow} className={styles['illustration']} />
      </div> */}
      <div className={styles['products-table']}>
        <div className={styles['section_header']}>
          <h2 className={styles['title']}>Product Series</h2>
          <span className={styles['description']}>
            Transparent Pricing, Hourly Billing.
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
