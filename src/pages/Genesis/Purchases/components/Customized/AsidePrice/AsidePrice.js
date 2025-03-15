import React, { useEffect, useState } from 'react';
import instacePng from '@/assets/images/genesis/instance.png';
import { Avatar, Button, Divider } from 'antd';
export default function AsidePrice({ formValues, styles, onConfirm }) {
  const [isFormEmpty, setIsEmpty] = useState(true);
  useEffect(() => {
    let isNotEmpty = Object.values(formValues).some(
      (item) => item !== undefined,
    );
    console.log(formValues);
    setIsEmpty(!isNotEmpty);
  }, [formValues]);
  return (
    <aside className={styles['aside-wrapper']}>
      <header className={styles['aside-header']}>
        <h2 className={styles['aside-title']}>Total price</h2>
      </header>

      <main className={styles['aside-content']}>
        {!isFormEmpty ? (
          <>
            {formValues?.operating_system_str && (
              <section>
                <p className={styles['text__type']}>Operating System</p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <i className="iconfont icon-nvidia" />
                    <p className={styles['text__description']}>
                      NAT | 1200 Mbps
                    </p>
                  </span>
                  <span className={styles['price']}>$35.669</span>
                </div>
              </section>
            )}

            {formValues?.internet_type && (
              <section>
                <p className={styles['text__type']}>Internet </p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <p className={styles['text__description']}>
                      NAT | 1200 Mbps
                    </p>
                  </span>
                  <span className={styles['price']}>$35.669</span>
                </div>
              </section>
            )}
            {formValues?.location && (
              <section>
                <p className={styles['text__type']}>Location </p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <p className={styles['text__description']}>
                      {formValues?.location}
                    </p>
                  </span>
                  <span className={styles['price']}>$35.669</span>
                </div>
              </section>
            )}
            {formValues?.processor_model &&
              formValues?.processor &&
              formValues?.gpu && (
                <section>
                  <p className={styles['text__type']}>Basic configuration </p>
                  <div className={styles['text__content']}>
                    <span className={styles['description']}>
                      <p className={styles['text__description']}>
                        <span>
                          {formValues?.processor} | {formValues?.gpu} |
                        </span>
                        <span>{formValues?.processor_model}</span>
                      </p>
                    </span>
                    <span className={styles['price']}>$35.669</span>
                  </div>
                </section>
              )}
            {formValues?.node && (
              <section>
                <p className={styles['text__type']}>Basic configuration </p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <p className={styles['text__description']}>
                      <span>
                        {formValues?.processor} | {formValues?.gpu} |
                      </span>
                      <span>{formValues?.processor_model}</span>
                    </p>
                  </span>
                  <span className={styles['price']}>$35.669</span>
                </div>
              </section>
            )}
          </>
        ) : (
          <div className={styles['instance-empty']}>
            <img src={instacePng} alt="instance empty icon" />
            <p>请从左侧开始配置 instance</p>
          </div>
        )}
      </main>
      <Divider />
      <footer className={styles['aside-footer']}>
        <span className={styles['text__price']}>$34.669</span>
        <Button className={styles['btn-confirm']} onClick={onConfirm}>
          Confirm the order
        </Button>
      </footer>
      <Divider />
    </aside>
  );
}
