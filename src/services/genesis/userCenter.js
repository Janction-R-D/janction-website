import { request } from 'umi';

const baseUrl = '/v0';

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
