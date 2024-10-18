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
