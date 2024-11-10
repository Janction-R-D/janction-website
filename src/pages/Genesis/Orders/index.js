import React, { useEffect, useState } from 'react';
import OrderCard from './components/OrderCard';
import styles from './components/orders.less';
import { fetchMarketOrders } from '../../../services/genesis/instance';
import { isEmpty } from '@/utils/lang';
import JactionEmpty from '@/components/JactionEmpty';

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
      {!isEmpty(orders) && (
        <div className={styles['orders']}>
          {orders?.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>
      )}
      <div className="mt40">
        {isEmpty(orders) && <JactionEmpty showEmptyIcon />}
      </div>
    </main>
  );
}

Orders.wrappers = ['@/wrappers/auth'];
export default Orders;
