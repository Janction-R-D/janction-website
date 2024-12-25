import JanctionModal from '@/components/JanctionModal';
import JanctionTable from '@/components/JanctionTable';
import { fetchInviterList } from '@/services/root';
import { useEffect, useState } from 'react';
import LabelValue from './LabelValue';
import styles from './index.less';
import { copy } from '@/utils/lang';

const InviterTable = (props) => {
  const { record, level = 2 } = props;

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
      console.log(res);
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
      render: (text) => <Address text={text} />,
    },
    {
      title: 'Quantity Purchased',
      dataIndex: 'purchased_quantity',
    },
    {
      title: 'Purchase Time',
      dataIndex: 'purchase time',
      render: (text) => text || '~',
    },
    {
      title: 'Cumulative Rewards',
      dataIndex: 'rewards_cumulative',
    },
    {
      title: 'Inviters number',
      dataIndex: 'invites_number',
    },
    {
      title: 'Higher-level',
      dataIndex: 'Higher-level',
      render: (text) => text || '~',
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
        expandIcon: customExpandIcon,
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
      width={1200}
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
const customExpandIcon = (props) => {
  if (props.expanded) {
    return (
      <i
        className="iconfont icon-up"
        onClick={(e) => {
          props.onExpand(props.record, e);
        }}
      ></i>
    );
  } else {
    return (
      <i
        className="iconfont icon-icon-down"
        onClick={(e) => {
          props.onExpand(props.record, e);
        }}
      ></i>
    );
  }
};
const Address = ({ text }) => {
  const handleClick = () => {
    copy(text);
  };
  return (
    <div className="address">
      <p>{text}</p>
      <i className="iconfont icon-copy" onClick={handleClick}></i>
    </div>
  );
};
export default InvitedUser;
