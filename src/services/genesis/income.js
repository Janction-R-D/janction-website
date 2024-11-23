import { request } from 'umi';

const baseUrl = 'https://janction.fdkevin.cloud:8443/v0';

/**
 * Gain detail
 */
export const fetchIncomeInfo = (params) => {
  return request(`${baseUrl}/market/income`, { params, loginAuth: true });
};
