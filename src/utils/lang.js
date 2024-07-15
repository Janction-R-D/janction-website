import storage from '@/utils/storage';
import { history } from 'umi';

export const empty = (value) => {
  return value === undefined || value === null || value === '';
};

/**
 * 退出登录
 */
export const logout = () => {
  storage.clear();
  history.push(`/login?from=${history.location.pathname}`);
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
