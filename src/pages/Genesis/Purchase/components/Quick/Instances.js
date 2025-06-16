import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Card, Checkbox, Empty } from 'antd';
import { getTableData } from '../utils';
import EmptyInstance from './Empty/EmptyInstance';

export default function Instances({ value, onChange, styles, data }) {
  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue);
    }
  };
  const list = getTableData(data);

  return (
    <div className={styles['image-conf-wrapper']}>
      {list?.length >= 1 && <p> Recommended Instances</p>}
      <section className={styles['image-conf-cards']}>
        {list?.length >= 1 ? (
          list?.map((item) => {
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
                    <span className={styles['des-text']}>
                      {item?.process?.model}
                    </span>
                  </div>
                  <div className={styles['des-group']}>
                    <span>GPU</span>
                    <span className={styles['des-text']}>
                      {item?.process?.name}
                    </span>
                  </div>

                  <div className={styles['des-group']}>
                    <span>Memory</span>
                    <span className={styles['des-text']}>{item?.memory}</span>
                  </div>
                </article>
                <section className={styles['config-info']}>
                  <p className={styles['des-title']}>Architechture</p>
                  <div className={styles['des-group']}>
                    <span className={styles['des-text']}>
                      {item?.architecture}
                    </span>
                  </div>
                </section>
                <section className={styles['config-info']}>
                  <p className={styles['des-title']}>Operating System</p>
                  <div className={styles['des-group']}>
                    <span className={styles['des-text']}>
                      {item?.operatingSystem?.toUpperCase()}
                    </span>
                  </div>
                </section>
              </Card>
            );
          })
        ) : (
          <EmptyInstance />
        )}
      </section>
    </div>
  );
}
