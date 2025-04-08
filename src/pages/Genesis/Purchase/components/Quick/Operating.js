import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox } from 'antd';
import styles from './index.less';
import { debounce } from 'lodash';
import { PROCESSOR } from '@/constant';

export default function Operating({ value = [], onChange, getList }) {
  const handleCheckboxChange = (checkedValues) => {
    onChange?.(checkedValues);
    // after update yhe form , recall list filter
    const payload = {
      operating_system: checkedValues,
    };

    debouncedGetList(payload);
  };
  const debouncedGetList = useMemo(() => debounce(getList, 1000), []);
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
