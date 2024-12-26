import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input, Space } from 'antd';
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { fetchRootUserPsdUpdate } from '@/services/root';
import ModifyModal from './ModifyModal';
import storage from '@/utils/storage';
import { useModel } from 'umi';

const PasswordToggle = ({ initialPassword = '12345678' }) => {
  const [isHidden, setIsHidden] = useState(true); // 控制密码显示/隐藏状态
  const [password, setPassword] = useState(initialPassword); // 初始化密码
  const [visible, setVisible] = useState(false);

  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    getPassword();
  }, []);
  const getPassword = async () => {
    try {
      const rootAuth = storage.get('ROOT_AUTH');
      const base64String = rootAuth.replace('Basic ', '');
      const decodedString = atob(base64String);
      const [username, _password] = decodedString.split(':');
      setPassword(_password);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  const record = useMemo(() => {
    return { title: 'Password', key: 'new_password', value: password };
  }, [password]);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const onEdit = () => {
    setVisible(true);
  };

  const onPasswordUpdate = async (new_password) => {
    try {
      fetchRootUserPsdUpdate({
        old_password: password,
        ...new_password,
      });
      setInitialState({
        ...initialState,
        rootAccount: false,
      });
      setTimeout(() => {
        storage.remove('ROOT_AUTH');
      }, 500);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  return (
    <Space size={8}>
      {/* 密码显示区域 */}
      <span className={`ell ${styles['password-input']}`}>
        {isHidden ? '*'.repeat(16) : password}
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
          record={record}
          onOk={onPasswordUpdate}
          onSuccess={getPassword}
        />
      )}
    </Space>
  );
};

export default PasswordToggle;
