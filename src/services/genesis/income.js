import { request } from 'umi';

const baseUrl = 'http://54.95.234.135:81/v0';

/**
 * Gain detail
 */
export const fetchIncomeInfo = (params) => {
  return request(`${baseUrl}/market/income`, { params, loginAuth: true });
};
