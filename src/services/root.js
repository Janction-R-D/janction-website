import { request } from 'umi';

const baseUrl = `${process.env.JANCTION_V0_API}/affv2/root`;

export const fetchNFTData = (params) => {
  return request(`${baseUrl}/dashboard`, {
    params,
    basicLoginAuth: true,
    credentials: 'include',
    withCredentials: true,
  });
};

export const fetchPaymentHistory = (params) => {
  return request(`${baseUrl}/payment_histry`, {
    params,
    basicLoginAuth: true,
    credentials: 'include',
    withCredentials: true,
  });
};

export const fetchInviterList = (params) => {
  return request(`${baseUrl}/l1inviters`, {
    params,
    basicLoginAuth: true,
    credentials: 'include',
    withCredentials: true,
  });
};

export const fetchNFTSetting = (params) => {
  return request(`${baseUrl}/config`, {
    params,
    basicLoginAuth: true,
    credentials: 'include',
    withCredentials: true,
  });
};

export const fetchNFTSettingUpdate = (data, params) => {
  return request(`${baseUrl}/config`, {
    method: 'POST',
    params,
    data,
    basicLoginAuth: true,
    credentials: 'include',
    withCredentials: true,
  });
};

export const fetchInviterCode = (params) => {
  return request(`${baseUrl}/invitation`, {
    method: 'POST',
    data: params,
    basicLoginAuth: true,
    credentials: 'include',
    withCredentials: true,
  });
};

export const fetchInviterNameUpdate = (params) => {
  return request(`${baseUrl}/invitation`, {
    method: 'PUT',
    data: params,
    basicLoginAuth: true,
    credentials: 'include',
    withCredentials: true,
  });
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
