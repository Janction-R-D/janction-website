import JanctionTable from '@/components/JanctionTable';
import contract from '@/utils/contracts';
import { convertKB, showValue } from '@/utils/lang';
import { message, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Redirect, useModel } from 'umi';
import {
  fetchMarketOrders,
  fetchStopRentParams,
} from '@/services/genesis/instance';
import styles from './components/orders.less';

const initQuery = {
  page: 1,
  page_size: 10,
};

function Orders() {
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState(initQuery);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);
  const getList = async (params = {}) => {
    const payload = {
      ...query,
      ...params,
    };
    try {
      setLoading(true);
      const { data = [], total } = await fetchMarketOrders(payload);
      setOrders(
        data.map((item) => ({
          order_id: item.order?.ID,
          ...item,
        })),
      );
      setQuery(payload);
      setTotal(total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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

  const columns = [
    {
      title: 'Node ID',
      dataIndex: 'node_id',
      render: (_, record) => showValue(record?.resource?.node_id),
    },
    {
      title: 'Operating System',
      dataIndex: 'operating_system',
      render: (_, record) => {
        const { attr } = record?.resource?.node || {};
        return (
          <div className="df ai_c gap10" title={attr?.operating_system_str}>
            {attr?.operating_system_str && (
              <div className={styles['card-product-img-container']}>
                <i
                  className={`iconfont icon-${attr?.operating_system_str}`}
                ></i>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: 'Architechture',
      dataIndex: 'architechture_str',
      render: (_, record) => {
        const { attr } = record?.resource?.node || {};
        return (
          <div className={styles['card-product-price']}>
            <span className={styles['card-product-price-text']}>
              {showValue(attr?.architechture_str)}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Cpu',
      dataIndex: 'cpu',
      render: (_, record) => {
        const { attr } = record?.resource?.node || {};
        return showValue(attr?.cpu);
      },
    },
    {
      title: 'Location',
      dataIndex: 'location',
      render: (_, record) => {
        const { attr } = record?.resource?.node || {};
        return showValue(attr?.location);
      },
    },
    {
      title: 'Memory',
      dataIndex: 'memory',
      render: (_, record) => {
        const { attr } = record?.resource?.node || {};
        return convertKB(attr?.memory);
      },
    },
    {
      title: 'Network Down',
      dataIndex: 'network_down',
      render: (_, record) => {
        const { attr } = record?.resource?.node || {};
        return showValue(attr?.network_down);
      },
    },
    {
      title: 'Network Up',
      dataIndex: 'network_up',
      render: (_, record) => {
        const { attr } = record?.resource?.node || {};
        return showValue(attr?.network_up);
      },
    },
    {
      title: 'Expired',
      dataIndex: 'expired',
      render: (_, record) => {
        const { expired_at } = record?.resource || {};
        return expired_at ? dayjs(expired_at).format('YYYY-MM-DD') : '~';
      },
    },
    {
      title: 'Price',
      fixed: 'right',
      dataIndex: 'price',
      render: (_, record) => {
        const { price } = record?.resource || {};
        return price ? `${price} veJCT` : '~';
      },
    },
    {
      title: <div className="operation">Operation</div>,
      dataIndex: 'operation',
      render: (_, record) => {
        const { order, resource } = record || {};
        const { status_str } = resource?.node || {};
        if (order?.refunded) return <span>Refunded</span>;
        if (status_str !== 'offline' || order?.refunded) return;
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
      <h1>Orders</h1>
      <JanctionTable
        rowkey="order_id"
        columns={columns}
        dataSource={orders}
        loading={loading}
        pagination={{
          total,
          pageSize: query.page_size,
          current: query.page,
          onChange: (page) => {
            getList({ page });
          },
        }}
      />
    </main>
  );
}

Orders.wrappers = ['@/wrappers/auth'];
export default Orders;
