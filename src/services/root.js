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

export const fetchNFTSettingUpdate = (params) => {
  try {
    return request(`${baseUrl}/config`, {
      method: 'POST',
      data: params,
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

export const fetchInviterCodeList = (params) => {
  try {
    return request(`${baseUrl}/count`, {
      params,
      basicLoginAuth: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchRootUserPsdUpdate = (params) => {
  try {
    return request(`${baseUrl}/password`, {
      method: 'POST',
      data: params,
      basicLoginAuth: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchSplitSetting = (params) => {
  try {
    return request(`${baseUrl}/count`, {
      params,
      basicLoginAuth: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};

export const fetchInviterEnable = (params) => {
  try {
    return request(`${baseUrl}/count`, {
      params,
      basicLoginAuth: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};
