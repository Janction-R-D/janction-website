/* eslint-disable react-hooks/rules-of-hooks */
import storage from '@/utils/storage';
import { message } from 'antd';
import { empty, logout } from './utils/lang';
import React from 'react';
import RainbowKit from '@/components/RainbowKit';
import '@xterm/xterm/css/xterm.css';

/**
 * Request interceptor
 */
const authHeaderInterceptor = (url, options) => {
  const AUTH_HEADERS = storage.get('AUTH_HEADERS');
  let authHeader = {};
  if (options?.loginAuth) {
    if (!AUTH_HEADERS) {
      logout();
    } else {
      authHeader = AUTH_HEADERS;
    }
  }
  options.headers = {
    ...options.headers,
    ...authHeader,
    withCredentials: true,
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
  if (!error?.response) throw error;
  const { response } = error;
  const errorText =
    'An error occurred on the server. Please check the server！';
  if (response?.status == 504) {
    message.error(errorText);
  }
  throw response?.statusText;
};
const responseData = async (response, options) => {
  const url = options.url;
  let res;
  try {
    res = await response.clone().json();
  } catch (error) {
    // Handle non-JSON formatted response data
    res = await response.clone().text();
  }
  console.log('『res』', res);
  if (!url.includes('/v0')) return res;
  if (res?.success) return res?.data;
  if (res?.code && res?.message) {
    let error = `${res.code}:${res.message}`;
    message.error(error);
    throw new Error(error);
  }
  return res;
};
export const request = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responseData],
};

export async function getInitialState() {
  const isLessee = storage.get('isLessee');
  const userAccount = storage.get('userAccount');
  return {
    isLessee: empty(isLessee) ? true : isLessee,
    userAccount,
  };
}

export function rootContainer(container) {
  return React.createElement(RainbowKit, null, container);
}
