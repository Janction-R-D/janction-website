import React from 'react';
import { CheckSquareOutlined, SyncOutlined } from '@ant-design/icons';
import styles from './index.less';

export const LoadingButton = ({ text = 'creating' }) => {
  return (
    <div className={styles.buttonContainer}>
      <SyncOutlined className={styles.loadingIcon} />
      <span className={styles.loadingText}>{text}</span>
    </div>
  );
};

export const LoadingFinish = ({ text = 'Finish' }) => {
  return (
    <div className={styles.buttonContainer}>
      <CheckSquareOutlined className={styles.loadingFinishIcon} />
      {text}
    </div>
  );
};
