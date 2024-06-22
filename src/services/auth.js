import { request } from 'umi';

const baseUrl = '/api/v1/auth';

export const fetchNonce = () => {
  return request(`${baseUrl}/nonce`, { method: 'GET' }).then((response) => {
    return response.data.nonce;
  });
};

export const fetchLogin = (params) => {
  return request(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  }).then((response) => {
    if (response.code === 1000) {
      return response.data.token;
    } else {
      throw new Error(response.msg);
    }
  });
};
