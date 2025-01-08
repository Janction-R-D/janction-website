import { request } from 'umi';

const baseUrl = `${process.env.JANCTION_V0_API}/affv2/root`;

export const fetchNFTData = (params) => {
  try {
    return request(`${baseUrl}/dashboard`, {
      params,
      basicLoginAuth: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchPaymentHistory = (params) => {
  try {
    return request(`${baseUrl}/payment_histry`, {
      params,
      basicLoginAuth: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchInviterList = (params) => {
  try {
    return request(`${baseUrl}/l1inviters`, {
      params,
      basicLoginAuth: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchNFTSetting = (params) => {
  try {
    return request(`${baseUrl}/config`, {
      params,
      basicLoginAuth: true,
    });
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
