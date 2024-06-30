import axios from 'axios';

// const baseUrl = 'http://43.131.240.184:9767/api/v1';
const baseUrl = 'http://localhost:9767/api/v1';

/**
 * Represents point statistics for a wallet address.
 * @typedef {Object} PointStatistic
 * @property {string} wallet_address - The wallet address associated with the point statistic.
 * @property {number} point - The total points for the wallet address.
 */

/**
 * Represents daily point statistics for a wallet address.
 * @typedef {Object} DailyPointStatistic
 * @property {string} wallet_address - The wallet address associated with the daily point statistic.
 * @property {number} point - The points earned on the specific date.
 * @property {string} date - The date for which the daily point statistic is recorded (primary key).
 */

/**
 * Fetch point statistics.
 * @param {Object} [params] - Query parameters to be sent with the GET request.
 * @param {string} [params.wallet_address] - The wallet address to filter point statistics by.
 * @returns {Promise<PointStatistic>} - A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchPointStatistic = async (params) => {
  try {
    const response = await axios.get(`${baseUrl}/point_statistic`, {
      params,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`FetchPointStatistic failed, ${error.message}`);
  }
};

/**
 * Fetch daily point statistics.
 * @param {Object} [params] - Query parameters to be sent with the GET request.
 * @param {number} [params.days] - The number of days to fetch daily point statistics for.
 * @param {string} [params.wallet_address] - The wallet address to filter daily point statistics by.
 * @returns {Promise<DailyPointStatistic>} - A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchDailyPointStatistic = async (params) => {
  try {
    const response = await axios.get(`${baseUrl}/daily_point_statistic`, {
      params,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`FetchDailyPointStatistic failed, ${error.message}`);
  }
};
