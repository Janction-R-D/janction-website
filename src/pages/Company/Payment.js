import { Card } from 'antd';
import styles from './index.less';
import { useIntl } from 'umi';

export default function Payment() {
  const intl = useIntl();

  const methods = [
    { labelId: 'payment.method.visa', icon: 'icon-visa' },
    { labelId: 'payment.method.ucp', icon: 'icon-unionpay' },
    { labelId: 'payment.method.mastercard', icon: 'icon-mastercard' },
    { labelId: 'payment.method.jcb', icon: 'icon-jcb' },
    { labelId: 'payment.method.alipay', icon: 'icon-alipay' },
    { labelId: 'payment.method.bankTransfer', icon: 'icon-banktransfernew' },
  ];

  return (
    <div className={styles.container_payment}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.dollar} />
          <div className={styles.text}>
            <h1>{intl.formatMessage({ id: 'payment.title' })}</h1>
            <p>{intl.formatMessage({ id: 'payment.description' })}</p>
          </div>
        </div>
        <div className={styles.grid}>
          {methods.map((item, idx) => (
            <Card key={idx} className={styles.methodCard} bordered={false}>
              <div className={styles.label}>
                {intl.formatMessage({ id: item.labelId })}
              </div>
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
