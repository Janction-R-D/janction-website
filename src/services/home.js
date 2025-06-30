import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;
export const fetchCreateInquiry = (data) => {
  return request(`${baseUrl}/inquiry/create`, {
    method: 'POST',
    data,
  });
};
