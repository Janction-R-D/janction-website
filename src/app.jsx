/* eslint-disable react-hooks/rules-of-hooks */
import storage from '@/utils/storage';
import { message, Spin, Tabs } from 'antd';
import { decode, encode } from 'js-base64';
import { history, useModel } from 'umi';
import {
  codeTypeJsonArr,
  RESPONSE_CODE,
  SYSPM_REQ_ECY_FLG,
  SYSPM_RSP_ECY_FLG,
} from '@/constant';
import { logout, empty } from '@/utils/lang';

const loginPath = '/login';
let lock = false;

/**
 * Request interceptor
 */
const authHeaderInterceptor = (url, options) => {
  const fdata = new FormData();
  let upfile = {};
  const upfileObj = { ...options?.body };
  if (options?.body?.file) {
    const files = options.body.file;
    files.map((item, i) => {
      const upfileKey = `upfile${i + 1}`;
      upfile[upfileKey] = item;
    });
    delete options.body.file;
  }
  if (upfile?.upfile1) {
    for (let key in upfile) {
      fdata.append(key, upfile[key]);
    }
  }
  for (let key in upfileObj) {
    if (key.includes('upfile')) {
      delete options.body[key];
      fdata.append(key, upfileObj[key]);
    }
  }
  const _jsonData = options.body;
  if (!empty(options.updateWithFrontObject)) {
    // 前端未传的表单值将被修改为空
    _jsonData.updateWithFrontObject = options.updateWithFrontObject;
  }
  let jsonstr = JSON.stringify(_jsonData);
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
  if (url !== '/nlg/login' && url !== '/nlg/getVerifyCode') {
    const ACCESS_TOKEN = storage.get('token');
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
  const { response } = error;
  if (response && response.status) {
    const errorText =
      'An error occurred on the server. Please check the server！';
    const { status, url } = response;
    message.error(errorText);
  } else if (!response) {
    message.error(errorText);
  }
  storage.set({ name: 'btnLoading', value: false });
  return response;
};

/**
 * Response processing
 */
const responHandler = async (response, options) => {
  const res = await response.clone().json();
  let reBase64Str;
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
    message.error(reData?.tipMsg);
  }
  if (reData.code === 110 && reData.tipMsg === 'Token失效') {
    logout();
  }
  storage.set({ name: 'btnLoading', value: false });
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
