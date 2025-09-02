import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

/**
 *Generate invite link
 */
export const fetchUserInfo = () => {
  return request(`${baseUrl}/user/center`, { loginAuth: true });
};

/**
 *Generate invite link
 */
export const fetchBindEmail = (data) => {
  return request(`${baseUrl}/user/bind_email`, {
    method: 'POST',
    data,
    loginAuth: true,
  });
};

export const fetchGetBindEmail = () => {
  return request(`${baseUrl}/user/bind_email`, {
    loginAuth: true,
  });
};
