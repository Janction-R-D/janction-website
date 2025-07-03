import { useIntl } from 'umi';
import styles from './index.less';
import imgPrice from '@/assets/images/company/price.png';
import imgPayment from '@/assets/images/company/payment.png';

export default function Methods() {
  const intl = useIntl();

  const cards = [
    {
      title: intl.formatMessage({ id: 'methods.card1.title' }),
      description: intl.formatMessage({ id: 'methods.card1.description' }),
      image: imgPayment,
    },
    {
      title: intl.formatMessage({ id: 'methods.card2.title' }),
      description: intl.formatMessage({ id: 'methods.card2.description' }),
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
