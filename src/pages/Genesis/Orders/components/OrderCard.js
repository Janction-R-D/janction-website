import React, { useMemo, useState } from 'react';
import { Button, Card, Divider } from 'antd';
import styles from './orders.less';
import { brandDetails } from '@/constant';
import OrderModal from './OrderModal';
import PayButton from './PayButton';
import { useIntl } from 'umi';

export default function OrderCard({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const intl = useIntl();

  const onOk = () => {
    setIsModalOpen(true);
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };

  const data = {
    order: order?.order,
    resource: order?.resource,
  };

  const statusKey = data?.order?.status?.toLowerCase();
  const statusIcon =
    {
      completed: 'icon-Completed',
      pending: 'icon-refresh',
      expired: 'icon-info',
    }[statusKey] || 'icon-refund';

  return (
    <Card className={styles['card']}>
      <h1 className={styles['card-title']}>
        <p>
          <Hearder data={data} />
        </p>

        <div className={styles[statusKey]}>
          <i className={`iconfont ${statusIcon}`} />
          <span>{data?.order?.status || '~'}</span>
        </div>
      </h1>

      <section className={styles['card-product']}>
        <div className={styles['card-product-section']}>
          <div className={styles['card-product-model']}>
            <div className={styles['icon']}>
              {brandDetails[data.resource?.node?.attr.operating_system_str] && (
                <i
                  className={`iconfont icon-${
                    brandDetails[
                      data.resource?.node?.attr.operating_system_str.toLowerCase()
                    ].icon
                  } `}
                  style={{
                    color:
                      brandDetails[
                        data.resource?.node?.attr.operating_system_str
                      ].color,
                  }}
                ></i>
              )}
            </div>

            <p className={styles['id']}>
              {intl.formatMessage({ id: 'order.id' })}{' '}
              <span>{data.order?.id}</span>
            </p>
          </div>
          <Button className={styles['connect-btn']} onClick={onOk}>
            {intl.formatMessage({ id: 'order.details' })}{' '}
            <i className="iconfont icon-next" />
          </Button>
          <OrderModal
            handleCancel={onCancel}
            isModalOpen={isModalOpen}
            data={data}
          />
        </div>

        <div className={styles['card-product-section-r']}>
          <section>
            <p>
              <span>{intl.formatMessage({ id: 'order.price' })}</span>
              <span>{data.order?.price?.price_in_currency || `~`}</span>
            </p>
            <p>
              <span>{intl.formatMessage({ id: 'order.quantity' })}</span>
              <span>x{data.order?.purchase_instance_quantity}</span>
            </p>
            <p>
              <span>{intl.formatMessage({ id: 'order.duration' })}</span>
              <span>
                {data.order?.purchase_duration || '~'}{' '}
                {data.order?.purchase_duration_unit || '~'}
              </span>
            </p>
            <p>
              <span>{intl.formatMessage({ id: 'order.arch' })}</span>
              <span>
                {data.order?.resource?.node?.attr?.architechture_str &&
                data.order?.resource?.node?.attr?.operating_system_str
                  ? `${data.order.resource.node.attr.architechture_str} / ${data.order.resource.node.attr.operating_system_str}`
                  : '~~'}
              </span>
            </p>
          </section>

          <Divider />
          <section>
            <p>
              <span>{intl.formatMessage({ id: 'order.payment.method' })}</span>
              <span className={styles['bold']}>
                {intl.formatMessage({ id: 'order.payment.method.value' })}
              </span>
            </p>
            <p>
              <span>{intl.formatMessage({ id: 'order.payment.paid' })}</span>
              <span className={styles['price']}>
                <span className={styles['bold-price']}>
                  {data.order?.price?.price_in_currency || `~`}
                </span>
                <span>{intl.formatMessage({ id: 'order.paid.unit' })}</span>
              </span>
            </p>
          </section>
        </div>
      </section>
    </Card>
  );
}

const Hearder = ({ data }) => {
  const gpu = data?.resource?.node?.attr?.gpu_chip;
  const cpu = data?.resource?.node?.attr?.cpu_chip;
  const nodeId = data?.order?.node_id;
  const intl = useIntl();

  if (!gpu && !cpu) {
    return (
      <span className={styles['node_id']}>
        {intl.formatMessage({ id: 'order.node.id' })} {nodeId || '--'}
      </span>
    );
  }

  return <span>{`${gpu || ''} ${cpu || ''} * ${cpu?.length || 0}`}</span>;
};
