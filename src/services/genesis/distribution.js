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
