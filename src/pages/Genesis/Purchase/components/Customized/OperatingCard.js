import React, { useState } from 'react';
import { SYSTEM_LIST } from '@/constant';
import { Card, Checkbox } from 'antd';
import styles from './index.less';

export default function OperatingCard({ value = [], onChange }) {
  const handleCheckboxChange = (checked, newValue) => {
    let newValues = checked
      ? [...value, newValue]
      : value.filter((item) => item !== newValue);
    onChange?.(newValues);
  };

  return (
    <div className={styles['image-conf-wrapper']}>
      <section className={styles['image-conf-cards']}>
        {SYSTEM_LIST.map((item) => (
          <Card
            key={item.value}
            className={[
              styles['item'],
              value.includes(item.value) && styles['active-item'],
            ].join(' ')}
            onClick={() =>
              handleCheckboxChange(!value.includes(item.value), item.value)
            }
          >
            <section className={styles['item-header']}>
              <div className={styles['header-left']}>
                <div className={styles['icon']}>
                  <i className={`iconfont icon-${item.icon}`}></i>
                </div>
              </div>
            </section>
            <div className={styles['item-desc']}>
              <span>{item.label}</span>
              <p className={styles['des']}>{item.description}</p>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
