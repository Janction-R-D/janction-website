import React, { useEffect, useState } from 'react';
import instacePng from '@/assets/images/genesis/instance.png';
import { Avatar, Button, Divider } from 'antd';
import { getDurationUnit } from '../../utils';

export default function AsidePrice({ formValues, styles, onConfirm }) {
  const [isFormEmpty, setIsEmpty] = useState(true);
  useEffect(() => {
    let isNotEmpty = Object.values(formValues)?.some(
      (item) => item !== undefined,
    );
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
                </div>
              </section>
            )}

            {formValues?.operating_system_str?.length >= 1 && (
              <section>
                <p className={styles['text__type']}>Operating System</p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <i
                      className={`iconfont icon-${formValues?.operating_system_str[0]}`}
                    />
                    <p className={styles['text__description']}>
                      {formValues?.operating_system_str.join(' | ')}
                    </p>
                  </span>
                </div>
              </section>
            )}
            {formValues?.node && (
              <section>
                <p className={styles['text__type']}>Instance</p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <p className={styles['text__description']}>
                      {formValues?.node.id}
                    </p>
                  </span>
                </div>
              </section>
            )}
            {formValues?.purDuration && (
              <section>
                <p className={styles['text__type']}>Duration</p>
                <div className={styles['text__content']}>
                  <span className={styles['description']}>
                    <p className={styles['text__description']}>
                      {formValues?.purDuration?.value}{' '}
                      {getDurationUnit(formValues?.purDuration?.unit)}
                    </p>
                  </span>
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
                </div>
              </section>
            )}
          </>
        ) : (
          <div className={styles['instance-empty']}>
            <img src={instacePng} alt="instance empty icon" />
            <p>Please start configuring the instance from the left.</p>
          </div>
        )}
      </main>
      <Divider></Divider>
      <footer className={styles['aside-footer']}>
        {/* <span className={styles['text__price']}>$34.669</span> */}
        {Object.values(formValues).some((item) => item !== undefined) && (
          <Button className={styles['btn-confirm']} onClick={onConfirm}>
            Confirm the order
          </Button>
        )}
      </footer>
      <Divider></Divider>
    </aside>
  );
}
