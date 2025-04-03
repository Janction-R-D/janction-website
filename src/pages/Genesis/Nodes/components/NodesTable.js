import JanctionTable from '@/components/JanctionTable';
import JanctionTip from '@/components/JanctionTip';
import { history } from 'umi';
import OperationDelis from './Operation';
import styles from './table.less';
import dayjs from 'dayjs';
import { empty } from '@/utils/lang';
import { calculateDuration } from '@/utils/datetime';
import { getNodeStatusMatch } from './extra';

function NodesTable({ data, getList }) {
  const columns = [
    {
      title: 'Device ID',
      dataIndex: 'id',
      key: 'deviceId',
      width: 320,
      ellipsis: 'true',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status_str',
      width: 'auto',
      render: (text, record) => {
        const { isRunning, isActive, isListed } = getNodeStatusMatch(record);
        if (isListed) {
          return (
            <div className="status ">
              <p>listed</p>
              <JanctionTip
                placement="topLeft"
                title="Your node has completed the pending order and is waiting for customers to purchase."
              />
            </div>
          );
        }
        if (isActive) {
          return (
            <div className="status  status-active">
              <p>active</p>
              <JanctionTip
                placement="topLeft"
                title="Your node has been purchased by others and will continue to generate income."
              />
            </div>
          );
        }
        if (isRunning)
          return (
            <div className="status status-running ">
              <span>running</span>
              <JanctionTip
                placement="topLeft"
                title='Your node has not yet completed the pending order. To avoid unnecessary waste, please complete it as soon as possible."'
              />
            </div>
          );
        return <div>offline</div>;
      },
    },
    {
      title: 'CHIP/GPUS',
      dataIndex: 'chipGpu',
      key: 'chipGpu',
      ellipsis: true,
      width: 'auto',
      render: (text, record) => {
        if (!record.gpu_chip && !record.cpu_chip) return '--';
        return `${record.gpu_chip || ''} ${record.cpu_chip || ''}`;
      },
    },
    {
      title: (
        <div>
          <p>Node running time</p>
          <p>UP FOR </p>
        </div>
      ),
      dataIndex: 'last_start_at',
      width: 'auto',
      render: (text) => {
        if (!text) return '--';
        return calculateDuration(text, { showSeconds: false });
      },
    },

    {
      title: 'list time',
      dataIndex: 'last_config_at',
      width: 'auto',
      key: 'time',
      render: (text) => {
        if (!text) return '--';
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: 'rewarded',
      key: 'rewarded',
      dataIndex: 'rewarded',
      width: 'auto',
      render: (text) => {
        if (empty(text)) return '--';
        return `${text} veJCT`;
      },
    },

    {
      title: 'Operation',
      key: 'action',
      width: 'auto',
      fixed: 'right',
      render: (error, record) => {
        return (
          <OperationDelis error={error} record={record} getList={getList} />
        );
      },
    },
  ];

  return (
    <>
      <JanctionTable
        className={styles['table']}
        columns={columns}
        dataSource={data}
        // pagination={false}
        pagination={{ pageSize: 8 }}
        scroll={{ x: 'auto' }}
        emptyDescription={
          <p>
            No nodes are currently running. Click{' '}
            <a onClick={() => history.push('/genesis/deployNode')}>
              deploy node
            </a>{' '}
            to connect to your node and place an order.
          </p>
        }
      />
    </>
  );
}

export default NodesTable;
