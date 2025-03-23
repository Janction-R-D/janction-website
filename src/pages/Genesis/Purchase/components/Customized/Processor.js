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
        <Form.Item name="processor">
          <Processors formValues={formValues} />
        </Form.Item>
        <Divider type="vertical" className={styles['divider']} />
        <Form.Item name="gpu">
          <Gpu formValues={formValues} />
        </Form.Item>
      </section>
    </section>
  );
}

function Processors(props) {
  const { value = [], onChange, formValues } = props;

  const handleCheckboxChange = (newValue) => {
    const newValues = value.includes(newValue)
      ? value.filter((v) => v !== newValue) // Deseleccionar
      : [...value, newValue]; // Seleccionar

    onChange(newValues);
  };

  return (
    <Checkbox.Group className={styles['processors']} value={value}>
      {PROCESSOR.map((processor) => (
        <div
          key={processor.value}
          className={[
            styles['processor'],
            styles['gradient-card'],
            value.includes(processor.value) && styles['active-item'],
          ].join(' ')}
          onClick={() => handleCheckboxChange(processor.value)}
        >
          <Checkbox
            value={processor.value}
            className={styles['hidden-checkbox']}
          />
          {processor.label}
        </div>
      ))}
    </Checkbox.Group>
  );
}

function Gpu(props) {
  const { value = [], onChange, formValues } = props;

  const handleCheckboxChange = (checkedValues) => {
    onChange(checkedValues); // Permite múltiples selecciones
  };

  return (
    <Checkbox.Group
      className={styles['processors']}
      value={value}
      onChange={handleCheckboxChange}
    >
      {CPU_GPU_OPTIONS.map((option) => (
        <div
          key={option.value}
          className={[
            styles['processor'],
            styles['gradient-card'],
            value.includes(option.value) && styles['active-item'],
          ].join(' ')}
          onClick={() => {
            const newValues = value.includes(option.value)
              ? value.filter((v) => v !== option.value) // Deseleccionar
              : [...value, option.value]; // Seleccionar

            onChange(newValues);
          }}
        >
          <Checkbox
            value={option.value}
            className={styles['hidden-checkbox']}
          />
          <p className={styles['processor-label']}>{option.label}</p>
        </div>
      ))}
    </Checkbox.Group>
  );
}
