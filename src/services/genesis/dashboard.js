import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

export const fetchLessor = () => {
  return request(`${baseUrl}/dashboard/lessor`, {
    loginAuth: true,
  });
};

export const fetchNewsUpdate = () => {
  return request(`${baseUrl}/news/update`, {
    method: 'POST',
    loginAuth: true,
  });
};

export const fetchNewsList = () => {
  return request(`${baseUrl}/news/list`, {
    loginAuth: true,
  });
};

export const fetchInviters = (params) => {
  return request(`${baseUrl}/affv2/inviters`, {
    params,
    loginAuth: true,
  });
};

export const fetchInvitersUpdate = (data) => {
  return request(`${baseUrl}/affv2/inviters`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};

export const fetchNftStatus = () => {
  return request(`${baseUrl}/nft/status`, {
    loginAuth: true,
  });
};
