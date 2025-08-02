import React from 'react';
import { Modal, Checkbox, Button } from 'antd';
import styles from './modal.less';
import { useIntl } from 'umi';

export default function ModalStake({
  item,
  handleCancel,
  handleOk,
  isModalOpen,
}) {
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
        <h3>{intl.formatMessage({ id: 'modalStake.title' })}</h3>
      </section>

      <section className={styles['header-card']}>
        <p>{intl.formatMessage({ id: 'modalStake.description' })}</p>
      </section>

      <section className={styles['stake-info']}>
        <div className={styles['stake-info-flex']}>
          <span className={styles['info-label']}>
            {intl.formatMessage({ id: 'modalStake.deviceId' })}
          </span>
          <p>{item?.id}</p>
        </div>

        <div className={styles['stake-info-flex']}>
          <span className={styles['info-label']}>
            {intl.formatMessage({ id: 'modalStake.price' })}
          </span>
          <b className={styles['stake-info-price']}>100JJT</b>
        </div>

        <div className={styles['footer']}>
          <div>
            <Checkbox>
              <div
                className={styles['stake-check']}
                dangerouslySetInnerHTML={{
                  __html: intl
                    .formatMessage({ id: 'modalStake.checkbox' })
                    .replace('<strong>', `<span class="${styles['blue']}">`)
                    .replace('</strong>', '</span>'),
                }}
              />
            </Checkbox>
          </div>

          <section className={styles['buttons']}>
            <div className={styles['pre']}>
              <Button onClick={handleCancel}>
                {intl.formatMessage({ id: 'modalStake.cancel' })}
              </Button>
            </div>
            <Button className={styles['connect-btn']} onClick={handleOk}>
              {intl.formatMessage({ id: 'modalStake.confirm' })}{' '}
              <i className="iconfont icon-next" />
            </Button>
          </section>
        </div>
      </section>
    </Modal>
  );
}
