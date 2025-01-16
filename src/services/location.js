import { request } from 'umi';

/**
 * Fetch nonce from the server.
 * @returns {Promise<string>} The nonce value.
 */
export const fetchLocation = async () => {
  try {
    const response = await request(
      'https://restcountries.com/v3.1/all?all=123',
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch nonce, ${error}`);
  }
};
