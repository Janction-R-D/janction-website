import { request } from 'umi';

const baseUrl = `${process.env.JANCTION_API}/v1/auth`;

/**
 * Fetch nonce from the server.
 * @returns {Promise<string>} The nonce value.
 */
export const fetchNonce = async () => {
  try {
    const response = await request(`${baseUrl}/nonce`);
    return response.data.nonce;
  } catch (error) {
    throw new Error(`Failed to fetch nonce, ${error}`);
  }
};

/**
 * Perform login request.
 * @param {Object} params - The login parameters.
 * @param {string} params.message - The message for login.
 * @param {string} params.signature - The signature for login.
 * @param {boolean} params.is_node - Whether the login is for a node.
 * @returns {Promise<string>} The authentication token.
 * @throws {Error} If the login request fails or returns an error.
 */
export const performLogin = async (params) => {
  try {
    const response = await request(`${baseUrl}/login`, {
      method: 'POST',
      data: params,
    });
    if (response.code === 1000) {
      return response.data.token;
    } else {
      throw new Error(response.msg);
    }
  } catch (error) {
    throw new Error(`Login failed, ${error}`);
  }
};
