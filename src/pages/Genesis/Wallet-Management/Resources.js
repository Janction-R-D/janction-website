import React from 'react';
import { Input } from 'antd';
import data from './resources.json';
import styles from './resources.less';
import ResourceCard from './components/ResourceCard/ResourceCard';
import useData from './Hook/useData';
import Empty from './components/EmptyResorce/Empty';
export default function Resources() {
  const { list } = useData() || {};
  const mappedOrders = list?.map((resource) => ({
    key: resource?.key,
    date: resource?.date,
    node: resource?.node,
    type: resource?.type,
    status: resource?.status,
    curency: resource?.curency || '-',
    quantity: resource?.quantity,
  }));
  console.log(mappedOrders);
  return (
    <main className={styles['resource-wrapper']}>
      <section className={styles['resource-header']}>
        <h1 className={styles['resource-title']}>Transaction Detrails</h1>
        <Input
          suffix={
            <i
              className="iconfont icon-search"
              style={{ fontSize: '0.8rem' }}
            />
          }
          placeholder="You can fuzzy search for nodes by device ID or api"
          className={styles['search-input']}
        />
      </section>

      {mappedOrders?.length >= 1 ? (
        <ul className={styles['cards']}>
          {mappedOrders.map((card, index) => (
            <ResourceCard card={card} key={index} />
          ))}
        </ul>
      ) : (
        <Empty />
      )}
    </main>
  );
}
