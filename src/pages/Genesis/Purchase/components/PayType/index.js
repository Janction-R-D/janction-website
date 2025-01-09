import { PAY_CURRENCY } from '@/constant';
import { useEffect, useState } from 'react';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';

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
        {PAY_CURRENCY.filter((item) =>
          isProduction ? item.label !== 'veJCT' : true,
        ).map((item) => (
          <div
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
