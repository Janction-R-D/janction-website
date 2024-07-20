import { request } from 'umi';

const baseUrl = '/api/v1/node';

export const fetchUserCreditsInfo = async (params) => {
  try {
    const response = await request(`${baseUrl}/userCreditsInfo`, {
      params,
      loginAuth: true,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   throw new Error(response.msg);
    // }
    return [
      {
        userId: '1',
        userName: '用户0x56ab0649',
        creditsNum: 124,
      },
    ];
  } catch (error) {
    throw new Error(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchTotalPoints = async (params) => {
  try {
    const response = await request(`${baseUrl}/totalPoints`, {
      params,
      loginAuth: true,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   throw new Error(response.msg);
    // }
    return 112893;
  } catch (error) {
    throw new Error(`FetchNodeInfo failed, ${error}`);
  }
};
