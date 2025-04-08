import React from 'react';
import { Card, Table } from 'antd';
import styles from './orders.less';
import JanctionTable from '@/components/JanctionTable';
export default function OrderCard({ order }) {
  const columns = [
    {
      title: 'Product',
      key: 'Product',
      dataIndex: 'Product',
    },

    {
      title: 'Price',
      key: 'PriceOne',
      dataIndex: 'PriceOne',
    },
    {
      title: 'Price',
      key: 'PriceTwo',
      dataIndex: 'PriceTwo',
    },
    {
      title: 'Price',
      key: 'PriceThree',
      dataIndex: 'PriceThree',
    },
  ];
  const data = [
    {
      key: '1',
      Product: (
        <section className={styles['card-product']} key={'SA5.MEDIUM2 Xxxx'}>
          <div className={styles['card-product-img-container']}>
            <img src="./nvidia.png" className={styles['card-product-img']} />
          </div>
          <div className={styles['card-product-description']}>
            <p className={styles['card-product-title']}>Geforce RTX 4090</p>
            <p className={styles['text-grey']}>xxxxxxxxxxxxxxxxxx</p>
            <p className={styles['text-grey']}>
              XxxxXxxxXxxxXxxxXxxxXxxxXxxxXxxxXxxx
            </p>
          </div>
        </section>
      ),

      PriceOne: (
        <div className={styles['card-product-price']}>
          <p className={styles['text-grey']}>XxxxXxxxXxxx</p>
          <p className={styles['text-grey']}>XxxxXxxxXxxx</p>
          <span className={styles['card-product-price-text']}>$8.9</span>
        </div>
      ),
      PriceTwo: '2h',
      PriceThree: '$8.9',
    },
    {
      key: '1',
      Product: (
        <section className={styles['card-product']} key={'SA5.MEDIUM2 Xxxx'}>
          <div className={styles['card-product-img-container']}>
            <img src="./nvidia.png" className={styles['card-product-img']} />
          </div>
          <div className={styles['card-product-description']}>
            <p className={styles['card-product-title']}>Geforce RTX 4090</p>
            <p className={styles['text-grey']}>xxxxxxxxxxxxxxxxxx</p>
            <p className={styles['text-grey']}>
              XxxxXxxxXxxxXxxxXxxxXxxxXxxxXxxxXxxx
            </p>
          </div>
        </section>
      ),

      PriceOne: (
        <div className={styles['card-product-price']}>
          <p className={styles['text-grey']}>XxxxXxxxXxxx</p>
          <p className={styles['text-grey']}>XxxxXxxxXxxx</p>
          <span className={styles['card-product-price-text']}>$8.9</span>
        </div>
      ),
      PriceTwo: '2h',
      PriceThree: '$8.9',
    },
  ];
  return (
    <Card className={styles['card']}>
      <h1 className={styles['card-title']}>Geforce RTX 4090</h1>
      <Table
        columns={columns}
        dataSource={data}
        className={styles['table']}
        pagination={false}
      />
      {/* <JanctionTable
        className={styles['table']}
        columns={columns}
        dataSource={data}
        pagination={false}
      /> */}
      <section className={styles['card-product-footer']}>
        <span className={styles['card-product-price-text']}>
          Geforce RTX 4090
        </span>
        <span className={styles['text-blue']}>$ 90.12</span>
      </section>
    </Card>
  );
}
