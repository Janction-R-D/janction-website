import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const PasswordToggle = ({ initialPassword = '12345678' }) => {
  const [isHidden, setIsHidden] = useState(true); // 控制密码显示/隐藏状态
  const [password, setPassword] = useState(initialPassword); // 初始化密码

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <Space size={8}>
      {/* 密码显示区域 */}
      <span className={styles['password-input']}>
        {isHidden ? '*'.repeat(password.length) : password}
      </span>

      {/* 显示/隐藏按钮 */}
      {isHidden ? (
        <EyeOutlined onClick={toggleVisibility} />
      ) : (
        <EyeInvisibleOutlined onClick={toggleVisibility} />
      )}
      <EditOutlined className={styles['edit-icon']} />
    </Space>
  );
};

export default PasswordToggle;
