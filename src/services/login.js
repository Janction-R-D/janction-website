import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

/**
 * Fetch nonce from the server.
 * @returns {Promise<string>} The nonce value.
 */
export const fetchUserNonce = () => {
  return request(`${baseUrl}/user/login/nonce`, {
    method: 'POST',
  });
};

/**
 * Fetch verify from the server.
 */
export const fetchUserVerify = (data) => {
  return request(`${baseUrl}/user/login/verify`, {
    method: 'POST',
    data,
  });
};
