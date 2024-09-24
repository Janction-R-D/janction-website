import React from 'react';
import OrderCard from './OrdersComponents/OrderCard';
import styles from './OrdersComponents/orders.less';
export default function Orders() {
  const orders = [1, 2, 3, 4];
  return (
    <main className={styles['orders-component']}>
      <h1>Orders</h1>
      <div className={styles['orders']}>
        {orders.map((order) => (
          <OrderCard key={order} order={order} />
        ))}
      </div>
    </main>
  );
}
