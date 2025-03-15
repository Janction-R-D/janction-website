import React from 'react';
import { Form, Radio } from 'antd';
import styles from './index.less';
import { operating_systems as PROCESSOR } from './constant.json';

export default function Operating({ value, onChange }) {
  const handleRadioChange = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <section className={styles['processor-conf']}>
      <p>Operating System</p>
      <section className={styles['options']}>
        <Radio.Group
          className={styles['processors']}
          value={value?.processor}
          onChange={handleRadioChange}
        >
          {PROCESSOR.map((processor) => (
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
    </section>
  );
}
