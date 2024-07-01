import axios from 'axios';

const baseUrl = 'http://43.131.240.184/api/v1/auth';
// const baseUrl = 'http://43.131.240.184:8767/api/v1/auth';
// const baseUrl = 'http://localhost:8767/api/v1/auth';

/**
 * Fetch nonce from the server.
 * @returns {Promise<string>} The nonce value.
 */
export const fetchNonce = async () => {
  try {
    const response = await axios.get(`${baseUrl}/nonce`);
    console.log({ response });
    return response.data.data.nonce;
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
    const response = await axios.post(`${baseUrl}/login`, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log({ response });

    if (response.data.code === 1000) {
      return response.data.data.token;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    throw new Error(`Login failed, ${error}`);
  }
};
