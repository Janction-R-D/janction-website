import { request } from 'umi';

const baseUrl = process.env.JANCTION_V0_API;

/**
 * Fetch nonce from the server.
 * @returns {Promise<string>} The nonce value.
 */
export const fetchUserNonce = async () => {
  try {
    const response = await request(`${baseUrl}/user/login/nonce`, {
      method: 'POST',
    });
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
    const response = await request(`${baseUrl}/user/login/verify`, {
      method: 'POST',
      data,
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch verify, ${error}`);
  }
};

/**
 * Fetch verify from the server.
 */
export const fetchRootUserLogin = async (data) => {
  const { username, password } = data || {};
  const str = btoa(`${username}:${password}`);
  try {
    const response = await request(`${baseUrl}/affv2/root/dashboard`, {
      headers: { Authorization: `Basic ${str}` },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch verify, ${error}`);
  }
};
