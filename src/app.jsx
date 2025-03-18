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
    // withCredentials: true,
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
  throw new Error(response?.statusText);
};

export const request = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
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
