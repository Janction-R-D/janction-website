import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Card, Checkbox, Empty } from 'antd';

export default function Instances({ value, onChange, styles, data }) {
  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue); // Actualiza el formulario
    }
  };
  console.log(data);

  return (
    <div className={styles['image-conf-wrapper']}>
      <p> Recommended Instances</p>
      <section className={styles['image-conf-cards']}>
        {data?.length >= 1 ? (
          data?.map((item) => {
            return (
              <Card
                key={item?.id}
                className={`${styles['item']} ${
                  value?.id === item?.id ? styles['active-item'] : ''
                }`}
                onClick={() => handleCheckboxChange(item)}
              >
                <section className={styles['item-header']}>
                  <div className={styles['header-left']}>
                    <span>{item?.id}</span>
                  </div>
                  <div className={styles['header-right']}>
                    <Checkbox
                      className={styles['rounded-check']}
                      checked={value?.id === item?.id} // Vincula con el estado de Form
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </div>
                </section>
                <article>
                  <div className={styles['des-group']}>
                    <span>CPU</span>
                    <span className={styles['des-text']}>{item?.attr.cpu}</span>
                  </div>
                  <div className={styles['des-group']}>
                    <span>GPU</span>
                    <span className={styles['des-text']}>
                      {item?.attr.cpu_chip || '~'}
                    </span>
                  </div>

                  <div className={styles['des-group']}>
                    <span>Memory</span>
                    <span className={styles['des-text']}>
                      {item?.attr.memory}
                    </span>
                  </div>
                </article>
                <section className={styles['config-info']}>
                  <p className={styles['des-title']}>Architechture</p>
                  <div className={styles['des-group']}>
                    <span className={styles['des-text']}>
                      {item?.attr.architechture_str}
                    </span>
                  </div>
                </section>
                <section className={styles['config-info']}>
                  <p className={styles['des-title']}>Operating System</p>
                  <div className={styles['des-group']}>
                    <span className={styles['des-text']}>
                      {item?.attr.operating_system_str.toUpperCase()}
                    </span>
                  </div>
                </section>
              </Card>
            );
          })
        ) : (
          <Empty />
        )}
      </section>
    </div>
  );
}
