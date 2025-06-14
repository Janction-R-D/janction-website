import React from 'react';
import styles from './modal.less';
import { Divider, Modal } from 'antd';
import { brandDetails } from '@/constant';
import { useId } from 'react';
import { formatISODate } from '@/utils/datetime';

export default function OrderModal({ handleCancel, isModalOpen, data }) {
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
      className={styles['modal']}
    >
      <section className={styles['modal__header']}>
        <p>Configuration details</p>
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
          'Operating System',
          data?.resource?.node?.attr.operating_system_str.toUpperCase(),
        )}
      </div>
      <div>
        {renderInfo(
          'Basic Configuration',
          !data?.resource?.node?.attr.gpu_chip &&
            !data?.resource?.node?.attr.cpu_chip
            ? '--'
            : `${data?.resource?.node?.attr.gpu_chip || ''} ${
                data?.resource?.node?.attr.cpu_chip +
                  ' * ' +
                  data?.resource?.node?.attr.cpu_chip.length || ''
              }`,
        )}
      </div>
      <div>
        {renderInfo(
          'Purchase Time',
          data?.order?.purchase_duration +
            ' ' +
            data?.order?.purchase_duration_unit,
        )}
      </div>
      <div>
        {renderInfo(
          'Architechture',
          data?.resource?.node?.attr.architechture_str.toUpperCase(),
        )}
      </div>
      <div>{renderInfo('Location', data?.resource?.node?.attr.location)}</div>
      <div>
        {renderInfo(
          'Operating System',
          data?.resource?.node?.attr.operating_system_str,
        )}
      </div>
      <Divider />
      <div>
        {renderInfo('Order Time', formatISODate(data?.order?.created_at))}
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
