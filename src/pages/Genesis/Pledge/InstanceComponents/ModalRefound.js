import React from 'react';
import { Modal, Checkbox, Button } from 'antd';
import styles from './modal.less';
import { useIntl } from 'umi';

export default function ModalRefound({ handleCancel, handleOk, isModalOpen }) {
  const intl = useIntl();

  return (
    <Modal
      className={styles['card-modal']}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      height={300}
      width={650}
    >
      <section className={styles['card-header']}>
        <h3>{intl.formatMessage({ id: 'modalRefound.title' })}</h3>
      </section>

      <section className={styles['header-card']}>
        <p>{intl.formatMessage({ id: 'modalRefound.description' })}</p>
      </section>

      <section className={styles['stake-info']}>
        <div>
          <span className={styles['info-label']}>
            {intl.formatMessage({ id: 'modalRefound.undercarriage' })}
          </span>
          <p>~~</p>
        </div>
        <div>
          <span className={styles['info-label']}>
            {intl.formatMessage({ id: 'modalRefound.filter' })}
            <i className="iconfont icon-info"></i>
          </span>
          <b className={styles['stake-info-price']}>60 veJCT</b>
        </div>

        <div className={styles['footer']}>
          <div>
            <Checkbox>
              <div
                className={styles['stake-check']}
                dangerouslySetInnerHTML={{
                  __html: intl
                    .formatMessage({ id: 'modalRefound.checkbox' })
                    .replace('<strong>', `<span class="${styles['blue']}">`)
                    .replace('</strong>', '</span>'),
                }}
              />
            </Checkbox>
          </div>

          <section className={styles['buttons']}>
            <div className={styles['pre']}>
              <Button onClick={handleCancel}>
                {intl.formatMessage({ id: 'modalRefound.cancel' })}
              </Button>
            </div>
            <Button className={styles['connect-btn']} onClick={handleOk}>
              {intl.formatMessage({ id: 'modalRefound.confirm' })}{' '}
              <i className="iconfont icon-next" />
            </Button>
          </section>
        </div>
      </section>
    </Modal>
  );
}
