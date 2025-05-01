import React, { useEffect, useState } from 'react';
import { Card, Checkbox } from 'antd';
import pytorch from '@/assets/images/genesis/pytorch.png';
import tensorflow from '@/assets/images/genesis/tensorflow.png';
import { FRAMEWORK } from './constant';
import styles from './index.less';
export default function FrameworkAi({ value, onChange }) {
  const handleCheckboxChange = (newValue) => {
    if (newValue === value) {
      onChange?.(null); // deselecciona si haces clic en la misma
    } else {
      onChange?.(newValue); // selecciona si es distinto
    }
  };

  return (
    <main className={styles['framework-conf-wrapper']}>
      <div className={styles['framework-check']}>
        <p>AI Framework</p>{' '}
      </div>
      <section className={styles['framework-conf-cards']}>
        {FRAMEWORK.map((item) => (
          <Card
            key={item.value}
            className={[
              styles['item'],
              value === item.value && styles['active-item'],
            ].join(' ')}
            style={{
              cursor: 'pointer',
            }}
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
                checked={value === item.value}
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
