import { request } from 'umi';

const baseUrl = '/api/v1/node';

export const fetchNFTStatistic = (params) => {
  return request(`${baseUrl}/count`, {
    params,
  });
};

export const fetchNFTSetting = (params) => {
  return request(`${baseUrl}/count`, {
    params,
  });
};

export const fetchNFTSettingUpdate = (params) => {
  return request(`${baseUrl}/count`, {
    params,
  });
};

export const fetchPaymentHistory = (params) => {
  return request(`${baseUrl}/count`, {
    params,
  });
};

export const fetchInviterList = (params) => {
  return request(`${baseUrl}/count`, {
    params,
  });
};

export const fetchInviterCodeList = (params) => {
  return request(`${baseUrl}/count`, {
    params,
  });
};

export const fetchRootUserPsd = (params) => {
  return request(`${baseUrl}/count`, {
    params,
  });
};

export const fetchSplitSetting = (params) => {
  return request(`${baseUrl}/count`, {
    params,
  });
};

export const fetchInviterEnable = (params) => {
  return request(`${baseUrl}/count`, {
    params,
  });
};
