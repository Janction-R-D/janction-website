import React, { useEffect } from 'react';
import { Avatar, Button, Card, Checkbox, Input } from 'antd';
import styles from './index.less';
import useFlag from '../hook/useFlag';

const locations = [
  { label: 'Nueva York', value: 'new_york', country: 'United States' },
  { label: 'Londres', value: 'london', country: 'UK' },
  { label: 'Tokio', value: 'tokyo', country: 'Japan' },
  { label: 'París', value: 'paris', country: 'France' },
  { label: 'Sídney', value: 'sydney', country: 'Australia' },
];

export default function Location({ value, onChange }) {
  const { allFlags } = useFlag({ locations });

  const handleCheckboxChange = (newValue) => {
    if (newValue !== value) {
      onChange?.(newValue);
    }
  };

  return (
    <Card className={styles['location-conf-wrapper']}>
      <header className={styles['header']}>
        <Input
          placeholder="Search"
          prefix={<i className="iconfont icon-search" />}
          className={styles['search']}
        />
        <Button className={styles['btn']}>Select All Countries</Button>
      </header>

      {allFlags.map((country, index) => (
        <Card
          key={index}
          className={[
            styles['item'],
            value === country.value && styles['active-item'],
          ].join(' ')}
          onClick={() => handleCheckboxChange(country.value)}
        >
          <div className={styles['content']}>
            <div className={styles['content-flag']}>
              <Avatar
                src={'https://flagsapi.com/BE/shiny/64.png'} // Usa la URL correcta
                alt={`${country.label} flag`}
                className={styles['flag']}
              />
              <p className={styles['description']}>{country.label}</p>
            </div>
            <Checkbox
              className={styles['rounded-check']}
              checked={value === country.value}
              onChange={() => handleCheckboxChange(country.value)}
            />
          </div>
        </Card>
      ))}
    </Card>
  );
}
