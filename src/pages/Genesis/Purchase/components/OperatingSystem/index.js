import { SYSTEM_LIST } from '@/constant';
import { useEffect, useState } from 'react';
import styles from './index.less';

const OperatingSystem = (props) => {
  const { value, onChange, formValues } = props;

  const [active_i, setActiveI] = useState(SYSTEM_LIST[0].value);

  useEffect(() => {
    setActiveI(value);
  }, [value]);

  return (
    <div className={styles['image-conf-wrapper']}>
      {SYSTEM_LIST.map((item, index) => (
        <div
          key={index}
          className={[
            styles['item'],
            active_i == item.value && styles['active-item'],
          ].join(' ')}
          onClick={() => {
            setActiveI(item.value);
            if (item.value === formValues?.operating_system_str) {
              onChange();
              return;
            }
            onChange(item.value);
          }}
        >
          <div className={styles['icon']}>
            <i className={`iconfont icon-${item.icon}`}></i>
          </div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default OperatingSystem;
