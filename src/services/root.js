import { request } from 'umi';

const baseUrl = `${process.env.JANCTION_V0_API}/affv2/root`;

export const fetchNFTData = async (params) => {
  try {
    const response = await request(`${baseUrl}/dashboard`, {
      params,
      basicLoginAuth: true,
      credentials: 'include',
      withCredentials: true,
    });
    if (response?.success) {
      return response?.data;
    }
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchPaymentHistory = async (params) => {
  try {
    const response = await request(`${baseUrl}/payment_histry`, {
      params,
      basicLoginAuth: true,
      credentials: 'include',
      withCredentials: true,
    });
    if (response?.success) {
      console.log(response?.data);
      return response?.data;
    }
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchInviterList = async (params) => {
  try {
    const response = await request(`${baseUrl}/l1inviters`, {
      params,
      basicLoginAuth: true,
      credentials: 'include',
      withCredentials: true,
    });
    if (response?.success) {
      return response?.data;
    }
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchNFTSetting = async (params) => {
  try {
    const response = await request(`${baseUrl}/config`, {
      params,
      basicLoginAuth: true,
      credentials: 'include',
      withCredentials: true,
    });
    if (response?.success) {
      return response?.data;
    }
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchNFTSettingUpdate = (data, params) => {
  try {
    return request(`${baseUrl}/config`, {
      method: 'POST',
      params,
      data,
      basicLoginAuth: true,
      credentials: 'include',
      withCredentials: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchInviterCode = (params) => {
  try {
    return request(`${baseUrl}/invitation`, {
      method: 'POST',
      data: params,
      basicLoginAuth: true,
      credentials: 'include',
      withCredentials: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchInviterNameUpdate = (params) => {
  try {
    return request(`${baseUrl}/invitation`, {
      method: 'PUT',
      data: params,
      basicLoginAuth: true,
      credentials: 'include',
      withCredentials: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchRootUserPsdUpdate = (params) => {
  return request(`${baseUrl}/password`, {
    method: 'POST',
    data: params,
    basicLoginAuth: true,
    credentials: 'include',
    withCredentials: true,
  });
};

export const fetchRootRegisterChallenge = (userId) => {
  return request(`${baseUrl}/registration/options`, {
    method: 'POST',
    credentials: 'include',
    withCredentials: true,
    headers: { 'x-user-id': userId },
  });
};
export const fetchRootRegisterVerify = (userId, data) => {
  return request(`${baseUrl}/registration/verification`, {
    method: 'POST',
    data,
    credentials: 'include',
    withCredentials: true,
    headers: { 'x-user-id': userId },
  });
};

export const fetchRootAuthChallenge = (data) => {
  return request(`${baseUrl}/authentication/options`, {
    method: 'POST',
    data,
    credentials: 'include',
    withCredentials: true,
  });
};

export const fetchRootAuthVerify = (data) => {
  return request(`${baseUrl}/authentication/verification`, {
    method: 'POST',
    data,
    credentials: 'include',
    withCredentials: true,
  });
};

export const fetchRootAuthStatus = () => {
  return request(`${baseUrl}/authentication/status`, {
    credentials: 'include',
    withCredentials: true,
  });
};
