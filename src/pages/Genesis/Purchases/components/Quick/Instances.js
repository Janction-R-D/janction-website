import React, { useEffect } from 'react';
import data from './constant.json';
import { Card, Checkbox } from 'antd';
import styles from './index.less';

export default function Instances({ value, onChange }) {
  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue); // Actualiza el formulario
    }
  };

  return (
    <div className={styles['image-conf-wrapper']}>
      <p> Recommended Instances</p>
      <section className={styles['image-conf-cards']}>
        {data.instances.map((item) => (
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
                <span>{item.name}</span>
              </div>
              <div className={styles['header-right']}>
                <Checkbox
                  className={styles['rounded-check']}
                  checked={value === item.value} // Vincula con el estado de Form
                  onChange={() => handleCheckboxChange(item.value)}
                />
              </div>
            </section>
            <article>
              <div className={styles['des-group']}>
                <span>CPU</span>
                <span className={styles['des-text']}>{item.cpu}</span>
              </div>
              <div className={styles['des-group']}>
                <span>GPU</span>
                <span className={styles['des-text']}>{item.gpu}</span>
              </div>
              <div className={styles['des-group']}>
                <span>Storage</span>
                <span className={styles['des-text']}>{item.storage}</span>
              </div>
              <div className={styles['des-group']}>
                <span>Memory</span>
                <span className={styles['des-text']}>{item.memory}</span>
              </div>
            </article>
            <section className={styles['config-info']}>
              <p className={styles['des-title']}>Internet configuration</p>

              <div className={styles['des-group']}>
                {item.internet_configuration.map((subItem) => (
                  <span className={styles['des-text']}>{subItem}</span>
                ))}
              </div>
              <div className={styles['des-group']}>
                {item.connectivity_tier.map((subItem) => (
                  <span className={styles['des-text']}>{subItem}</span>
                ))}
              </div>
            </section>
            <section className={styles['config-info']}>
              <p className={styles['des-title']}>Processor</p>
              <div className={styles['des-group']}>
                <span className={styles['des-text']}>{item.processor}</span>
              </div>
            </section>
          </Card>
        ))}
      </section>
    </div>
  );
}
