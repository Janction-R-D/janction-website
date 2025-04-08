import { useEffect, useMemo, useState } from 'react';
import { Card, Checkbox, Empty } from 'antd';
import styles from './index.less';
import { PROCESSOR } from './constant';
import { CPU_GPU_OPTIONS } from '@/constant';
import { fetchNodeProcessers } from '@/services/genesis';
import { isEmpty } from 'lodash';

export function Processors(props) {
  const { onChange, formValues, value = [], current } = props;
  const [activeValue, setActiveValue] = useState(formValues?.processor_model);

  const [data, setData] = useState();
  const [cpu_gpu, setCpuGpu] = useState(CPU_GPU_OPTIONS[0].value);
  const [brand, setBrand] = useState([PROCESSOR[0].value]);
  const [selectKey, setSelectKey] = useState();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (current !== 4) return;
    setCpuGpu(formValues?.gpu);
    setBrand(formValues?.processor);
    fetchData();
  }, [formValues]);
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
    console.log(data[cpu_gpu], cpu_gpu);
    _list = _list?.filter((item) => {
      let _keyword =
        !keyword || item.name.toLowerCase().includes(keyword.toLowerCase());
      let _brand =
        !brand ||
        brand.some((b) => b.toLowerCase() === item.brand.toLowerCase());
      return _keyword && _brand;
    });
    return _list;
  }, [data, brand, cpu_gpu, keyword]);

  const handleCheckboxChange = (checked, newValue) => {
    let newValues = checked
      ? [...value, newValue]
      : value.filter((item) => item !== newValue);
    onChange(newValues);
  };

  return (
    <section className={styles['models-conf-cards']}>
      {list?.length >= 1 ? (
        list?.map((item, index) => (
          <Card
            key={index}
            className={[
              styles['item'],
              value?.name === item.name && styles['active-item'],
            ].join(' ')}
            onClick={() =>
              handleCheckboxChange(!value.includes(item.name), item.name)
            }
          >
            <div className={styles['content']}>
              <div
                className={[
                  styles['item-content'],
                  styles[`${item.color}`],
                ].join(' ')}
              >
                <i className={`iconfont icon-${item.brand} `} />
                <p className={styles['description']}>{item.name}</p>
              </div>
              <Checkbox
                className={styles['rounded-check']}
                checked={value.includes(item.name)}
                onChange={(e) =>
                  handleCheckboxChange(e.target.value, item.name)
                }
              />
            </div>
          </Card>
        ))
      ) : (
        <Empty style={{ marginBlock: '12px' }} />
      )}
    </section>
  );
}
