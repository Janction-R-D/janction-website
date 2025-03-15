import React from 'react';
import { Card, Checkbox } from 'antd';
import { instance_types } from './constant.json';
import styles from './index.less';
export default function Specification({ value, onChange }) {
  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue); // Actualiza el formulario
    }
  };
  return (
    <main className={styles['specification-conf-wrapper']}>
      <p>Instance Specification</p>
      <section className={styles['specification-conf-cards']}>
        {instance_types.map((item) => (
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
          </Card>
        ))}
      </section>
    </main>
  );
}
