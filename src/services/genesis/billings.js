import { request } from 'umi';

const baseUrl = 'https://janction.fdkevin.cloud:8443/v0/';

// List bills
export const fetchBillingList = async (params) => {
  return request(`${baseUrl}/market/billings`, {
    params,
    loginAuth: true,
  });
};
