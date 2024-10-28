import storage from '@/utils/storage';
import { message } from 'antd';
import { history } from 'umi';

export const empty = (value) => {
  return value === undefined || value === null || value === '';
};

/**
 * 退出登录
 */
export const logout = () => {
  storage.clear();
  history.push('/login');
};

export const showValue = (value, fixed) => {
  if (empty(value)) return '~';
  if (empty(fixed)) {
    return value;
  }
  if (isNaN(value)) {
    return value;
  }
  const numStr = Number(value).toFixed(fixed);
  if (Number(numStr) == 0) return 0;
  return numStr;
};

// copy text
export const copy = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      message.success('Copied!');
    })
    .catch((err) => {
      console.error('Copied failed', err);
    });
};

export const renderBackgroudImg = (img) => {
  return {
    backgroundImage: `url(${img})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  };
};

// Determine whether it is a JSON string
export const isJSON = (str) => {
  if (typeof str == 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
};
