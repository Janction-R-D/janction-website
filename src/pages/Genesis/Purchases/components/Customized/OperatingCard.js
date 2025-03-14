import React, { useEffect } from 'react';
import { SYSTEM_LIST } from '@/constant';
import { Card, Checkbox } from 'antd';
import styles from './index.less';

export default function OperatingCard({ value, onChange }) {
  // Asegura que el valor inicial sea el correcto
  useEffect(() => {
    if (!value) {
      onChange?.(SYSTEM_LIST[0]?.value);
    }
  }, [value, onChange]);

  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue); // Actualiza el formulario
    }
  };

  return (
    <div className={styles['image-conf-wrapper']}>
      <section className={styles['image-conf-cards']}>
        {SYSTEM_LIST.map((item) => (
          <Card
            key={item.value}
            className={[
              styles['item'],
              value === item.value && styles['active-item'],
            ].join(' ')}
            onClick={() => handleCheckboxChange(item.value)}
          >
            <section className={styles['item-header']}>
              <div className={styles['header-left']}>
                <div className={styles['icon']}>
                  <i className={`iconfont icon-${item.icon}`}></i>
                </div>
                <span>{item.label}</span>
              </div>
              <div className={styles['header-right']}>
                <Checkbox
                  className={styles['rounded-check']}
                  checked={value === item.value} // Vincula con el estado de Form
                  onChange={() => handleCheckboxChange(item.value)}
                />
              </div>
            </section>
            <p className={styles['des']}>
              Mobile is convenient, and large users can provide flexible
              computing power.
            </p>
          </Card>
        ))}
      </section>
    </div>
  );
}
