import React, { useMemo } from 'react';
import { Card, Table } from 'antd';
import styles from './orders.less';
import JanctionTable from '@/components/JanctionTable';
import dayjs from 'dayjs';
export default function OrderCard({ order }) {
  const columns = [
    {
      title: 'Node ID',
      key: 'Product',
      dataIndex: 'Product',
    },
    {
      title: 'Operating System',
      key: 'operating_system',
      dataIndex: 'operating_system',
    },
    {
      title: 'Architechture',
      key: 'architechture_str',
      dataIndex: 'architechture_str',
    },
    {
      title: 'Cpu',
      key: 'cpu',
      dataIndex: 'cpu',
    },
    {
      title: 'Location',
      key: 'location',
      dataIndex: 'location',
    },
    {
      title: 'Memory',
      key: 'memory',
      dataIndex: 'memory',
    },
    {
      title: 'Network Down',
      key: 'network_down',
      dataIndex: 'network_down',
    },
    {
      title: 'Network Up',
      key: 'network_up',
      dataIndex: 'network_up',
    },
    {
      title: 'Expired',
      key: 'expired',
      dataIndex: 'expired',
    },
    {
      title: 'Price',
      key: 'price',
      fixed: 'right',
      dataIndex: 'price',
    },
  ];

  const data = useMemo(() => {
    if (!order?.resource) return [];
    const { node_id, created_at, expired_at, price, node } = order?.resource;
    const { attr = {} } = node || {};
    return [
      {
        key: '1',
        Product: (
          <section className={styles['card-product']} key={'SA5.MEDIUM2 Xxxx'}>
            <div className={styles['card-product-description']}>
              <p className={styles['card-product-title']}>{node_id || '~'}</p>
            </div>
          </section>
        ),

        architechture_str: (
          <div className={styles['card-product-price']}>
            <span className={styles['card-product-price-text']}>
              {attr.architechture_str}
            </span>
          </div>
        ),
        operating_system: (
          <div className="df ai_c gap10" title={attr.operating_system_str}>
            {attr?.operating_system_str && (
              <div className={styles['card-product-img-container']}>
                <i
                  className={`iconfont icon-${attr?.operating_system_str}`}
                ></i>
              </div>
            )}
          </div>
        ),
        cpu: attr.cpu || '~',
        location: attr.location || '~',
        memory: attr.memory || '~',
        network_down: attr.network_down || '~',
        network_up: attr.network_up || '~',
        expired: expired_at ? dayjs(expired_at).format('YYYY-MM-DD') : '~',
        price: price ? `${price} veJCT` : '~',
      },
    ];
  }, [order]);

  return (
    <Card className={styles['card']}>
      <h1 className={styles['card-title']}>Geforce RTX 4090</h1>
      <JanctionTable
        columns={columns}
        dataSource={data}
        className={styles['table']}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      {/* <JanctionTable
        className={styles['table']}
        columns={columns}
        dataSource={data}
        pagination={false}
      /> */}
      <section className={styles['card-product-footer']}>
        <span className={styles['card-product-price-text']}>Total</span>
        <span className={styles['text-blue']}>
          {order?.resource?.price ? `${order.resource.price} veJCT` : '~'}
        </span>
      </section>
    </Card>
  );
}
