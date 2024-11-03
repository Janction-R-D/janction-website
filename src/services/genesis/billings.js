import { request } from 'umi';

const baseUrl = '/v0/';

// List bills
export const fetchBillingList = async (params) => {
  return request(`${baseUrl}/billing/list`, {
    params,
    loginAuth: true,
  });
};
