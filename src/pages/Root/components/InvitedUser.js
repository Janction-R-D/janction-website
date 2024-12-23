import JanctionModal from '@/components/JanctionModal';
import JanctionTable from '@/components/JanctionTable';
import { fetchInviterList } from '@/services/root';
import { useEffect, useState } from 'react';
import LabelValue from './LabelValue';
import styles from './index.less';

const InviterTable = (props) => {
  const { record, level = 1 } = props;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 初始化加载第一级数据
  useEffect(() => {
    if (!record?.inviter_address) return;
    getList({ inviter: record?.inviter_address });
  }, [record]);
  // 获取数据的函数
  const getList = async (params) => {
    try {
      setLoading(true);
      const res = await fetchInviterList(params); // 替换为你的实际请求方法
      setList(res?.items || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setList([]);
      console.error('『error』', error);
    }
  };

  const columns = [
    {
      title: 'Invited Level',
      dataIndex: 'invites_number',
      render: () => `level${level}`,
    },
    {
      title: 'Invited User Address',
      dataIndex: 'inviter_address',
    },
    {
      title: 'Quantity Purchased',
      dataIndex: 'purchased_quantity',
    },
    {
      title: 'Cumulative Rewards',
      dataIndex: 'rewards_cumulative',
    },
  ];

  return (
    <JanctionTable
      dataSource={list}
      columns={columns}
      rowKey="inviter_address" // 使用唯一标识字段
      pagination={false}
      className={styles['inviter-table']}
      expandable={{
        expandedRowRender: (rowData) => (
          <InviterTable record={rowData} level={level + 1} />
        ),
      }}
      loading={loading} // 控制加载状态
    />
  );
};

const InvitedUser = (props) => {
  const { visible, onCancel, record } = props;

  return (
    <JanctionModal
      open={visible}
      title="Invited user"
      centered
      width={900}
      onCancel={onCancel}
      footerCenter
    >
      <div className="df fd_c" style={{ gap: '16px', marginBottom: '32px' }}>
        <LabelValue title="Inviter Address:" value={record?.inviter_address} />
        <LabelValue title="Inviter Name:" value={record?.inviter_name} />
      </div>
      <InviterTable record={record} />
    </JanctionModal>
  );
};

export default InvitedUser;
