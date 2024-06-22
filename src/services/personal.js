import { request } from 'umi';

const baseUrl = 'http://jump.janction.xyz:8767/api/v1';

export const fetchNonce = () => {
  return request(`${baseUrl}/auth/nonce`, { method: 'GET' }).then(response => {
    return response.data.nonce;
  });
};

export const login = (params) => {
  return request(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  }).then(response => {
    if(response.code === 1000) {
      return response.data.token;
    } else {
      throw new Error(response.msg)
    }
  });
};

// 列表
export const fetchList = (body) => {
  return request(`${baseUrl}/list `, { method: 'POST', body });
};
