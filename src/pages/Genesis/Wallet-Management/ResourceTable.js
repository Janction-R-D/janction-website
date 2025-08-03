import { useIntl } from 'umi';
import JanctionTable from '@/components/JanctionTable';
import styles from './resources.less';
import useData from './Hook/useData';

function ResourceTable({ data }) {
  const intl = useIntl();
  const { list } = useData() || {};

  const columns = [
    {
      title: (
        <div className="name">
          {intl.formatMessage({ id: 'resource.date' })}
        </div>
      ),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: (
        <div className="name">
          {intl.formatMessage({ id: 'resource.type' })}
        </div>
      ),
      dataIndex: 'type',
      key: 'type',
      ellipsis: true,
    },
    {
      title: (
        <div className="quantity">
          {intl.formatMessage({ id: 'resource.quantity' })}
        </div>
      ),
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: (
        <div className="curency">
          {intl.formatMessage({ id: 'resource.currency' })}
        </div>
      ),
      dataIndex: 'curency',
      key: 'curency',
    },
    {
      title: intl.formatMessage({ id: 'resource.status' }),
      key: 'status',
      dataIndex: 'status',
      render: (text) => (
        <>
          {text.toLowerCase() === 'success' ? (
            <div className="status status-running">
              <i className="iconfont icon-check"></i>{' '}
              {intl.formatMessage({ id: 'resource.status.success' })}
            </div>
          ) : (
            <div className="status status-stopped">
              <i className="iconfont icon-play_pause"></i>{' '}
              {intl.formatMessage({ id: 'resource.status.fail' })}
            </div>
          )}
        </>
      ),
    },
  ];

  const mappedOrders = list?.map((resource) => ({
    key: resource?.key,
    date: resource?.date,
    node: resource?.node,
    type: resource?.type,
    status: resource?.status,
    curency: resource?.curency,
    quantity: resource?.quantity,
  }));

  return (
    <>
      <JanctionTable
        className={styles['table']}
        columns={columns}
        dataSource={mappedOrders}
        emptyDescription={<p>{intl.formatMessage({ id: 'resource.empty' })}</p>}
        pagination={{
          pageSize: 5,
          position: ['bottomCenter'],
        }}
        scroll={{ x: 'auto' }}
      />
    </>
  );
}

export default ResourceTable;
