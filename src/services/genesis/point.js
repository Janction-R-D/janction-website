import { request } from 'umi';

const baseUrl = `${process.env.JANCTION_API}/point/v1`;

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
 * Represents the report history for a node or wallet address.
 * @typedef {Object} ReportHistory
 * @property {string} node_id - The ID of the node.
 * @property {string} wallet_address - The wallet address associated with the report.
 * @property {number} heartbeats_count - The number of heartbeats recorded.
 * @property {number} point - The points earned.
 * @property {Array<string>} job_types - The types of jobs associated with the report.
 * @property {string} create_at - The creation time of the report.
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
    const response = await request(`${baseUrl}/point_statistic`, {
      params,
    });
    return response.data;
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
    const response = await request(`${baseUrl}/daily_point_statistic`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(`FetchDailyPointStatistic failed, ${error.message}`);
  }
};

/**
 * Fetch report history.
 * @param {Object} [params] - Query parameters to be sent with the GET request.
 * @param {string} [params.node_id] - The node ID to filter report history by.
 * @param {string} [params.wallet_address] - The wallet address to filter report history by.
 * @returns {Promise<ReportHistory[]>} - A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchReportHistories = async (params) => {
  try {
    const response = await request(`${baseUrl}/report_history`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(`FetchReportHistories failed, ${error.message}`);
  }
};
