import React from 'react';
import styles from './modal.less';
import { Divider, Modal } from 'antd';
import { brandDetails } from '@/constant';
import { useId } from 'react';
import { formatISODate } from '@/utils/datetime';
import { useIntl } from 'umi';

export default function OrderModal({ handleCancel, isModalOpen, data }) {
  const intl = useIntl();

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
      className={styles['modal']}
    >
      <section className={styles['modal__header']}>
        <p>{intl.formatMessage({ id: 'orderModal.title' })}</p>
      </section>
      <div>
        <div className={styles['icon']}>
          {brandDetails[data?.resource?.node?.attr.operating_system_str] && (
            <i
              className={`iconfont icon-${
                brandDetails[
                  data?.resource?.node?.attr.operating_system_str.toLowerCase()
                ].icon
              } `}
              style={{
                color:
                  brandDetails[data?.resource?.node?.attr.operating_system_str]
                    .color,
              }}
            ></i>
          )}
        </div>
        <span>{data?.order?.id}</span>
      </div>

      <div>
        {renderInfo(
          intl.formatMessage({ id: 'orderModal.os' }),
          data?.resource?.node?.attr?.operating_system_str?.toUpperCase() ||
            '~~',
        )}
      </div>
      <div>
        {renderInfo(
          intl.formatMessage({ id: 'orderModal.basic' }),
          !data?.resource?.node?.attr?.cpu_chip_map
            ? '--'
            : (() => {
                const puMap = data.resource.node.attr.cpu_chip_map;

                const entries = Object.entries(puMap);
                if (entries.length === 0) return '--';

                const [key, value] = entries[0];
                return `${key} * ${value}`;
              })(),
        )}
      </div>
      <div>
        {renderInfo(
          intl.formatMessage({ id: 'orderModal.purchaseTime' }),
          data?.order?.purchase_duration +
            ' ' +
            data?.order?.purchase_duration_unit,
        )}
      </div>
      <div>
        {renderInfo(
          intl.formatMessage({ id: 'orderModal.arch' }),
          data?.resource?.node?.attr.architechture_str?.toUpperCase() || '~~',
        )}
      </div>
      <div>
        {renderInfo(
          intl.formatMessage({ id: 'createdTime' }),
          formatISODate(data?.order?.created_at),
        )}
      </div>
      <div>
        {renderInfo(
          intl.formatMessage({ id: 'expiredTime' }),
          formatISODate(data?.order?.expire_time),
        )}
      </div>
      <div>
        {renderInfo(
          intl.formatMessage({ id: 'orderModal.location' }),
          data?.resource?.node?.attr?.location || '~~',
        )}
      </div>
      <div>
        {renderInfo(
          intl.formatMessage({ id: 'orderModal.os' }),
          data?.resource?.node?.attr.operating_system_str || '~~',
        )}
      </div>
      <Divider />
      <div>
        {renderInfo(
          intl.formatMessage({ id: 'orderModal.orderTime' }),
          formatISODate(data?.order?.created_at),
        )}
      </div>
    </Modal>
  );
}

const renderInfo = (description, value) => {
  const id = useId();
  return (
    <div key={id} className={styles['order__item']}>
      <span className={styles['order__item--desc']}>{description}</span>
      <span className={styles['order__item--value']}>{value}</span>
    </div>
  );
};
