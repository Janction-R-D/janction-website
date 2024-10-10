import React from 'react';
import OrderCard from './components/OrderCard';
import styles from './components/orders.less';

function Orders() {
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

Orders.wrappers = ['@/wrappers/auth'];
export default Orders;
