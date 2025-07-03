import { Card } from 'antd';
import styles from './index.less';
import imgPrice from '@/assets/images/company/price.png';
import imgPayment from '@/assets/images/company/payment.png';
export default function Methods() {
  const cards = [
    {
      title: 'Payment cycle',
      description:
        'The customer pays immediately according to the rental duration of the GPU. If the user requires bank transfer, please contact the official support.',
      image: imgPayment,
    },
    {
      title: 'Price',
      description:
        'Different GPUs have different prices, and real-time rental prices are provided on the official website and the purchase page.',
      image: imgPrice,
    },
  ];

  return (
    <div className={styles.container_methods}>
      {cards.map((card, idx) => (
        <div key={idx} className={styles.card} bordered={false}>
          <div className={styles.content}>
            <div className={styles.text}>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${card.image})` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
