import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

/**
 * Gain detail
 */
export const fetchIncomeInfo = (params) => {
  return request(`${baseUrl}/market/income`, { params, loginAuth: true });
};
