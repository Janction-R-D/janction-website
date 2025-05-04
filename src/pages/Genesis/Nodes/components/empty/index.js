import React from 'react';
import styles from './index.less';
import emptyImg from '@/assets/images/genesis/empty_nodes.png';
import { Card } from 'antd';
export default function EmptyNodes() {
  return (
    <Card className={styles.empty}>
      <p>Sorry! You haven't added any nodes yet</p>
      <span>Support Mac, Android, Windows, Linux as nodes</span>
      <img src={emptyImg} />
    </Card>
  );
}
