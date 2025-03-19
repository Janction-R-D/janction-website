import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import styles from './index.less';
import { operating_systems as PROCESSOR } from './constant.json';

export default function Operating({ value = [], onChange }) {
  const handleCheckboxChange = (checkedValues) => {
    onChange?.(checkedValues);
  };

  return (
    <section className={styles['processor-conf']}>
      <p>Operating System</p>
      <section className={styles['options']}>
        <Checkbox.Group
          className={styles['processors']}
          value={value}
          onChange={handleCheckboxChange}
        >
          {PROCESSOR.map((processor) => (
            <Checkbox
              key={processor.value}
              value={processor.value}
              className={[
                styles['processor'],
                styles['gradient-card'],
                value.includes(processor.value) && styles['active-item'],
              ].join(' ')}
            >
              <i className={`iconfont icon-${processor.label}`} />
              {processor.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </section>
    </section>
  );
}
