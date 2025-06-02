import React from 'react';
import styles from '@/pages/Create_agent/UploadFile/index.less';
import { Input } from 'antd';

const UploadApi = () => {
  return (
    <div>
      <div className={styles.inputRow}>
        <Input
          placeholder="Paste the API link here"
          className={styles.input}
          suffix={<i className="iconfont icon-add" />}
        />
      </div>
    </div>
  );
};

export default UploadApi;
