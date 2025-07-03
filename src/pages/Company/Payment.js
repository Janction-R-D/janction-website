import { Card } from 'antd';
import styles from './index.less';

export default function Payment() {
  const methods = [
    { label: 'visa', icon: 'icon-visa' },
    { label: 'UCP', icon: 'icon-unionpay' },
    { label: 'Mastercard', icon: 'icon-mastercard' },
    { label: 'JCB', icon: 'icon-jcb' },
    { label: 'Alipay', icon: 'icon-alipay' },
    { label: 'Bank transfer', icon: 'icon-banktransfernew' },
  ];

  return (
    <div className={styles.container_payment}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.dollar} />
          <div className={styles.text}>
            <h1>
              Accepted payment
              <br />
              methods
            </h1>
            <p>
              Credit Card/Debit Card (Visa, Mastercard, CUP, JCB), bank
              transfer, Alipay
            </p>
          </div>
        </div>
        <div className={styles.grid}>
          {methods.map((item, idx) => (
            <Card key={idx} className={styles.methodCard} bordered={false}>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.icon_box}>
                <i className={`iconfont ${item.icon}`} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
