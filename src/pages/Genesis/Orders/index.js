import React, { useEffect, useState } from 'react';
import OrderCard from './components/OrderCard';
import styles from './components/orders.less';
import { fetchMarketOrders } from '../../../services/genesis/instance';
import { isEmpty } from '@/utils/lang';
import JactionEmpty from '@/components/JactionEmpty';
import { Redirect, useModel } from 'umi';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};

  useEffect(() => {
    const payload = {
      page: 1,
      page_size: 25,
    };
    fetchMarketOrders(payload)
      .then((res) => {
        const { data } = res || {};
        if (Array.isArray(data)) {
          setOrders(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  if (!isLessee) return <Redirect to="/genesis/dashboard"></Redirect>;
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
