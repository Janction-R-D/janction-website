import JanctionModal from '@/components/JanctionModal';
import JanctionTable from '@/components/JanctionTable';
import { fetchInviterList } from '@/services/root';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import LabelValue from './LabelValue';
import styles from './index.less';
import { fetchInviters, fetchInvitersUpdate } from '@/services/genesis';
import ModifyModal from './ModifyModal';

const InviterTable = (props) => {
  const { root, record, level = 2 } = props;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeRowData, setActiveRowData] = useState();
  const [visible, setVisible] = useState(false);

  // 初始化加载第一级数据
  useEffect(() => {
    if (!record?.inviter_address) return;
    getList({ inviter: record?.inviter_address });
  }, [record]);
  // 获取数据的函数
  const getList = async (params) => {
    try {
      setLoading(true);
      const api = root ? fetchInviterList : fetchInviters;
      const res = await api(params); // 替换为你的实际请求方法
      setList(res?.items || []);
      console.log(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setList([]);
      console.error('『error』', error);
    }
  };

  const onUpdate = () => {
    getList();
    props.onUpdate && props.onUpdate();
  };

  const onLevelSetting = (rowData) => {
    setActiveRowData({
      ...rowData,
      title: 'level',
      key: 'new_level',
      type: 'number',
      min: 2,
      max: 6,
      value: rowData.level,
    });
    setVisible(true);
  };

  const onOk = async (value) => {
    try {
      await fetchInvitersUpdate({
        user: activeRowData.inviter_address,
        ...value,
      });
      message.success('update success!');
      onUpdate();
    } catch (err) {
      message.error('update failed!');
      throw Error(err);
    }
  };

  const columns = [
    {
      title: 'Invited User Address',
      dataIndex: 'inviter_address',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      render: (text) => `level${text}`,
    },
    {
      title: 'Purchase Time',
      dataIndex: 'purchased_time',
      width: 180,
      fixed: 'right',
      render: (text) => text || '~',
    },
    {
      title: 'Purchase Quantity',
      dataIndex: 'purchased_quantity',
      width: 180,
      fixed: 'right',
    },
    {
      title: 'Invitees Number',
      dataIndex: 'invites_number',
      width: 180,
      fixed: 'right',
    },

    {
      title: 'Cumulative Rewards',
      dataIndex: 'rewards_cumulative',
      width: 180,
      fixed: 'right',
    },
    {
      title: 'Higher-level',
      dataIndex: 'higher_level',
      width: 180,
      fixed: 'right',
    },
    {
      title: 'Operation',
      dataIndex: 'higher_level',
      hide: root,
      render: (text, rowData) => (
        <a onClick={() => onLevelSetting(rowData)}>setting</a>
      ),
      width: 100,
      fixed: 'right',
    },
  ];

  return (
    <>
      <JanctionTable
        dataSource={list}
        columns={columns.filter((item) => !item.hide)}
        rowKey="inviter_address" // 使用唯一标识字段
        pagination={false}
        className={styles['inviter-table']}
        showHeader={level == 2}
        expandable={{
          expandedRowRender: (rowData) => (
            <InviterTable
              root={root}
              record={rowData}
              level={level + 1}
              omitFirst={false}
              onUpdate={onUpdate}
            />
          ),
          expandIcon: customExpandIcon,
        }}
        loading={loading} // 控制加载状态
      />
      {visible && (
        <ModifyModal
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setActiveRowData();
          }}
          onOk={onOk}
          record={activeRowData}
        />
      )}
    </>
  );
};

const InvitedUser = (props) => {
  const { visible, onCancel, record, root = true } = props;

  return (
    <JanctionModal
      open={visible}
      title="Invited user"
      centered
      width="80vw"
      onCancel={onCancel}
      footerCenter
    >
      {root && (
        <div className="df fd_c" style={{ gap: '16px', marginBottom: '32px' }}>
          <LabelValue
            title="Inviter Address:"
            value={record?.inviter_address}
          />
          <LabelValue title="Inviter Name:" value={record?.inviter_name} />
        </div>
      )}
      <InviterTable record={record} omitFirst={true} root={root} />
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
export default InvitedUser;
