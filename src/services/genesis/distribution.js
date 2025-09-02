import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

// Beneficiary acquisition
export const fetchBeneficiary = () => {
  return request(`${baseUrl}/affv2/invitation/spilt`, {
    loginAuth: true,
  });
};

// Only the invited user can return the invitation code, so this interface can be used as a basis to determine whether the user is an invited user
export const fetchMineInviteCode = (params) => {
  return request(`${baseUrl}/affv2/me`, {
    params,
    loginAuth: true,
  });
};
