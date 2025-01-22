import storage from '@/utils/storage';
import { message } from 'antd';
import { history } from 'umi';
import is from './is';
import dayjs from 'dayjs';
import { DATE_FORMAT_TYPE } from './datetime';

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

export const showDate = (value, format = DATE_FORMAT_TYPE.YMD) => {
  if (empty(value)) return '~';
  return dayjs(value).format(format);
};

function copyTextFallback(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    message.success('Copied!');
  } catch (err) {
    console.error('Copied failed', err);
  }
  document.body.removeChild(textarea);
}

// copy text
export const copy = (text) => {
  if (!navigator?.clipboard?.writeText) {
    copyTextFallback(text);
    return;
  }
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
export const renderBackgroudImgMobile = (img) => {
  return {
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: '70% 40%',
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

export const getNodeStatusMatch = ({ status_str, operating_status_str }) => {
  // 已挂载且已出租
  let isActive = status_str === 'online' && operating_status_str == 'leased';
  // 已挂载但未出租
  let isListed = status_str === 'online' && operating_status_str == 'leisure';
  // 未挂载
  let isRunning = status_str === 'online' && !isActive && !isListed;
  // 离线
  let isOffLine = status_str !== 'online';
  return { isActive, isListed, isRunning, isOffLine };
};

export function capitalizeFirstLetter(string) {
  return string.replace(/^\w/, (c) => c.toUpperCase());
}

export function avatar(address) {
  return `${process.env.JANCTION_BASE_API}/v0/user/avatar/${address}`;
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
