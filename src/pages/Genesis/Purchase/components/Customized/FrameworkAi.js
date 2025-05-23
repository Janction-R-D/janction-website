import React, { useEffect, useState } from 'react';
import { Switch, Card, Checkbox } from 'antd';
import pytorch from '@/assets/images/genesis/pytorch.png';
import tensorflow from '@/assets/images/genesis/tensorflow.png';
import { FRAMEWORK } from './constant';
import styles from './index.less';
export default function FrameworkAi({ value = [], onChange }) {
  const handleCheckboxChange = (newValue) => {
    let val = value;
    const checkIsInValue = value?.filter((item) => item === newValue);
    const isnotInValue = value?.filter((item) => item !== newValue);
    if (checkIsInValue?.length > 0) {
      onChange?.(isnotInValue);
    } else {
      val.push(newValue);
      onChange?.(val);
    }
  };
  return (
    <main className={styles['framework-conf-wrapper']}>
      <div className={styles['framework-check']}>
        <p>AI Framework</p>{' '}
        {/* <Switch defaultChecked={false} onChange={onCheckChange} /> */}
      </div>
      <section className={styles['framework-conf-cards']}>
        {FRAMEWORK.map((item) => (
          <Card
            key={item.value}
            className={[
              styles['item'],
              value?.includes(item?.value) && styles['active-item'],
              // check && styles['disabled'],
            ].join(' ')}
            // style={{
            //   cursor: check ? 'pointer' : 'not-allowed',
            //   pointerEvents: check ? '' : 'none',
            // }}
            onClick={() => handleCheckboxChange(item.value)}
          >
            <div className={styles['content']}>
              <div>
                {
                  <img
                    height={35}
                    src={item.value == 'pytorch' ? pytorch : tensorflow}
                  />
                }
              </div>

              <Checkbox
                className={styles['rounded-check']}
                checked={value?.includes(item?.value)}
                style={{ visibility: 'hidden' }}
                onChange={() => handleCheckboxChange(item.value)}
              />
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
