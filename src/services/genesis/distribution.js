import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

// Beneficiary acquisition
export const fetchBeneficiary = async () => {
  try {
    const response = await request(`${baseUrl}/affv2/invitation/spilt`, {
      loginAuth: true,
    });
    return response;
  } catch (error) {
    console.log('『error』', error);
    return null;
  }
};

// Only the invited user can return the invitation code, so this interface can be used as a basis to determine whether the user is an invited user
export const fetchMineInviteCode = (params) => {
  try {
    return request(`${baseUrl}/affv2/me`, {
      params,
      loginAuth: true,
    });
  } catch (err) {
    console.log('『err』', err);
    return null;
  }
};
