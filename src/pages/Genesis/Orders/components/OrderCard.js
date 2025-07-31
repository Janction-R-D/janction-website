import React, { useMemo, useState } from 'react';
import { Button, Card, Divider } from 'antd';
import styles from './orders.less';
import { brandDetails } from '@/constant';
import OrderModal from './OrderModal';
import PayButton from './PayButton';

export default function OrderCard({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <Card className={styles['card']}>
      <h1 className={styles['card-title']}>
        <p>
          <Hearder data={data} />
        </p>

        <div className={styles[`${data?.order?.status}`]}>
          <i
            className={`iconfont ${
              data?.order?.status == 'completed'
                ? 'icon-check'
                : data?.order?.status == 'pending'
                ? 'icon-refresh'
                : 'refunded'
            }`}
          />
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
              Order ID : <span>{data.order?.id}</span>
            </p>
          </div>
          <Button className={styles['connect-btn']} onClick={onOk}>
            Details <i className="iconfont icon-next" />
          </Button>
          {/* {data.order.status == 'pending' && <PayButton order={data.order} />} */}
          <OrderModal
            handleCancel={onCancel}
            isModalOpen={isModalOpen}
            data={data}
          />
        </div>
        <div className={styles['card-product-section-r']}>
          <section>
            <p>
              <span> Price:</span>
              <span>{data.order?.price?.price_in_currency || `~`}</span>
            </p>
            <p>
              <span>Quantity:</span>
              <span>x{data.order?.purchase_instance_quantity}</span>
            </p>
            <p>
              <span>Duration:</span>
              <span>
                {data.order?.purchase_duration || '~'}{' '}
                {data.order?.purchase_duration_unit || '~'}
              </span>
            </p>
            <p>
              <span>Arch:</span>
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
              <span>Payment Method:</span>
              <span className={styles['bold']}>coinbase wallet/usdc</span>
            </p>
            <p>
              <span>Paid</span>
              <span className={styles['price']}>
                <span className={styles['bold-price']}>
                  {data.order?.price?.price_in_currency || `~`}
                </span>
                <span>USDC</span>
              </span>
            </p>
          </section>
        </div>
      </section>

      {/* <section className={styles['card-product-footer']}>
        <span className={styles['card-product-price-text']}>Total</span>
        <span className={styles['text-blue']}>
          {order?.resource?.price ? `${order.resource.price} veJCT` : '~'}
        </span>
      </section> */}
    </Card>
  );
}

const Hearder = ({ data }) => {
  const { node } = data?.order || {};

  if (!node?.attr?.gpu_chip && !node?.attr?.cpu_chip) {
    return (
      <span className={styles['node_id']}>Node ID: {data?.order?.node_id}</span>
    );
  }
  const cpu = node?.attr?.cpu_chip;
  const gpu = node?.attr?.gpu_chip;

  const cpuText = !!cpu?.length ? `${cpu[0]} * ${cpu.length}` : '--';
  const gpuText = !!gpu?.length ? `${gpu[0]} * ${gpu.length}` : '--';
  return (
    <>
      <p style={{ fontSize: '12px' }}>{cpuText}</p>
      <p style={{ fontSize: '12px' }}>{gpuText}</p>
    </>
  );
};
