import { useState } from 'react';
import { REGION } from '../extra';
import styles from './index.less';
import { Select } from 'antd';

const RegionSelect = (props) => {
  const [active, setActive] = useState(REGION[0]);
  return (
    <section className={styles['region-select']}>
      <h1 className={styles['sub-title']}>Region</h1>
      <div className={styles['content']}>
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
        <div className={styles['jaction-select']}>
          <Select placeholder="Other regions" options={REGION}></Select>
        </div>
      </div>
    </section>
  );
};

export default RegionSelect;
