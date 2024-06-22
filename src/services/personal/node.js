import { request } from 'umi';

const baseUrl = '/api/v1/node';

// Get node info by wallet address or get all node infos
export const fetchList = (body) => {
  return request(baseUrl, { method: 'GET', body });
};

// Create or update node info
export const fetchCreate = (body) => {
  return request(`${baseUrl}/create`, { method: 'POST', body });
};

// Update node info
export const fetchUpdate = (body) => {
  return request(`${baseUrl}/create`, { method: 'PUT', body });
};

// Delete node info
export const fetchDelete = (body) => {
  return request(`${baseUrl}/delete`, { method: 'DELETE', body });
};

// Get logs for a specific node
export const fetchLogs = (body) => {
  return request(`${baseUrl}/assign`, { method: 'POST', body });
};

// Receive a heartbeat signal from a node
export const fetchHeartbeat = (body) => {
  return request(`${baseUrl}/heartbeat`, { method: 'POST', body });
};
