import storage from '@/utils/storage';

export const empty = (value) => {
  return value === undefined || value === null || value === '';
};

/**
 * 退出登录
 */
export const logout = () => {
  storage.clear();
  window.location.replace('/login');
};

export const showValue = (value, fixed) => {
  if (empty(value)) return '~';
  if (empty(fixed)) {
    return value;
  }
  if (isNaN(value)) {
    return value;
  }
  return Number(value).toFixed(fixed);
};
