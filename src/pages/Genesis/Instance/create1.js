import JanctionTable from '@/components/JanctionTable';
import { fetchNodesList } from '@/services/genesis';
import { calculateDuration } from '@/utils/datetime';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getNodeStatusMatch } from '../Nodes/components/extra';
import styles from './index.less';
import PayModal from './InstanceComponents/PayModal';

const Create = (props) => {
  const [list, setList] = useState([]);
  const [activeNode, setActiveNode] = useState();
  const [payVisible, setPayVisible] = useState(false);

  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      const res = await fetchNodesList();
      setList(
        (res || []).filter((node) => {
          const { isListed } = getNodeStatusMatch(node);
          return isListed;
        }),
      );
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const onNodeSelect = async (node) => {
    setActiveNode(node);
    setPayVisible(true);
  };

  const columns = [
    {
      title: 'Device ID',
      dataIndex: 'id',
      key: 'deviceId',
      width: 'auto',
      ellipsis: true,
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
      title: 'Operation',
      key: 'action',
      width: 'auto',
      fixed: 'right',
      render: (error, record) => {
        return <a onClick={() => onNodeSelect(record)}>select</a>;
      },
    },
  ];

  return (
    <div className={styles['create-wrapper']}>
      <h1 className={styles['text__title']}>Node List</h1>
      <JanctionTable
        className={styles['table']}
        columns={columns}
        dataSource={list}
        pagination={false}
        emptyDescription={<p>No nodes are currently running.</p>}
      />
      {payVisible && (
        <PayModal
          visible={payVisible}
          node={activeNode}
          onCancel={() => {
            setPayVisible(false);
          }}
          onSuccess={getList}
        />
      )}
    </div>
  );
};

export default Create;
