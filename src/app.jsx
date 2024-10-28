/* eslint-disable react-hooks/rules-of-hooks */
import storage from '@/utils/storage';
import { message } from 'antd';
import { logout } from './utils/lang';
import React from 'react';
import RainbowKit from '@/components/RainbowKit';
import '@xterm/xterm/css/xterm.css';

/**
 * Request interceptor
 */
const authHeaderInterceptor = (url, options) => {
  const ACCESS_TOKEN = storage.get('token');
  let authHeader = {};
  if (options?.loginAuth) {
    if (!ACCESS_TOKEN) {
      logout();
    } else {
      authHeader = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'x-user-id': `6d5b03ae-6205-417d-8749-5ac1f40fac07`,
      };
    }
  }
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
  const isLessees = storage.get('isLessees');
  const userAccount = storage.get('userAccount');
  return {
    isLessees,
    userAccount,
  };
}

export function rootContainer(container) {
  return React.createElement(RainbowKit, null, container);
}
