import storage from '@/utils/storage';
import { message } from 'antd';
import { history } from 'umi';
import is from './is';

export const isEmpty = (value) => {
  if (empty(value)) return true;
  if (is.isArray(value)) return value.length == 0;
  if (is.isObject(value)) return Object.keys(value).length == 0;
  return false;
};

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

export function generateTempId() {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
}

export function updateArray(
  array,
  action,
  { data, index = array.length, identifierKey = 'id', identifierValue } = {},
) {
  let newArray = [...array];

  switch (action) {
    case 'add':
      newArray.splice(index, 0, data);
      break;

    case 'delete':
      newArray = newArray.filter(
        (item) => item[identifierKey] !== identifierValue,
      );
      break;

    case 'update':
      newArray = newArray.map((item) => {
        if (item[identifierKey] === identifierValue) {
          return { ...item, ...data };
        }
        return item;
      });
      break;

    default:
      console.warn('Unsupported action type');
  }

  return newArray;
}
