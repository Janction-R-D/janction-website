import { ARCHITECTURE } from '@/constant';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.less';

const Architecture = (props) => {
  const { formValues, value, onChange } = props;
  const [active_ap, setActiveAp] = useState();

  useEffect(() => {
    setActiveAp(value);
  }, [value]);

  const options = useMemo(() => {
    return ARCHITECTURE.filter((item) =>
      item.sys.includes(formValues?.operating_system_str),
    );
  }, [formValues?.operating_system_str]);

  return (
    <div className={styles['application-wrapper']}>
      {options.map((item) => (
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
