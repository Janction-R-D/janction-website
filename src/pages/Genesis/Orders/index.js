import { useEffect, useState, useMemo } from 'react';
import OrderCard from './components/OrderCard';
import styles from './components/orders.less';
import { fetchMarketOrders } from '../../../services/genesis/instance';
import { isEmpty } from '@/utils/lang';
import { Redirect, useModel } from 'umi';
import OrderEmpty from './components/OrderEmpty';
import { Pagination } from 'antd';
const initQuery = { current: 1, size: 10 };
function Orders() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState(initQuery);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
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
        if (Array.isArray(data)) {
          setFilteredData(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);
  if (!isLessee) return <Redirect to="/genesis/dashboard"></Redirect>;
  return (
    <main className={styles['orders-component']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Orders</h1>
        </header>
      </section>
      {!isEmpty(orders) && (
        <>
          <div className={styles['orders']}>
            {paginatedData?.map((order, index) => (
              <OrderCard key={index} order={order} />
            ))}
          </div>

          <div className={styles['pagination-wrapper']}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredData.length}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
              showLessItems
            />
          </div>
        </>
      )}
      {isEmpty(orders) && <OrderEmpty />}
    </main>
  );
}

Orders.wrappers = ['@/wrappers/auth'];
export default Orders;
