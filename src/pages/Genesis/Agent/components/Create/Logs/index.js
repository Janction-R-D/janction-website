import React from 'react';
import styles from './index.less';
import { Card } from 'antd';

export default function Logs() {
  return (
    <Card title="Log..." className={styles['logs-card']}>
      <p>agent...</p>
      <p>Generation Completed</p>
    </Card>
  );
}
