import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

// List bills
export const fetchBillingList = async (params) => {
  return request(`${baseUrl}/market/billings`, {
    params,
    loginAuth: true,
  });
};
