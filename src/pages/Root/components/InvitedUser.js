import JanctionModal from '@/components/JanctionModal';
import JanctionTable from '@/components/JanctionTable';
import { fetchInviterList } from '@/services/root';
import { useEffect, useState } from 'react';
import LabelValue from './LabelValue';

const InvitedUser = (props) => {
  const { visible, onCancel, record } = props;

  const [list, setList] = useState([]);

  useEffect(() => {
    if (!record?.inviter_address) return;
    getList();
  }, [record]);
  const getList = async () => {
    try {
      const res = await fetchInviterList({ inviter: record?.inviter_address });
      setList(res.items || []);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const columns = [
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
      <JanctionTable dataSource={list} columns={columns} pagination={false} />
    </JanctionModal>
  );
};

export default InvitedUser;
