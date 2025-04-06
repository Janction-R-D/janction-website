import React, { useEffect, useState } from 'react';
import instacePng from '@/assets/images/genesis/instance.png';
import { Avatar, Button, Divider } from 'antd';
import { getDurationUnit } from '../../utils';

export default function AsidePrice({ formValues, styles, onConfirm }) {
  const [isFormEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    setIsEmpty(!Object.values(formValues).some((item) => item !== undefined));
  }, [formValues]);

  const renderSection = (label, value, extra) =>
    value && (
      <section className={styles['container-box']}>
        <p className={styles['text__type']}>{label}</p>
        <div className={styles['text__content']}>
          <span className={styles['description']}>
            {extra || <p className={styles['text__description']}>{value}</p>}
          </span>
        </div>
      </section>
    );

  return (
    <aside className={styles['aside-wrapper']}>
      <header className={styles['aside-header']}>
        <h2 className={styles['aside-title']}>Total price</h2>
      </header>

      <main className={styles['aside-content']}>
        {!isFormEmpty ? (
          <>
            {formValues?.operating_system_str?.length >= 1 && (
              <section>
                <p className={styles['text__type']}>Operating System</p>
                <div className={styles['text__content_op']}>
                  {formValues.operating_system_str?.map((item, index) => (
                    <span className={styles['description']}>
                      <i className={`iconfont icon-${item}`} />
                      <p className={styles['text__description']}>{item}</p>
                    </span>
                  ))}
                </div>
              </section>
            )}
            {renderSection('AI Framework', formValues?.ai_framework)}
            {renderSection(
              'Purchase Duration',
              formValues?.purDuration,
              <span>
                {' '}
                {formValues?.purDuration?.value}{' '}
                {getDurationUnit(formValues?.purDuration?.unit)}
              </span>,
            )}
            {renderSection('Internet', formValues?.internet_type?.join(' | '))}
            {renderSection(
              'Connectivity tier',
              formValues?.conectivity_tier,
              <span>{formValues?.conectivity_tier + ' '}Mbps</span>,
            )}
            {renderSection('Location', formValues?.location?.join(' | '))}
            {formValues?.processor_model ||
              (formValues?.processor &&
                formValues?.gpu &&
                renderSection(
                  'Peocessor',
                  `${formValues?.processor} | ${
                    formValues?.gpu
                  } | ${formValues?.processor_model?.join(' | ')}`,
                  <span>
                    {formValues?.processor + ' '} {formValues?.gpu + ' '}{' '}
                    {formValues?.processor_model?.join(' | ')}
                  </span>,
                ))}
            {formValues?.node &&
              renderSection('Basic configuration', `${formValues?.node?.id}`)}
          </>
        ) : (
          <div className={styles['instance-empty']}>
            <img src={instacePng} alt="instance empty icon" />
            <p>Please start configuring the instance from the left</p>
          </div>
        )}
      </main>

      <Divider />
      <footer className={styles['aside-footer']}>
        {/* <span className={styles['text__price']}>$34.669</span> */}
        {Object.values(formValues).some((item) => item !== undefined) && (
          <Button className={styles['btn-confirm']} onClick={onConfirm}>
            Confirm the order
          </Button>
        )}
      </footer>
      <Divider />
    </aside>
  );
}
