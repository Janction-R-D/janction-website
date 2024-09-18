import { request } from 'umi';
import {
  mockPointsData,
  mockRakingData,
  mockUserCreditsInfo,
} from '../../pages/Explore/data';

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
    return mockUserCreditsInfo;
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchPointsList = async (params) => {
  try {
    const response = await request(`${baseUrl}/pointsList`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return {
      total: 100,
      list: mockPointsData,
    };
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchRanking = async (params) => {
  try {
    const response = await request(`${baseUrl}/ranking`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return mockRakingData;
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};
