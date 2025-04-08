import { request } from 'umi';

/**
 * Fetch nonce from the server.
 * @returns {Promise<string>} The nonce value.
 */
export const fetchLocation = () => {
  return request('https://restcountries.com/v3.1/all');
};
