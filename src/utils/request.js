import { extend } from 'umi-request';
import storage from './storage';
import { logout } from './lang';

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
request.interceptors.response.use((response) => {
  return response;
});

export default request;
