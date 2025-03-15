import React, { useEffect, useState } from 'react';
import instacePng from '@/assets/images/genesis/instance.png';
import { Avatar, Button, Divider } from 'antd';
export default function AsidePrice({ formValues, styles, onConfirm }) {
  const [isFormEmpty, setIsEmpty] = useState(true);
  useEffect(() => {
    let isNotEmpty = Object.values(formValues)?.some(
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
            {formValues?.specification && (
              <section>
                <p className={styles['text__type']}>Instance Specification</p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <p className={styles['text__description']}>
                      {formValues?.specification}
                    </p>
                  </span>
                  <span className={styles['price']}>$35.669</span>
                </div>
              </section>
            )}

            {formValues?.operating_system_str && (
              <section>
                <p className={styles['text__type']}>Operating System</p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <i
                      className={`iconfont icon-${formValues?.operating_system_str}`}
                    />
                    <p className={styles['text__description']}>
                      {formValues?.operating_system_str}
                    </p>
                  </span>
                  <span className={styles['price']}>$35.669</span>
                </div>
              </section>
            )}
            {formValues?.instance && (
              <section>
                <p className={styles['text__type']}>Instance</p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <p className={styles['text__description']}>
                      {formValues?.instance.name}
                    </p>
                  </span>
                  <span className={styles['price']}>$35.669</span>
                </div>
              </section>
            )}
            {formValues?.especification && (
              <section>
                <p className={styles['text__type']}>Specification </p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <p className={styles['text__description']}>
                      {formValues?.especification}
                    </p>
                  </span>
                  <span className={styles['price']}>$35.669</span>
                </div>
              </section>
            )}
            {formValues?.ai_framework && (
              <section>
                <p className={styles['text__type']}>Framework </p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <p className={styles['text__description']}>
                      {formValues?.ai_framework}
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
      <Divider></Divider>
      <footer className={styles['aside-footer']}>
        <span className={styles['text__price']}>$34.669</span>
        <Button className={styles['btn-confirm']} onClick={onConfirm}>
          Confirm the order
        </Button>
      </footer>
      <Divider></Divider>
    </aside>
  );
}
