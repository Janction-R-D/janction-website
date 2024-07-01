import axios from 'axios';

// const baseUrl = 'http://43.131.240.184:8767/api/v1/node';
const baseUrl = 'http://localhost:8767/api/v1/node';

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
 * Represents the count of online nodes by operating system.
 * @typedef {Object} RespOnlineNodesCount
 * @property {number} macos - The number of online nodes running macOS.
 * @property {number} linux - The number of online nodes running Linux.
 * @property {number} windows - The number of online nodes running Windows.
 * @property {number} android - The number of online nodes running Android.
 */

/**
 * Fetch information about a specific node by its ID.
 * @param {Object} params - Query parameters to be sent with the GET request.
 * @param {string} params.node_id - The ID of the node to fetch information for.
 * @returns {Promise<NodeInfo>} A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchNodeInfo = async (token, params) => {
  try {
    const response = await axios.get(`${baseUrl}/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    if (response.data.code === 1000) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg);
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
export const fetchNodeInfos = async (token, params) => {
  try {
    const response = await axios.get(`${baseUrl}/infos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    if (response.data.code === 1000) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg);
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
 * @returns {Promise<NodeLog>} A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchNodeLogs = async (token, params) => {
  try {
    const response = await axios.get(`${baseUrl}/logs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    if (response.data.code === 1000) {
      return response.data.data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    throw new Error(`FetchNodeLogs failed, ${error}`);
  }
};

/**
 * Fetch the count of online nodes by operating system.
 * @returns {Promise<RespOnlineNodesCount>} - A promise that resolves to the response data.
 * @throws {Error} If the request fails or returns an error response.
 */
export const fetchOnlineNodesCount = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/online_count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(`FetchOnlineNodesCount failed, ${error.message}`);
  }
};
