import { useEffect, useState } from 'react';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';
import { getCurrency } from '@/utils/contracts';

const isProduction = process.env.JANCTION_ENV === 'production';

const PayType = (props) => {
  const { value, onChange } = props;
  const [active, setActive] = useState();
  const [currency, setCurrency] = useState([]);
  useEffect(() => {
    const newCurrency = getCurrency();
    setCurrency(newCurrency);
    setActive(value);
  }, [value]);

  return (
    <LabelVal name="Payment type">
      <div className={styles['pay-type']}>
        {currency.map((item, index) => (
          <div
            key={index}
            className={[
              styles['pay-type-item'],
              active == item.value && styles['active'],
            ].join(' ')}
            onClick={() => {
              setActive(item.value);
              onChange(item.value);
            }}
          >
            <span>{item.label}</span>
            <span className={styles['desc']}>{item.desc}</span>
          </div>
        ))}
      </div>
    </LabelVal>
  );
};

export default PayType;
