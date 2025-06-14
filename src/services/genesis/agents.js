import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

// kb
export const fetchBaseRoutes = async (data) => {
  try {
    return await request(`${baseUrl}/eichi/kb`, {
      method: 'POST',
      data,
      loginAuth: true,
    });
  } catch (error) {
    console.error('Error in fetchBaseRoutes:', error);
    return error;
  }
};

export const fetchUpdateBase = async (data) => {
  try {
    return await request(`${baseUrl}/eichi/kb`, {
      method: 'PAT',
      data,
      loginAuth: true,
    });
  } catch (error) {
    console.error('Error in fetchUpdateBase:', error);
    return error;
  }
};

export const fetchDeleteBase = async ({ params, data }) => {
  try {
    return await request(`${baseUrl}/eichi/kb`, {
      method: 'DELETE',
      params,
      data,
      loginAuth: true,
    });
  } catch (error) {
    console.error('Error in fetchDeleteBase:', error);
    return error;
  }
};

export const fetchDeleteAgent = async ({ params, data }) => {
  try {
    return await request(`${baseUrl}/eichi/agents`, {
      method: 'DELETE',
      params,
      data,
      loginAuth: true,
    });
  } catch (error) {
    console.error('Error in fetchDeleteAgent:', error);
    return error;
  }
};

export const fetchAgent = async () => {
  try {
    return await request(`${baseUrl}/eichi/agents`, {
      loginAuth: true,
    });
  } catch (error) {
    console.error('Error in fetchAgent:', error);
    return error;
  }
};

export const fetchCreateAgent = async (data) => {
  try {
    return await request(`${baseUrl}/eichi/agents`, {
      method: 'POST',
      data,
      loginAuth: true,
    });
  } catch (error) {
    console.error('Error in fetchCreateAgent:', error);
    return error;
  }
};

export const fetchUploadImg = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    return await request(`${baseUrl}/eichi/upload/files`, {
      method: 'POST',
      data: formData,
      loginAuth: true,
      requestType: 'form',
    });
  } catch (error) {
    console.error('Error in fetchUploadImg:', error);
    return error;
  }
};

export const fetchUploadFiles = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append('file', data);
    return await request(`${baseUrl}/eichi/kb/${id}/files`, {
      method: 'POST',
      data: formData,
      loginAuth: true,
      requestType: 'form',
    });
  } catch (error) {
    console.error('Error in fetchUploadFiles:', error);
    return error;
  }
};

export const fetchChat = async (id, data) => {
  try {
    return await request(`${baseUrl}/eichi/agents/chat/${id}`, {
      method: 'POST',
      data,
      loginAuth: true,
    });
  } catch (error) {
    console.error('Error in fetchChat:', error);
    return error;
  }
};
