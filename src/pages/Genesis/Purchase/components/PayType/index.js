import { useEffect, useState } from 'react';
import LabelVal from '../Card/LabelVal';
import styles from './index.less';
import { ADDRESS } from '@/constant';

const PAY_TYPE = [
  {
    value: ADDRESS.JCT,
    label: 'veJCT',
    desc: 'From JANCTION',
  },
  {
    value: ADDRESS.USDT,
    label: 'USDT',
  },
  {
    value: ADDRESS.USDC,
    label: 'USDC',
  },
];

const PayType = (props) => {
  const { value, onChange } = props;
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(value);
  }, [value]);

  return (
    <LabelVal name="Payment type">
      <div className={styles['pay-type']}>
        {PAY_TYPE.map((item) => (
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
