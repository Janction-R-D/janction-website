import { useEffect, useState, useMemo } from 'react';
import OrderCard from './components/OrderCard';
import styles from './components/orders.less';
import { fetchMarketOrders } from '../../../services/genesis/instance';
import { isEmpty } from '@/utils/lang';
import { Redirect, useModel } from 'umi';
import OrderEmpty from './components/OrderEmpty';
import { Pagination } from 'antd';
import { useChainId } from 'wagmi';
import { useEthersSigner } from '@/hooks/useEthersSigner';

const initQuery = { current: 1, size: 10 };
function Orders() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState(initQuery);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const payload = {
      page: 1,
      page_size: 25,
    };
    fetchMarketOrders(payload)
      .then((res) => {
        const { data } = res || {};
        if (Array.isArray(data)) {
          setOrders([...data].reverse());
        }
        if (Array.isArray(data)) {
          setFilteredData(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData?.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);
  if (!isLessee) return <Redirect to="/genesis/dashboard"></Redirect>;

  const handleStop = async (record) => {
    try {
      const { signature, payment_id } = await fetchStopRentParams({
        resource_id: record.id,
      });
      const signatures = [`0x${signature}`];
      // await getOrderInfo();
      if (!payment_id) return;
      await contract.stopRent(payment_id, signatures);
      message.success('Success');
      getList();
    } catch (error) {
      message.warning('Operation failed, please try again later!');
      console.log('『error』', error);
    }
  };

  // const columns = [
  //   {
  //     title: 'Node ID',
  //     dataIndex: 'node_id',
  //     render: (_, record) => showValue(record?.resource?.node_id),
  //   },
  //   {
  //     title: 'Operating System',
  //     dataIndex: 'operating_system',
  //     render: (_, record) => {
  //       const { attr } = record?.resource?.node || {};
  //       return (
  //         <div className="df ai_c gap10" title={attr?.operating_system_str}>
  //           {attr?.operating_system_str && (
  //             <div className={styles['card-product-img-container']}>
  //               <i
  //                 className={`iconfont icon-${attr?.operating_system_str}`}
  //               ></i>
  //             </div>
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     title: 'Architechture',
  //     dataIndex: 'architechture_str',
  //     render: (_, record) => {
  //       const { attr } = record?.resource?.node || {};
  //       return (
  //         <div className={styles['card-product-price']}>
  //           <span className={styles['card-product-price-text']}>
  //             {showValue(attr?.architechture_str)}
  //           </span>
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     title: 'Cpu',
  //     dataIndex: 'cpu',
  //     render: (_, record) => {
  //       const { attr } = record?.resource?.node || {};
  //       return showValue(attr?.cpu);
  //     },
  //   },
  //   {
  //     title: 'Location',
  //     dataIndex: 'location',
  //     render: (_, record) => {
  //       const { attr } = record?.resource?.node || {};
  //       return showValue(attr?.location);
  //     },
  //   },
  //   {
  //     title: 'Memory',
  //     dataIndex: 'memory',
  //     render: (_, record) => {
  //       const { attr } = record?.resource?.node || {};
  //       return convertKB(attr?.memory);
  //     },
  //   },
  //   {
  //     title: 'Network Down',
  //     dataIndex: 'network_down',
  //     render: (_, record) => {
  //       const { attr } = record?.resource?.node || {};
  //       return showValue(attr?.network_down);
  //     },
  //   },
  //   {
  //     title: 'Network Up',
  //     dataIndex: 'network_up',
  //     render: (_, record) => {
  //       const { attr } = record?.resource?.node || {};
  //       return showValue(attr?.network_up);
  //     },
  //   },
  //   {
  //     title: 'Expired',
  //     dataIndex: 'expired',
  //     render: (_, record) => {
  //       const { expired_at } = record?.resource || {};
  //       return expired_at ? dayjs(expired_at).format('YYYY-MM-DD') : '~';
  //     },
  //   },
  //   {
  //     title: 'Price',
  //     fixed: 'right',
  //     dataIndex: 'price',
  //     render: (_, record) => {
  //       const { price } = record?.resource || {};
  //       return price ? `${price} veJCT` : '~';
  //     },
  //   },
  //   {
  //     title: <div className="operation">Operation</div>,
  //     dataIndex: 'operation',
  //     render: (_, record) => {
  //       const { order, resource } = record || {};
  //       const { status_str } = resource?.node || {};
  //       if (order?.refunded) return <span>Refunded</span>;
  //       if (status_str !== 'offline' || order?.refunded) return;
  //       return (
  //         <Popconfirm
  //           title="Are you sure to stop this order?"
  //           onConfirm={() => handleStop(resource)}
  //         >
  //           <a>Stop</a>
  //         </Popconfirm>
  //       );
  //     },
  //   },
  // ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'User',
      dataIndex: 'user_id',
      key: 'user_id',
      ellipsis: true,
    },
    {
      title: 'Resource',
      dataIndex: 'resource_id',
      key: 'resource_id',
      ellipsis: true,
    },
    {
      title: 'Quantity',
      dataIndex: 'purchase_instance_quantity',
      key: 'purchase_instance_quantity',
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (_, record) =>
        `${record.purchase_duration} ${record.purchase_duration_unit}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        if (!text) return '--';
        const color =
          text === 'pending'
            ? 'orange'
            : text === 'completed'
            ? 'green'
            : 'red';
        return <Tag color={color}>{text?.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Payment Tx',
      dataIndex: 'payment_tx_hash',
      key: 'payment_tx_hash',
      ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      ellipsis: true,
      render: (text) => {
        if (!text?.price_in_currency) return '--';
        return `${text?.price_in_currency} USDT`;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => formatISODate(text),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text) => formatISODate(text),
    },
    {
      title: <div className="operation">Operation</div>,
      dataIndex: 'operation',
      render: (_, record) => {
        const { resource } = record || {};
        const { status_str } = resource?.node || {};
        if (record?.refunded) return <span>Refunded</span>;
        if (status_str !== 'offline' || record?.refunded) return '--';
        return (
          <Popconfirm
            title="Are you sure to stop this order?"
            onConfirm={() => handleStop(resource)}
          >
            <a>Stop</a>
          </Popconfirm>
        );
      },
    },
  ];

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
              total={filteredData?.length}
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
