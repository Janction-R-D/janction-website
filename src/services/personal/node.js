/**
 * Represents information about a node.
 * @typedef {Object} NodeInfo
 * @property {string} node_id - The ID of the node.
 * @property {number} heartbeat_count - The heartbeat count of the node.
 * @property {NodeType} node_type - The type of the node (`NodeDarwin`, `NodeLinux`, etc.).
 * @property {Object} darwin - Additional data specific to Darwin nodes (parsed JSON).
 * @property {Object} linux - Additional data specific to Linux nodes (parsed JSON).
 * @property {Object} windows - Additional data specific to Windows nodes (parsed JSON).
 * @property {Object} android - Additional data specific to Android nodes (parsed JSON).
 * @property {NodeStatus} node_status - The status of the node (`NodeStatusAvailable`, etc.).
 */

/**
 * Represents a log entry related to a node.
 * @typedef {Object} NodeLog
 * @property {string} node_id - The ID of the node associated with the log.
 * @property {string} action - The action performed related to the node.
 * @property {string} timestamp - The timestamp when the action occurred.
 */

import { request } from 'umi';

const baseUrl = '/api/v1/node';

export const NodeType = {
  UNKNOWN: 0,
  DARWIN: 1,
  LINUX: 2,
  WINDOWS: 3,
  ANDROID: 4,
};

export const NodeStatus = {
  UNKNOWN: 0,
  AVAILABLE: 1,
  RUNNING: 2,
  OFFLINE: 3,
};

/**
 * Fetch information about a specific node by its ID.
 * @param {Object} params - Query parameters to be sent with the GET request.
 * @param {string} params.node_id - The ID of the node to fetch information for.
 * @returns {Promise<NodeInfo>} A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchNodeInfo = async (params) => {
  try {
    const response = await request(`${baseUrl}/info`, {
      method: 'GET',
      params,
    });
    if (response.code === 1000) {
      return response.data;
    } else {
      throw new Error(response.msg);
    }
  } catch (error) {
    throw new Error(`FetchNodeInfo failed, ${error}`);
  }
};

/**
 * Fetch information about multiple nodes with optional filtering.
 * @param {Object} params - Query parameters to be sent with the GET request.
 * @param {string} [params.wallet_address] - The wallet address to filter the nodes.
 * @param {NodeType} [params.node_type] - The type of the nodes to filter by.
 * @param {NodeStatus} [params.node_status] - The status of the nodes to filter by.
 * @returns {Promise<[]NodeInfo>} A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchNodeInfos = async (params) => {
  try {
    const response = await request(`${baseUrl}/infos`, {
      method: 'GET',
      params,
    });
    if (response.code === 1000) {
      return response.data;
    } else {
      throw new Error(response.msg);
    }
  } catch (error) {
    throw new Error(`FetchNodeInfos failed, ${error}`);
  }
};

/**
 * Fetch node logs.
 * @param {Object} params - Query parameters to be sent with the GET request.
 * @param {string} [params.node_id] - The ID of the node to fetch logs for.
 * @param {string} [params.wallet_address] - The wallet address to filter the nodes.
 * @returns {Promise<NodeLog>} A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchNodeLogs = async (params) => {
  try {
    const response = await request(`${baseUrl}/logs`, {
      method: 'GET',
      params,
    });
    if (response.code === 1000) {
      return response.data;
    } else {
      throw new Error(response.msg);
    }
  } catch (error) {
    throw new Error(`FetchNodeLogs failed, ${error}`);
  }
};
