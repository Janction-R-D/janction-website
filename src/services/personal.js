import { request } from 'umi';

const baseUrl = '/';

// 列表
export const fetchList = (body) => {
  return request(`${baseUrl}/list `, { method: 'POST', body });
};
