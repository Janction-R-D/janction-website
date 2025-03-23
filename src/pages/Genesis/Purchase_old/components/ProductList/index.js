import JanctionTable from '@/components/JanctionTable';
import { fetchNodesList } from '@/services/genesis';
import { calculateDuration } from '@/utils/datetime';
import { getNodeStatusMatch, isEmpty } from '@/utils/lang';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import PurchaseSubCard from '../Card/SubCard';

function hasIntersection(arr1, arr2) {
  const set1 = new Set(arr1);
  for (const item of arr2) {
    if (set1.has(item)) {
      return true;
    }
  }
  return false;
}

const ProductList = (props) => {
  const { value, onChange, formValues } = props;
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

  const dataSource = useMemo(() => {
    if (isEmpty(list)) return [];
    if (isEmpty(formValues)) return list;
    const {
      operating_system_str,
      architechture_str,
      internet_type,
      network_down,
      location,
      processor,
    } = formValues;
    let _list = [...list];
    _list = _list.filter((item) => {
      let sys =
        !operating_system_str ||
        item.attr?.operating_system_str == operating_system_str;
      let arch =
        !architechture_str || item.attr?.architechture_str == architechture_str;
      let internet =
        !internet_type || item.attr?.internet_type == internet_type;
      let network = !network_down || item.attr?.network_down >= network_down;
      let _location =
        !location ||
        location.length == 0 ||
        location.includes(item.attr?.location);
      const chip = [
        ...(item?.attr?.cpu_chip || []),
        ...(item?.attr?.gpu_chip || []),
      ];
      let _processor =
        !(!isEmpty(processor) && !isEmpty(chip)) ||
        hasIntersection(processor, chip);
      const flag =
        sys && arch && internet && network && _location && _processor;
      console.log('『flag』', flag);

      return flag;
    });
    return _list;
  }, [list, formValues]);

  useEffect(() => {
    if (value?.id !== selectKey) {
      setSelectKey([value?.id]); // Solo actualiza si es necesario
    }
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
      ellipsis: 'true',
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
      ellipsis: 'true',
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
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
        scroll={{ x: 'auto' }}
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
