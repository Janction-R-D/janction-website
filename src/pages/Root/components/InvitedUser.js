import { FormInput, FormInputNumber } from '@/components/JanctionInput';
import JanctionModal from '@/components/JanctionModal';
import { useState } from 'react';
import LabelValue from './LabelValue';
import JanctionTable from '@/components/JanctionTable';

const InvitedUser = (props) => {
  const { visible, onCancel, record } = props;

  const [value, setValue] = useState(record?.value);
  const [data, setData] = useState([]);

  const Com = record?.type == 'number' ? FormInputNumber : FormInput;

  const onOk = () => {
    console.log('『value』', value);
  };

  const columns = [
    {
      title: 'Primary inviter',
      dataIndex: 'name',
    },
    {
      title: 'Number of guests',
      dataIndex: 'guestsNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
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
        <LabelValue title="Inviter Address：" value="0x1231234563456xxx" />
        <LabelValue
          title="Inviter Name："
          value="dsb-bbsdsb-bbsdsb-bbsdsb-bbsdsb"
        />
      </div>
      <JanctionTable dataSource={data} columns={columns} pagination={false} />
    </JanctionModal>
  );
};

export default InvitedUser;
