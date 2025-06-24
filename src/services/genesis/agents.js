import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

// kb
export const fetchBaseRoutes = (data) => {
  return request(`${baseUrl}/agent/kb`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};

export const fetchUpdateBase = (data) => {
  return request(`${baseUrl}/agent/kb`, {
    method: 'PAT',
    data,
    loginAuth: true,
  });
};

export const fetchDeleteBase = ({ params, data }) => {
  return request(`${baseUrl}/agent/kb`, {
    method: 'DELETE',
    params,
    data,
    loginAuth: true,
  });
};

export const fetchDeleteAgent = ({ params, data }) => {
  return request(`${baseUrl}/agent/agents`, {
    method: 'DELETE',
    params,
    data,
    loginAuth: true,
  });
};

export const fetchAgent = () => {
  return request(`${baseUrl}/agent/agents`, {
    loginAuth: true,
  });
};

export const fetchCreateAgent = (data) => {
  return request(`${baseUrl}/agent/agents`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};

export const fetchUploadImg = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return request(`${baseUrl}/agent/upload/files`, {
    method: 'POST',
    data: formData,
    loginAuth: true,
    requestType: 'form',
  });
};

export const fetchUploadFiles = (id, data) => {
  const formData = new FormData();
  formData.append('file', data);
  return request(`${baseUrl}/agent/kb/${id}/files`, {
    method: 'POST',
    data: formData,
    loginAuth: true,
    requestType: 'form',
  });
};

export const fetchChat = (id, data) => {
  return request(`${baseUrl}/agent/agents/chat/${id}`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};
