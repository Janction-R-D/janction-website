import { request } from 'umi';

const baseUrl = 'http://54.95.234.135:81/v0/';

// List bills
export const fetchBillingList = async (params) => {
  return request(`${baseUrl}/market/billings`, {
    params,
    loginAuth: true,
  });
};
