import React, { useMemo, useState } from 'react';
import { Button, Card, Divider } from 'antd';
import styles from './orders.less';
import { brandDetails } from '@/constant';
import OrderModal from './OrderModal';

export default function OrderCard({ order }) {
  // const columns = [
  //   {
  //     title: 'Node ID',
  //     key: 'Product',
  //     dataIndex: 'Product',
  //   },
  //   {
  //     title: 'Operating System',
  //     key: 'operating_system',
  //     dataIndex: 'operating_system',
  //   },
  //   {
  //     title: 'Architechture',
  //     key: 'architechture_str',
  //     dataIndex: 'architechture_str',
  //   },
  //   {
  //     title: 'Cpu',
  //     key: 'cpu',
  //     dataIndex: 'cpu',
  //   },
  //   {
  //     title: 'Location',
  //     key: 'location',
  //     dataIndex: 'location',
  //   },
  //   {
  //     title: 'Memory',
  //     key: 'memory',
  //     dataIndex: 'memory',
  //   },
  //   {
  //     title: 'Network Down',
  //     key: 'network_down',
  //     dataIndex: 'network_down',
  //   },
  //   {
  //     title: 'Network Up',
  //     key: 'network_up',
  //     dataIndex: 'network_up',
  //   },
  //   {
  //     title: 'Expired',
  //     key: 'expired',
  //     dataIndex: 'expired',
  //   },
  //   {
  //     title: 'Price',
  //     key: 'price',
  //     fixed: 'right',
  //     dataIndex: 'price',
  //   },
  // ];
  // const data = useMemo(() => {
  //   if (!order?.resource) return [];
  //   const { node_id, created_at, expired_at, price, node } = order?.resource;
  //   const { attr = {} } = node || {};
  //   return [
  //     {
  //       key: '1',
  //       Product: (
  //         <section className={styles['card-product']} key={'SA5.MEDIUM2 Xxxx'}>
  //           <div className={styles['card-product-description']}>
  //             <p className={styles['card-product-title']}>{node_id || '~'}</p>
  //           </div>
  //         </section>
  //       ),

  //       architechture_str: (
  //         <div className={styles['card-product-price']}>
  //           <span className={styles['card-product-price-text']}>
  //             {attr.architechture_str}
  //           </span>
  //         </div>
  //       ),
  //       operating_system: (
  //         <div className="df ai_c gap10" title={attr.operating_system_str}>
  //           {attr?.operating_system_str && (
  //             <div className={styles['card-product-img-container']}>
  //               <i
  //                 className={`iconfont icon-${attr?.operating_system_str}`}
  //               ></i>
  //             </div>
  //           )}
  //         </div>
  //       ),
  //       cpu: attr.cpu || '~',
  //       location: attr.location || '~',
  //       memory: attr.memory || '~',
  //       network_down: attr.network_down || '~',
  //       network_up: attr.network_up || '~',
  //       expired: expired_at ? dayjs(expired_at).format('YYYY-MM-DD') : '~',
  //       price: price ? `${price} veJCT` : '~',
  //     },
  //   ];
  // }, [order]);
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
        <p>{data?.order?.id || '~'}</p>
        <div>
          <i className="iconfont icon-check " />
          <span>Payment Completed</span>
        </div>
      </h1>

      <section className={styles['card-product']}>
        <div className={styles['card-product-section']}>
          <div>
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

            <p className={styles['id']}>Order ID : {data.order?.id}</p>
          </div>
          <Button className={styles['connect-btn']} onClick={onOk}>
            Details <i className="iconfont icon-next" />
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
