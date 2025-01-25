import { useEffect, useState } from 'react';
import styles from './index.less';
import { Select } from 'antd';
import { INTERNET } from '../../extra';
import JanctionSelect from '@/components/JanctionSelect';

const InternetSelect = (props) => {
  const { value, onChange, formValues } = props;
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(value);
  }, [value]);

  return (
    <div className={styles['region-select']}>
      {INTERNET.map((item, index) => (
        <div
          key={index}
          className={[
            styles['item'],
            active == item.value && styles['active-item'],
          ].join(' ')}
          onClick={() => {
            setActive(item.value);
            if (item.value === formValues?.internet_type) {
              onChange();
              return;
            }
            onChange(item.value);
          }}
        >
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default InternetSelect;
