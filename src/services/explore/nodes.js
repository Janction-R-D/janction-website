import { request } from 'umi';
import {
  mockNodes,
  mockNodesPoints,
  mockStatisticData,
} from '../../pages/Explore/data';

const baseUrl = '/api/v1/node';

export const fetchRuningNodes = async (params) => {
  try {
    const response = await request(`${baseUrl}/runingNodes`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return mockStatisticData;
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchOverviewNodes = async (params) => {
  try {
    const response = await request(`${baseUrl}/overviewNodes`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return mockNodes;
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchNodesPoints = async (params) => {
  try {
    const response = await request(`${baseUrl}/nodesPoints`, {
      params,
    });
    // if (response.code === 1000) {
    //   return response.data;
    // } else {
    //   console.log(response.msg);
    // }
    return {
      total: 100,
      list: mockNodesPoints,
    };
  } catch (error) {
    console.log(`FetchNodeInfo failed, ${error}`);
  }
};
