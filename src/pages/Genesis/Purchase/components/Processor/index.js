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
  const [brand, setBrand] = useState(PROCESSOR[0].value);
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
    setSelectKey(value);
  }, [value]);

  const list = useMemo(() => {
    if (isEmpty(data)) return [];
    let _list = data[cpu_gpu];
    _list = _list.filter((item) => {
      let _keyword =
        !keyword || item.name.toLowerCase().includes(keyword.toLowerCase());
      let _brand = !brand || item.brand.toLowerCase() == brand;
      return _keyword && _brand;
    });
    return _list;
  }, [data, brand, cpu_gpu, keyword]);

  return (
    <div className={styles['processor-container']}>
      <div className={styles['radio']}>
        <JanctionRadio
          value={brand}
          onChange={(val) => setBrand(val)}
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
              return text;
            },
          },
        ]}
        rowKey="name"
        rowSelection={{
          selectedRowKeys: selectKey,
          onChange: (selectedRowKeys) => {
            setSelectKey(selectedRowKeys);
            onChange(selectedRowKeys);
          },
        }}
      />
    </div>
  );
};

export default Processor;
