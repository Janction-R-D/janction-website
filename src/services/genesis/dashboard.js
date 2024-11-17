import { request } from 'umi';

const baseUrl = '/v0';

export const fetchLessor = async () => {
  try {
    const response = await request(`${baseUrl}/dashboard/lessor`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
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
