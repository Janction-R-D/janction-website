/* eslint-disable react-hooks/rules-of-hooks */
import storage from '@/utils/storage';
import { message } from 'antd';

/**
 * Request interceptor
 */
const authHeaderInterceptor = (url, options) => {
  const ACCESS_TOKEN = storage.get('token');
  const authHeader = { Authorization: `Bearer ${ACCESS_TOKEN}` };
  options.headers = {
    ...options.headers,
    ...authHeader,
  };
  return {
    url,
    options,
  };
};

/**
 * exception handler
 */
const errorHandler = (error) => {
  const { response } = error;
  const errorText =
    'An error occurred on the server. Please check the server！';
  if (response?.status == 504) {
    message.error(errorText);
  }
  return response;
};

export const request = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
};

export async function getInitialState() {
  const userAccount = storage.get('userAccount');
  return {
    userAccount,
  };
}
