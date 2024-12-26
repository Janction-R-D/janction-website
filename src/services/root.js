import { request } from 'umi';

const baseUrl = '/v0/affv2/root';

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
