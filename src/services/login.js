import { request } from 'umi';

const baseUrl = 'https://janction.fdkevin.cloud:8443/v0/user/login';

/**
 * Fetch nonce from the server.
 * @returns {Promise<string>} The nonce value.
 */
export const fetchUserNonce = async () => {
  try {
    const response = await request(`${baseUrl}/nonce`, { method: 'POST' });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch nonce, ${error}`);
  }
};

/**
 * Fetch verify from the server.
 */
export const fetchUserVerify = async (data) => {
  try {
    const response = await request(`${baseUrl}/verify`, {
      method: 'POST',
      data,
    });
    console.log('『response』', response);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch verify, ${error}`);
  }
};
