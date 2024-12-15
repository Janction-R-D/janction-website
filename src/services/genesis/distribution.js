import { request } from 'umi';

const baseUrl = '/v0/affv2';

// Beneficiary acquisition
export const fetchBeneficiary = async () => {
  try {
    const response = await request(`${baseUrl}/invitation/spilt`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

export const fetchMineInviteCode = (params) => {
  try {
    return request(`${baseUrl}/me`, {
      params,
      loginAuth: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};
