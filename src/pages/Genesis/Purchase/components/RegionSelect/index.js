import { useEffect, useState } from 'react';
import styles from './index.less';
import { Select } from 'antd';
import { REGION } from '../../extra';
import JanctionSelect from '@/components/JanctionSelect';

const RegionSelect = (props) => {
  const { value, onChange } = props;
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(value);
  }, [value]);

  return (
    <div className={styles['region-select']}>
      {REGION.map((item) => (
        <div
          className={[
            styles['item'],
            active == item.value && styles['active-item'],
          ].join(' ')}
          onClick={() => {
            setActive(item.value);
            onChange(item.value);
          }}
        >
          <span>{item.name}</span>
        </div>
      ))}
      <JanctionSelect placeholder="Other regions" options={REGION} />
    </div>
  );
};

export default RegionSelect;
