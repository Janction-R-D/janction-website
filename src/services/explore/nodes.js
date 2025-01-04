import { request } from 'umi';

const baseUrl = `${process.env.JANCTION_API}/v1`;

export const fetchRuningNodes = async (params) => {
  try {
    const response = await request(`${baseUrl}/node/count`, {
      params,
    });
    if (response.code === 1000) {
      return response.data;
    } else {
      console.log(response.msg);
    }
  } catch (error) {
    throw new Error(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchOverviewNodes = async (params) => {
  try {
    const response = await request(`${baseUrl}/node/count`, {
      params,
    });
    if (response.code === 1000) {
      return response.data;
    }
    throw new Error(`FetchNodeInfo failed, ${error}`);
  } catch (error) {
    throw new Error(`FetchNodeInfo failed, ${error}`);
  }
};

export const fetchNodesPoints = async (params) => {
  try {
    const response = await request(`${baseUrl}/task/info`, {
      params,
    });
    if (response.code === 1000) {
      return response.data;
    } else {
      console.log(response.msg);
    }
  } catch (error) {
    throw new Error(`FetchNodeInfo failed, ${error}`);
  }
};
