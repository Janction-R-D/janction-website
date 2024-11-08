import React, { useEffect, useState } from 'react';
import OrderCard from './components/OrderCard';
import styles from './components/orders.less';
import { fetchMarketOrders } from '../../../services/genesis/instance';

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchMarketOrders()
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className={styles['orders-component']}>
      <h1>Orders</h1>
      <div className={styles['orders']}>
        {orders?.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </main>
  );
}

Orders.wrappers = ['@/wrappers/auth'];
export default Orders;
