import { ARCHITECTURE } from '@/constant';
import { useEffect, useState } from 'react';
import styles from './index.less';

const Architecture = (props) => {
  const { value, onChange } = props;
  const [active_ap, setActiveAp] = useState();

  useEffect(() => {
    setActiveAp(value);
  }, [value]);

  return (
    <div className={styles['application-wrapper']}>
      {ARCHITECTURE.map((item) => (
        <div
          className={[
            styles['item'],
            active_ap == item.value && styles['active-item'],
          ].join(' ')}
          onClick={() => {
            setActiveAp(item);
            onChange(item.value);
          }}
        >
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Architecture;
