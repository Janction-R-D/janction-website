import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

//kb
export const fetchBaseRoutes = (data) => {
  return request(`${baseUrl}/eichi/kb`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};

//get templates

export const fetchUpdateBase = (data) => {
  return request(`${baseUrl}/eichi/kb`, {
    data,
    method: 'PAT',
    loginAuth: true,
  });
};

export const fetchDeleteBase = ({ params, data }) => {
  return request(`${baseUrl}/eichi/kb`, {
    data,
    params,
    method: 'DELETE',
    loginAuth: true,
  });
};

export const fetchDeleteAgent = ({ params, data }) => {
  return request(`${baseUrl}/eichi/agents`, {
    data,
    params,
    method: 'DELETE',
    loginAuth: true,
  });
};
export const fetchAgent = () => {
  return request(`${baseUrl}/eichi/agents`, {
    loginAuth: true,
  });
};
export const fetchCreateAgent = (data) => {
  return request(`${baseUrl}/eichi/agents`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};
export const fetchUploadImg = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return request(`${baseUrl}/eichi/upload/files`, {
    method: 'POST',
    data: formData,
    loginAuth: true,
    requestType: 'form',
  });
};

//upload knowleage files
export const fetchUploadFiles = (id, data) => {
  const formData = new FormData();
  formData.append('file', data);
  console.log(data);
  return request(`${baseUrl}/eichi/kb/${id}/files`, {
    method: 'POST',
    data: formData,
    loginAuth: true,
    requestType: 'form',
  });
};
//Chat
export const fetchChat = (id, data) => {
  console.log(id, data);
  return request(`${baseUrl}/eichi/agents/chat/${id}`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};
