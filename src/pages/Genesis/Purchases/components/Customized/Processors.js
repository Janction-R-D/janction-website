import { useEffect, useMemo, useState } from 'react';
import { Card, Checkbox } from 'antd';
import styles from './index.less';
import { PROCESSOR } from './constant';
import { CPU_GPU_OPTIONS } from '@/constant';
import { fetchNodeProcessers } from '@/services/genesis';
import { isEmpty } from 'lodash';
const proccess = [
  {
    name: 'GeForce RTX 4090',
    quantity: '245',
    brand: 'nvidia',
    color: 'green',
    value: 'RTX 4090',
  },
  {
    name: 'GeForce RTX 4090',
    quantity: '245',
    brand: 'nvidia',
    color: 'green',
    value: 'RTX 4080',
  },
  {
    name: 'GeForce RTX 4090',
    quantity: '245',
    brand: 'nvidia',
    color: 'green',
    value: 'RTX 4070',
  },
];
export function Processors(props) {
  const { onChange, formValues, value } = props;
  const [activeValue, setActiveValue] = useState(
    formValues?.processor_model || proccess[0]?.value,
  );

  const [data, setData] = useState();
  const [cpu_gpu, setCpuGpu] = useState(CPU_GPU_OPTIONS[0].value);
  const [brand, setBrand] = useState(PROCESSOR[0].value);
  const [selectKey, setSelectKey] = useState();
  const [keyword, setKeyword] = useState();
  useEffect(() => {
    setSelectKey(value);
  }, [value]);
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

  const list = useMemo(() => {
    if (isEmpty(data)) return [];
    let _list = data[cpu_gpu];
    _list = _list.filter((item) => {
      let _keyword =
        !keyword || item.name.toLowerCase().includes(keyword.toLowerCase());
      let _brand = !brand || item.brand.toLowerCase() == brand;
      return _keyword && _brand;
    });
    console.log(_list);
    return _list;
  }, [data, brand, cpu_gpu, keyword]);
  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange(newValue);
    }
  };
  return (
    <section className={styles['models-conf-cards']}>
      {list.map((item, index) => (
        <Card
          key={index}
          className={[
            styles['item'],
            value?.name === item.name && styles['active-item'],
          ].join(' ')}
          onClick={() => handleCheckboxChange(item)}
        >
          <div className={styles['content']}>
            <div
              className={[styles['item-content'], styles[`${item.color}`]].join(
                ' ',
              )}
            >
              <i className={`iconfont icon-${item.brand} `} />
              <p className={styles['description']}>{item.name}</p>
            </div>
            <Checkbox
              className={styles['rounded-check']}
              checked={value?.name === item.name}
              onChange={() => handleCheckboxChange(item)}
            />
          </div>
        </Card>
      ))}
    </section>
  );
}
