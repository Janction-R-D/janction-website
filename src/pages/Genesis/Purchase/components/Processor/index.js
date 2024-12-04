import JanctionRadio from '@/components/JanctionRadio';
import styles from './index.less';
import { PROCESSOR } from './constant';
import { CPU_GPU_OPTIONS } from '@/constant';
import SearchInput from '@/components/SeachInput';
import JanctionTable from '@/components/JanctionTable';
import { useEffect, useMemo, useState } from 'react';
import { fetchNodeProcessers } from '@/services/genesis';
import { isEmpty } from '@/utils/lang';

const Processor = (props) => {
  const { value, onChange } = props;
  const [data, setData] = useState();
  const [cpu_gpu, setCpuGpu] = useState(CPU_GPU_OPTIONS[0].value);
  const [type, setType] = useState(PROCESSOR[0].value);
  const [selectKey, setSelectKey] = useState();
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetchNodeProcessers();
      setData(res);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  useEffect(() => {
    setSelectKey(value?.id);
  }, [value]);

  const list = useMemo(() => {
    if (isEmpty(data)) return [];
    let _list = data[cpu_gpu];
    if (keyword) {
      _list = _list.filter((item) =>
        item.toLowerCase().includes(keyword.toLowerCase()),
      );
    }
    return _list;
  }, [data, type, cpu_gpu, keyword]);

  return (
    <div className={styles['processor-container']}>
      <div className={styles['radio']}>
        <JanctionRadio
          value={type}
          onChange={(val) => setType(val)}
          options={PROCESSOR}
        />
        <JanctionRadio
          value={cpu_gpu}
          onChange={(val) => setCpuGpu(val)}
          options={CPU_GPU_OPTIONS}
        />
      </div>
      <SearchInput onChange={(e) => setKeyword(e.target.value)} />
      <JanctionTable
        showHeader={false}
        dataSource={list}
        pagination={false}
        columns={[
          {
            title: 'name',
            dataIndex: 'name',
            render: (text, record) => {
              return record;
            },
          },
        ]}
        rowKey={(record) => record}
        rowSelection={{
          selectedRowKeys: [selectKey],
          onChange: (selectedRowKeys, selectedRows) => {
            onChange(selectedRows[0]);
          },
        }}
      />
    </div>
  );
};

export default Processor;
