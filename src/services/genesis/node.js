import { request } from 'umi';

const baseUrl = `${process.env.JANCTION_API}/v1/node`;

export const NodeType = {
  MacOS: 'macos',
  Linux: 'linux',
  Windows: 'windows',
  Android: 'android',
};

export const NodeStatus = {
  Available: 1,
  Running: 2,
  Offline: 3,
};

export const MappingNodeStatus = {
  [NodeStatus.Available]: 'Available',
  [NodeStatus.Running]: 'Running',
  [NodeStatus.Offline]: 'Offline',
};

/**
 * Represents information about a node.
 * @typedef {Object} NodeInfo
 * @property {string} node_id - The ID of the node.
 * @property {number} heartbeat_count - The heartbeat count of the node.
 * @property {NodeType} node_type - The type of the node (`macos`, `linux`, `windows`, `android`).
 * @property {ArchitectureType} architecture_type - The architecture type of the node (`ArchitectureAmd64`, `ArchitectureArm`, etc.).
 * @property {Object} gpu_info - GPU information of the node (parsed JSON).
 * @property {Object} system_info - System information of the node (parsed JSON).
 * @property {Object} exec_info - Execution information of the node (parsed JSON).
 * @property {NodeStatus} node_status - The status of the node (`NodeStatusAvailable`, etc.).
 */

/**
 * Represents a log entry related to a node.
 * @typedef {Object} NodeLog
 * @property {string} node_id - The ID of the node associated with the log.
 * @property {string} action - The action performed related to the node.
 * @property {string} timestamp - The timestamp when the action occurred.
 */

/**
 * Represents the count of nodes by operating system.
 * @typedef {Object} RespOnlineNodesCount
 * @property {number} macos - The number of nodes running macOS.
 * @property {number} linux - The number of nodes running Linux.
 * @property {number} windows - The number of nodes running Windows.
 * @property {number} android - The number of nodes running Android.
 * @property {number} total - The total number of filtered nodes.
 * @property {number} [total_online_time] - The total online of all filtered nodes.
 */

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
      params,
      loginAuth: true,
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
 * @param {bool} [params.is_online] - Filter by IsOnline.
 * @param {number} [params.page] - Page number default 1.
 * @param {number} [params.size] - Page size number default 1.
 * @returns {Promise<[]NodeInfo>} A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchNodeInfos = async (params) => {
  try {
    const response = await request(`${baseUrl}/infos`, {
      params,
      loginAuth: true,
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
 * @param {NodeType} [params.node_type] - The type of the nodes to filter by.
 * @param {number} [params.page] - Page number default 1.
 * @param {number} [params.size] - Page size number default 1.
 * @returns {Promise<NodeLog>} A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchNodeLogs = async (params) => {
  try {
    const response = await request(`${baseUrl}/logs`, {
      params,
      loginAuth: true,
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

/**
 * Fetch the count of all types of nodes.
 * @param {Object} params - Query parameters to be sent with the GET request.
 * @param {string} [params.wallet_address] - The wallet address to filter the nodes.
 * @param {bool} [params.is_online] - Filter by IsOnline.
 * @returns {Promise<RespOnlineNodesCount>} - A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchNodesCount = async () => {
  try {
    const response = await request(`${baseUrl}/count`, { loginAuth: true });
    return response.data;
  } catch (error) {
    throw new Error(`fetchNodesCount failed, ${error.message}`);
  }
};
