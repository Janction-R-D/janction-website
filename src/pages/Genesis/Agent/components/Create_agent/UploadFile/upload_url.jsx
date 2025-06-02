import React from 'react';
import styles from '@/pages/Create_agent/UploadFile/index.less';
import { Input } from 'antd';

const UploadUrl = () => {
  return (
    <div>
      <div className={styles.inputRow}>
        <Input
          placeholder="Paste the link here"
          className={styles.input}
          suffix={<i className="iconfont icon-add" />}
        />
      </div>
    </div>
  );
};

export default UploadUrl;
