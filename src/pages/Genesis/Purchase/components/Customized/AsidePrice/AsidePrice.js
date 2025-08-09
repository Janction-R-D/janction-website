import React, { useEffect, useState } from 'react';
import instacePng from '@/assets/images/genesis/instance.png';
import { Avatar, Button, Divider } from 'antd';
import { getDurationUnit } from '../../utils';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';

export default function AsidePrice({ formValues, styles, onConfirm }) {
  const [isFormEmpty, setIsEmpty] = useState(true);
  const intl = useIntl();
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
        <h2 className={styles['aside-title']}>
          {intl.formatMessage({ id: 'confirm.total_price' })}
        </h2>
      </header>

      <main className={styles['aside-content']}>
        {!isFormEmpty ? (
          <>
            {formValues?.operating_system_str?.length >= 1 && (
              <section>
                <p className={styles['text__type']}>
                  {intl.formatMessage({ id: 'confirm.total_price' })}
                </p>
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
            {renderSection(
              'AI Framework',
              formValues?.ai_framework?.join(' | '),
            )}
            {renderSection('Image', formValues?.template)}
            {formValues?.node && (
              <section>
                <p className={styles['text__type']}>
                  {' '}
                  {intl.formatMessage({ id: 'confirm.duration' })}
                </p>
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
            <p>{intl.formatMessage({ id: 'steps.aside_empty' })}</p>
          </div>
        )}
      </main>

      <Divider />
      <footer className={styles['aside-footer']}>
        {/* <span className={styles['text__price']}>$34.669</span> */}
        {Object.values(formValues).some((item) => item !== undefined) && (
          <Button className={styles['btn-confirm']} onClick={onConfirm}>
            {intl.formatMessage({ id: 'confirm.order' })}{' '}
            <ShoppingCartOutlined />
          </Button>
        )}
      </footer>
      <Divider />
    </aside>
  );
}
