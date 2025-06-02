import { Card } from 'antd';
import styles from './index.less';
import { Typography, Divider } from 'antd';
const { Text, Title } = Typography;

export default function OrderCard() {
  const data = {
    orderNo: '2.5 USDC / month',
    quantity: 'x1',
    duration: '1 Month',
    paymentMethod: 'coinbase/usdc',
    totalPrice: 9.9,
    currency: 'usdt',
  };
  const item = {
    id: 3,
    name: 'MedicalGPT',
    image: require('@/assets/images/genesis/agent/agent_3.png'),
    score: 9.7,
    popularity: 1500,
    recommended: false,
    tags: ['Diagnosis', 'Treatment Advice'],
  };
  const infoList = [
    {
      label: 'Price',
      value: data.orderNo,
    },
    { label: 'Quantity', value: data.quantity },
    { label: 'Duration', value: data.duration },
  ];
  return (
    <Card className={styles['order_card']}>
      <div className={styles.card}>
        <img className={styles.image} src={item?.image} alt="FinChat AI" />
        <div className={styles.overlay}>
          <div className={styles.description}>
            <div className={styles.description_left}>
              <div className={styles.title}>{item?.name}</div>
              <div className={styles.score}>Score: {item?.score}</div>
            </div>
          </div>
          <div className={styles.buttons}>
            {item?.tags.map((btn, i) => (
              <div key={i} className={styles.btn}>
                {btn}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles['order-item']}>
        <div className={styles['info-section']}>
          {infoList.map((item, index) => {
            const isState = item.label === 'State';
            const valueClass = isState
              ? item.value === 'pending'
                ? styles['pending']
                : item.value === 'complete'
                ? styles['complete']
                : ''
              : '';

            return (
              <div key={index} className={styles['info-row']}>
                <span className={styles['label']}>{item.label}</span>
                <span className={`${styles['value']} ${valueClass}`}>
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>

        <div className={styles['divider']} />

        <div className={styles['payment-info']}>
          <div className={styles['payment-section']}>
            <div className={styles['info-row']}>
              <span className={styles['label']}> Score</span>
              <span className={styles['value']}>{data.paymentMethod}</span>
            </div>
          </div>
          <div className={styles['total-price-section']}>
            <div className={styles['title']}>Method</div>
            <div className={styles['price']}>
              <span className={styles['number']}>{data.totalPrice}</span>
              <span className={styles['currency']}>{data.currency}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
