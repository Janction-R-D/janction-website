import { request } from 'umi';

const baseUrl = '/api/v1/point';

export const fetchUserCreditsInfo = async (params) => {
  try {
    const response = await request(`${baseUrl}/userCreditsInfo`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return [
      {
        userId: '1',
        userName: '用户0x56ab0649',
        creditsNum: 124,
      },
    ];
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchTotalPoints = async (params) => {
  try {
    const response = await request(`${baseUrl}/totalPoints`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return 112893;
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchTotalNetworkEarnings = async (params) => {
  try {
    const response = await request(`${baseUrl}/totalNetworkEarnings`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return 1060463;
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchNetworkEarnings = async (params) => {
  try {
    const response = await request(`${baseUrl}/networkEarnings`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return [
      { month: '1', earning: 300 },
      { month: '2', earning: 280 },
      { month: '3', earning: 250 },
      { month: '4', earning: 260 },
      { month: '5', earning: 270 },
      { month: '6', earning: 300 },
      { month: '7', earning: 550 },
      { month: '8', earning: 500 },
      { month: '9', earning: 400 },
      { month: '10', earning: 390 },
      { month: '11', earning: 380 },
      { month: '11', earning: 390 },
    ];
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};
