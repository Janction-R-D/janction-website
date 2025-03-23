import React from 'react';
import { Card, Slider } from 'antd';
import styles from './index.less';
import JanctionRange from '@/components/JanctionRange';
export default function SliderBand({ onChange, value, defaultValue }) {
  const marks = {
    0: '1Mbps',
    800: '800Mbps',
    1600: '1600Mbps',
  };
  return (
    <div className={styles['slider-conf-wrapper']}>
      <h3>Basic configuration</h3>
      <Card className={styles['item']}>
        <div className={styles['content']}>
          <Slider
            min={1}
            max={1600}
            marks={marks}
            value={value}
            onChange={onChange}
            className={styles['slider']}
          />
          <JanctionRange
            min={1}
            max={1600}
            value={value}
            onChange={onChange}
            unit="Mbps"
          />
        </div>
      </Card>
    </div>
  );
}
