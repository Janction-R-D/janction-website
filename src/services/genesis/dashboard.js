import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

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

export const fetchInviters = async (params) => {
  try {
    const response = await request(`${baseUrl}/affv2/inviters`, {
      params,
      loginAuth: true,
    });
    if (response?.success) {
      return response?.data;
    }
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

export const fetchInvitersUpdate = async (data) => {
  try {
    const response = await request(`${baseUrl}/affv2/inviters`, {
      method: 'POST',
      data,
      loginAuth: true,
    });
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const fetchNftStatus = () => {
  return request(`${baseUrl}/nft/status`, {
    loginAuth: true,
  });
};
