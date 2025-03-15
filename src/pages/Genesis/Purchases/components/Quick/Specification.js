import React from 'react';
import { Card, Checkbox, Radio } from 'antd';
import { instance_types } from './constant.json';
import styles from './index.less';
export default function Specification({ value, onChange }) {
  const handleRadioChange = (e) => {
    onChange?.(e.target.value);
  };
  return (
    <main className={styles['specification-conf-wrapper']}>
      <p>Instance Specification</p>
      <section className={styles['options']}>
        <Radio.Group
          className={styles['processors']}
          value={value?.processor}
          onChange={handleRadioChange}
        >
          {instance_types.map((processor) => (
            <Radio.Button
              key={processor.value}
              value={processor.value}
              className={[
                styles['processor'],
                styles['gradient-card'],
                processor.value == value && styles['active-item'],
              ].join(' ')}
            >
              <i className={`iconfont icon-${processor.label}`} />
              {processor.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </section>
    </main>
  );
}
