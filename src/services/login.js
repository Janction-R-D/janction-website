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
export const fetchOauth = (data) => {
  return request(`${baseUrl}/user/oauth2/auth_url`, {
    method: 'POST',
    data,
  });
};
export const fetchOauthCallback = (data) => {
  return request(`${baseUrl}/user/oauth2/callback`, {
    method: 'POST',
    data,
  });
};
export const fetchToken = () => {
  return request(`${baseUrl}/user/oauth2/binding`, {
    loginAuth: true,
  });
};
