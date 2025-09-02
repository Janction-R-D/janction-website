import { extend } from 'umi-request';
import storage from './storage';
import { logout } from './lang';
import { message } from 'antd';
import { notShowErrors } from '../constant';

// 创建一个 request 实例
const request = extend({
  // 默认配置
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
request.interceptors.request.use((url, options) => {
  // 例：阻止访问特定域名
  if (url.includes('maliva-mcs.byteoversea.com')) {
    console.warn('Blocked request to unsafe domain:', url);
    // 可以抛出异常阻止请求
    throw new Error('Request to blocked domain');
  }

  // 处理 loginAuth 参数
  const { loginAuth, ...restOptions } = options;

  // 可以修改 options，例如添加 token
  const newOptions = {
    ...restOptions,
    headers: {
      ...restOptions.headers,
      // 如果需要认证，使用标准的Authorization头
      // 'Authorization': `Bearer ${token}`, // 如果有token的话
    },
  };

  // 如果 loginAuth 为 true，添加认证逻辑
  if (loginAuth) {
    const AUTH_HEADERS = storage.get('AUTH_HEADERS');
    const TOKEN = storage.get('TOKEN');

    if (!AUTH_HEADERS && !TOKEN) {
      // 如果没有认证信息，重定向到登录页面
      console.warn('No authentication token found, redirecting to login');
      logout();
      return { url, options: newOptions };
    } else {
      // 添加认证头
      const authHeader = {
        ...AUTH_HEADERS,
        ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
      };
      newOptions.headers = {
        ...newOptions.headers,
        ...authHeader,
      };
    }
  }

  return { url, options: newOptions };
});

// 添加响应拦截器
request.interceptors.response.use(
  async (response, options) => {
    const url = options.url;
    let res;

    try {
      res = await response.clone().json();
    } catch (error) {
      // Handle non-JSON formatted response data
      res = await response.clone().text();
    }

    // 处理非v0接口的响应
    if (!url.includes('/v0')) return res;

    // 处理认证状态接口
    if (url.includes('authentication/status')) {
      if (res?.message == 'success') return res;
      throw new Error('Invalid session');
    }

    // 处理成功响应
    if (res?.success && res?.data) return res?.data;

    // 处理错误响应
    if (res?.code && res?.message) {
      let error = `${res.code}:${res.message}`;
      if (notShowErrors.includes(res.code)) {
        throw new Error(error);
      }
      message.error(error);
      throw new Error(error);
    }

    return res;
  },
  (error) => {
    // 错误处理
    if (!error?.response) throw error;
    const { response } = error;
    const errorText =
      'An error occurred on the server. Please check the server！';
    if (response?.status == 504) {
      message.error(errorText);
    }
    throw response?.statusText;
  },
);

export default request;
