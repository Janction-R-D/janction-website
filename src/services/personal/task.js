import { request } from 'umi';

const baseUrl = '/api/v1/task';

// Get all tasks
export const fetchList = (data) => {
  return request(baseUrl, data);
};

// Create a new task
export const fetchCreate = (body) => {
  return request(`${baseUrl}/create`, { method: 'POST', body });
};

// Update an existing task
export const fetchUpdate = (body) => {
  return request(`${baseUrl}/create`, { method: 'PUT', body });
};

// Delete a task
export const fetchDelete = (body) => {
  return request(`${baseUrl}/delete`, { method: 'DELETE', body });
};

// Assign a task to a node
export const fetchAssign = (body) => {
  return request(`${baseUrl}/assign`, { method: 'POST', body });
};

// Submit task assignment status
export const fetchSubmit = (body) => {
  return request(`${baseUrl}/submit`, { method: 'POST', body });
};
