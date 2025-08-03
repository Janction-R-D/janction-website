import { useEffect, useState } from 'react';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';
import { getCurrency, getJasmyCurrency } from '@/utils/contracts';
import usdtImg from '@/assets/images/genesis/usdt.png';
import usdcImg from '@/assets/images/genesis/usdc.png';
import stripeImg from '@/assets/images/genesis/stripe.png';
const isProduction = process.env.JANCTION_ENV === 'production';

const PayType = (props) => {
  const { value, onChange, allowStripe, configInfo } = props;
  const [active, setActive] = useState();
  useEffect(() => {
    setActive(value);
  }, [value]);
  const paytype = [
    ...getJasmyCurrency(),
    ...(allowStripe
      ? [
          {
            value: 'Stripe',
            label: configInfo?.stripe_currency,
            rate: 1,
          },
        ]
      : []),
  ];
  return (
    <LabelVal name="Payment Method">
      <div className={styles['pay-type']}>
        {paytype.map((item, index) => (
          <div
            key={index}
            className={[
              styles['pay-type-item'],
              active == item.value && styles['active-item'],
            ].join(' ')}
            onClick={() => {
              setActive(item.value);
              onChange(item.value);
            }}
          >
            <span className={styles.icon}>
              <img
                src={
                  item.label === 'USDT'
                    ? usdtImg
                    : item.label === 'USDC'
                    ? usdcImg
                    : stripeImg
                }
              />
            </span>
            <span>{item.value === 'Stripe' ? 'Stripe' : item.label}</span>
            <span className={styles['desc']}>{item.desc}</span>
          </div>
        ))}
      </div>
    </LabelVal>
  );
};

export default PayType;
