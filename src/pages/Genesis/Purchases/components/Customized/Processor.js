import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox, Divider, Form, Input, Radio, Space, Card } from 'antd';
import styles from './index.less';
import { CPU_GPU_OPTIONS } from '@/constant';
import { PROCESSOR } from './constant';
import { isEmpty } from '@/utils/lang';

export default function Processor({ value, onChange, formValues }) {
  const [keyword, setKeyword] = useState('');

  const list = useMemo(() => {
    if (isEmpty(value?.data)) return [];
    let _list = value?.data[value.cpu_gpu] || [];
    _list = _list.filter((item) => {
      const matchesKeyword =
        !keyword || item.name.toLowerCase().includes(keyword.toLowerCase());
      const matchesBrand = !value.brand || item.brand === value.brand;
      return matchesKeyword && matchesBrand;
    });
    return _list;
  }, [value, keyword]);

  const handleCheckboxChange = (newValue) => {
    if (newValue !== value?.processor) {
      onChange(newValue);
    }
  };

  return (
    <section className={styles['processor-conf']}>
      <Input
        placeholder="Search"
        prefix={<i className="iconfont icon-search" />}
        className={styles['search']}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <section className={styles['options']}>
        <Form.Item
          name="processor"
          rules={[{ required: true, message: 'Please select a processor' }]}
        >
          <Radio.Group
            className={styles['processors']}
            value={value?.processor}
          >
            {PROCESSOR.map((processor) => (
              <Radio.Button
                key={processor.value}
                value={processor.value}
                className={[
                  styles['processor'],
                  styles['gradient-card'],
                  processor.value == formValues.processor &&
                    styles['active-item'],
                ].join(' ')}
              >
                {processor.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Divider type="vertical" className={styles['divider']} />

        <Form.Item
          name="gpu"
          rules={[{ required: true, message: 'Please select a chip' }]}
        >
          <Radio.Group className={styles['processors']} value={value?.cpu_gpu}>
            {CPU_GPU_OPTIONS.map((option) => (
              <Radio.Button
                key={option.value}
                value={option.value}
                className={[
                  styles['processor'],
                  styles['gradient-card'],
                  option.value == formValues.gpu && styles['active-item'],
                ].join(' ')}
              >
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      </section>

      <div className={styles['processor-list']}>
        {list.map((item, index) => (
          <Card
            key={index}
            className={[
              styles['item'],
              value.processor === item.value && styles['active-item'],
            ].join(' ')}
            onClick={() => handleCheckboxChange(item.value)}
          >
            <div className={styles['content']}>
              <p className={styles['description']}>{item.name}</p>
              <Checkbox
                className={styles['rounded-check']}
                checked={value.processor === item.value}
                onChange={() => handleCheckboxChange(item.value)}
              />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
