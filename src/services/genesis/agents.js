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
  data.forEach((file) => {
    if (file.originFileObj) {
      formData.append('files', file.originFileObj);
    }
  });
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
export const fetchChatSee = (data) => {
  return request(`${baseUrl}/ai/chat/sse`, {
    method: 'POST',
    data,
  });
};

export const fetchDetailKnowledge = (id) => {
  return request(`${baseUrl}/agent/kb/${id}`, {
    loginAuth: true,
  });
};
export const fetchDocList = (id) => {
  return request(`${baseUrl}/agent/kb/${id}/files`, {
    loginAuth: true,
  });
};

export const fetchDeleteDocument = (params) => {
  const { k_id, file_id } = params;

  return request(`${baseUrl}/agent/kb/${k_id}/files/${file_id}`, {
    method: 'DELETE',
    loginAuth: true,
  });
};

export const fetchUploadMultiFiles = (id, data) => {
  return request(`${baseUrl}/agent/kb/${id}/files`, {
    method: 'POST',
    data: data,
    loginAuth: true,
    requestType: 'form',
  });
};
export const fetchJoinAgent = (id) => {
  return request(`${baseUrl}/agent/agents/share/join/${id}`, {
    method: 'POST',
    loginAuth: true,
  });
};
