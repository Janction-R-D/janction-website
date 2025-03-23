import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Card, Checkbox, Empty } from 'antd';

const formatDate = (isoString, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!isoString) return '--';
  return dayjs(isoString).format(format);
};
export default function Instances({ value, onChange, styles, data }) {
  const cardData = getTableData(data);

  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue); // Actualiza el formulario
    }
  };

  return (
    <div className={styles['image-conf-wrapper']}>
      <p> Recommended Instances</p>
      <section className={styles['image-conf-cards']}>
        {cardData?.length >= 1 ? (
          cardData?.map((item) => {
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
                    <span className={styles['des-text']}>{item?.cpu}</span>
                  </div>
                  <div className={styles['des-group']}>
                    <span>GPU</span>
                    <span className={styles['des-text']}>{item?.gpu}</span>
                  </div>
                  <div className={styles['des-group']}>
                    <span>Storage</span>
                    <span className={styles['des-text']}>{item?.storage}</span>
                  </div>
                  <div className={styles['des-group']}>
                    <span>Memory</span>
                    <span className={styles['des-text']}>{item?.memory}</span>
                  </div>
                </article>
                <section className={styles['config-info']}>
                  <p className={styles['des-title']}>Internet configuration</p>
                  <div className={styles['des-group']}>
                    <span className={styles['des-text']}>{item?.internet}</span>
                  </div>
                  <div className={styles['des-group']}>
                    {item?.connectivity_tier?.map((subItem) => (
                      <span className={styles['des-text']}>{subItem}</span>
                    ))}
                  </div>
                </section>
                <section className={styles['config-info']}>
                  <p className={styles['des-title']}>Location</p>
                  <div className={styles['des-group']}>
                    <span className={styles['des-text']}>{item?.location}</span>
                  </div>
                </section>
                <section className={styles['config-info']}>
                  <p className={styles['des-title']}>Processor</p>
                  <div className={styles['des-group']}>
                    <span className={styles['des-text']}>
                      {item?.processor}
                    </span>
                  </div>
                </section>
                {/* <span className={styles['text__price']}>$34.669</span> */}
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
