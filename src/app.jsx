/* eslint-disable react-hooks/rules-of-hooks */
import {
  codeTypeJsonArr,
  SYSPM_REQ_ECY_FLG,
  SYSPM_RSP_ECY_FLG,
} from '@/constant';
import { logout } from '@/utils/lang';
import storage from '@/utils/storage';
import { message } from 'antd';
import { decode, encode } from 'js-base64';
import { history } from 'umi';

const loginPath = '/login';

/**
 * Request interceptor
 */
const authHeaderInterceptor = (url, options) => {
  const fdata = new FormData();
  let jsonstr = JSON.stringify(options.body);
  let reqData;
  if (options.method === 'post') {
    if (SYSPM_REQ_ECY_FLG === 1) {
      jsonstr = encode(jsonstr);
      codeTypeJsonArr.forEach(function (data) {
        jsonstr = jsonstr.replace(new RegExp(data.e, 'g'), data.d);
      });
      reqData = encodeURI(jsonstr);
    } else {
      reqData = jsonstr;
    }
    fdata.append('json', reqData);
    options.body = fdata;
  }
  console.log('『url』', url);
  if (url !== '/api/v1/auth/nonce' && url !== '/api/v1/auth/login') {
    const ACCESS_TOKEN = storage.get('token');
    console.log('『ACCESS_TOKEN』', ACCESS_TOKEN);
    if (!ACCESS_TOKEN) {
      history.push(loginPath);
    } else {
      const authHeader = { Authorization: ACCESS_TOKEN };
      options.headers = {
        ...options.headers,
        ...authHeader,
      };
    }
  }
  return {
    url,
    options: { ...options, interceptors: true },
  };
};

/**
 * exception handler
 */
const errorHandler = (error) => {
  console.log('『error』', error);
  const { response } = error;
  const errorText =
    'An error occurred on the server. Please check the server！';
  if (response && response.status) {
    message.error(errorText);
  } else if (!response) {
    message.error(errorText);
  }
  return response;
};

/**
 * Response processing
 */
const responHandler = async (response, options) => {
  const res = await response.clone().json();
  console.log('『res』', res);
  let reData;
  if (SYSPM_RSP_ECY_FLG === 1) {
    let reBase64Str = res.redata;
    codeTypeJsonArr.map((item) => {
      reBase64Str = reBase64Str.replace(new RegExp('\\' + item.d, 'g'), item.e);
    });
    reData = JSON.parse(decode(reBase64Str));
  } else {
    reData = res;
  }
  if (reData.code == 0 || reData.code === 110) {
    message.error(reData?.msg);
  }
  if (reData.code === 110) {
    logout();
  }
  return reData;
};

export const request = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [responHandler],
};

export async function getInitialState() {
  const userAccount = storage.get('userAccount');
  return {
    userAccount,
  };
}
