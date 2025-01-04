import { request } from 'umi';

const baseUrl = `${process.env.JANCTION_API}/point/v1`;

export const fetchUserCreditsInfo = async (params) => {
  try {
    const response = await request(`${baseUrl}/report_history`, {
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

export const fetchPointsList = async (params) => {
  try {
    const response = await request(`${baseUrl}/transactions`, {
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

export const fetchRanking = async (params) => {
  try {
    const response = await request(`${baseUrl}/top_point_statistic`, {
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

export const fetchPointsTotal = async (params) => {
  try {
    const response = await request(`${baseUrl}/total_points`, {
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
