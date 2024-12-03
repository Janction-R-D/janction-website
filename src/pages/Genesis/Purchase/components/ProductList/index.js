import JanctionTable from '@/components/JanctionTable';
import { fetchNodesList } from '@/services/genesis';
import { calculateDuration } from '@/utils/datetime';
import { getNodeStatusMatch } from '@/utils/lang';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import PurchaseSubCard from '../Card/SubCard';

const ProductList = (props) => {
  const { value, onChange } = props;
  const [list, setList] = useState([]);
  const [selectKey, setSelectKey] = useState();

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

  useEffect(() => {
    setSelectKey(value?.id);
  }, [value]);

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
  ];

  return (
    <PurchaseSubCard>
      <JanctionTable
        bordered={false}
        columns={columns}
        dataSource={list}
        pagination={false}
        rowKey="id"
        rowSelection={{
          selectedRowKeys: [selectKey],
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectKey(selectedRowKeys[0]);
            onChange(selectedRows[0]);
          },
        }}
      />
    </PurchaseSubCard>
  );
};

export default ProductList;
