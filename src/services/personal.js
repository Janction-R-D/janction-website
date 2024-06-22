import { request } from 'umi';

const baseUrl = '/gateway/shipapi/platShipBiz';

// 列表
export const fetchHomeMenu = (body) => {
  return request(`${baseUrl}/userTaskCot `, { method: 'POST', body });
};
