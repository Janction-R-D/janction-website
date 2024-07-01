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

export const showValue = (value) => {
  if (empty(value)) return '~';
  return value;
};
