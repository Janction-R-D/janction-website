import { useState } from 'react';
import styles from './index.less';
import { Select } from 'antd';
import { REGION } from '../../extra';
import JanctionSelect from '@/components/JanctionSelect';

const RegionSelect = (props) => {
  const [active, setActive] = useState(REGION[0]);
  return (
    <div className={styles['region-select']}>
      {REGION.map((item) => (
        <div
          className={[
            styles['item'],
            active.value == item.value && styles['active-item'],
          ].join(' ')}
          onClick={() => setActive(item)}
        >
          <span>{item.name}</span>
        </div>
      ))}
      <JanctionSelect placeholder="Other regions" options={REGION} />
    </div>
  );
};

export default RegionSelect;
