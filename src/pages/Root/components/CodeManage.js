import JanctionModal from '@/components/JanctionModal';
import JanctionTable from '@/components/JanctionTable';
import {
  renderTableActionBar,
  renderTableColumns,
} from '@/components/JanctionTable/column';
// import { fetchInviterCodeList, fetchInviterEnable } from '@/services/root';
import { message, Switch } from 'antd';
import { useEffect, useState } from 'react';
import LabelValue from './LabelValue';

const CodeManage = (props) => {
  const { visible, onCancel, record } = props;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      setLoading(true);
      const res = await fetchInviterCodeList();
      setList(res || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('『err』', err);
    }
  };

  const onEnableSwitch = async (checked) => {
    try {
      await fetchInviterEnable();
      message.success('updated!');
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const columns = [
    renderTableColumns('Referrer Address', ''),
    renderTableColumns('Generated Time', ''),
    renderTableColumns('Invite Code', ''),
    renderTableColumns('Invite Link', ''),
    renderTableActionBar([
      {
        render: (rowData) => {
          return (
            <>
              <Switch checked={!rowData.disabled} onChange={onEnableSwitch} />
              <span>{rowData.disabled ? 'Disable' : 'Enable'}</span>
            </>
          );
        },
      },
    ]),
  ];

  return (
    <JanctionModal
      open={visible}
      title="Invitation code management"
      centered
      width={900}
      onCancel={onCancel}
      footerCenter
    >
      <div className="df fd_c" style={{ gap: '16px', marginBottom: '32px' }}>
        <LabelValue title="Inviter Address:" value="0x1231234563456xxx" />
        <LabelValue
          title="Inviter Name:"
          value="dsb-bbsdsb-bbsdsb-bbsdsb-bbsdsb"
        />
      </div>
      <JanctionTable
        loading={loading}
        dataSource={list}
        columns={columns}
        pagination={false}
      />
    </JanctionModal>
  );
};

export default CodeManage;
