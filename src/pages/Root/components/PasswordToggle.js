import React, { useEffect, useState } from 'react';
import { Button, Input, Space } from 'antd';
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { fetchRootUserPsd } from '@/services/root';

const PasswordToggle = ({ initialPassword = '12345678' }) => {
  const [isHidden, setIsHidden] = useState(true); // 控制密码显示/隐藏状态
  const [password, setPassword] = useState(initialPassword); // 初始化密码
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getPassword();
  }, []);
  const getPassword = async () => {
    try {
      const res = await fetchRootUserPsd();
      // setPassword(res);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const onEdit = () => {
    setVisible(true);
  };

  return (
    <Space size={8}>
      {/* 密码显示区域 */}
      <span className={`ell ${styles['password-input']}`}>
        {isHidden
          ? '*'.repeat(password.length > 6 ? 6 : password.length || 1)
          : password}
      </span>

      {/* 显示/隐藏按钮 */}
      {isHidden ? (
        <EyeOutlined onClick={toggleVisibility} />
      ) : (
        <EyeInvisibleOutlined onClick={toggleVisibility} />
      )}
      <EditOutlined className={styles['edit-icon']} onClick={onEdit} />
      {visible && (
        <ModifyModal
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
          onSuccess={getPassword}
          record={record}
        />
      )}
    </Space>
  );
};

export default PasswordToggle;
