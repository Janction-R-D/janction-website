import { request } from 'umi';

const baseUrl = '/v0';

/**
 * Gain detail
 */
export const fetchIncomeInfo = (params) => {
  return request(`${baseUrl}/market/income`, { params, loginAuth: true });
};
