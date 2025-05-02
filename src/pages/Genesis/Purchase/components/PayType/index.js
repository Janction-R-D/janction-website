import { useEffect, useState } from 'react';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';
import { getCurrency } from '@/utils/contracts';
import usdtImg from '@/assets/images/genesis/usdt.png';
import usdcImg from '@/assets/images/genesis/usdc.png';
const isProduction = process.env.JANCTION_ENV === 'production';

const PayType = (props) => {
  const { value, onChange } = props;
  const [active, setActive] = useState();
  useEffect(() => {
    setActive(value);
  }, [value]);

  return (
    <LabelVal name="Payment type">
      <div className={styles['pay-type']}>
        {getCurrency().map((item, index) => (
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
              <img src={item.label === 'USDT' ? usdtImg : usdcImg} />
            </span>{' '}
            <span>{item.label}</span>
            <span className={styles['desc']}>{item.desc}</span>
          </div>
        ))}
      </div>
    </LabelVal>
  );
};

export default PayType;
