import React from 'react';
import styles from './index.less';
import { Card } from 'antd';
import { useIntl } from 'umi';

export default function Logs() {
  const { formatMessage } = useIntl();
  return (
    <Card
      title={formatMessage({ id: 'create.log' })}
      className={styles['logs-card']}
    >
      <p>agent...</p>
      <p>Generation Completed</p>
    </Card>
  );
}
