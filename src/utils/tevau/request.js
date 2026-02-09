/**
 * Tevau专用请求工具
 * 职责：处理Tevau API的签名、认证和请求
 *
 * 艹，Tevau的认证比较复杂，需要RSA签名
 * 这里封装统一的请求方法
 */

import request from '@/utils/request';
import { TEVAU_API_BASE, TEVAU_CONFIG } from '@/services/tevau/config';
import CryptoJS from 'crypto-js'; // 如果需要用crypto-js做签名

/**
 * 生成随机字符串
 * @param {Number} length - 长度
 * @returns {String}
 */
const generateNonce = (length = 16) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * 生成签名
 * 签名规则：除sign, x-nexus-api-key, versions外的所有非空参数
 * 按ASCII排序拼接成 key=value&...，再用RSA私钥签名
 *
 * 艹，这里需要你实现真实的RSA签名逻辑
 * 目前只是模拟，你需要根据Tevau官方签名说明实现
 *
 * @param {Object} params - 请求参数
 * @param {String} timestamp - 时间戳
 * @param {String} nonce - 随机字符串
 * @returns {String} 签名字符串
 */
const generateSign = (params, timestamp, nonce) => {
  // 1. 收集所有参数（排除sign, x-nexus-api-key, versions）
  const signParams = {
    appId: TEVAU_CONFIG.appId,
    timestamp,
    nonce,
    ...params, // 请求body参数
  };

  // 2. 过滤空值
  const filteredParams = Object.keys(signParams)
    .filter(
      (key) =>
        signParams[key] !== null &&
        signParams[key] !== undefined &&
        signParams[key] !== '',
    )
    .reduce((obj, key) => {
      obj[key] = signParams[key];
      return obj;
    }, {});

  // 3. 按ASCII排序
  const sortedKeys = Object.keys(filteredParams).sort();

  // 4. 拼接成 key=value&key=value
  const signString = sortedKeys
    .map((key) => {
      const value = filteredParams[key];
      // 如果是对象，需要JSON.stringify
      const stringValue =
        typeof value === 'object' ? JSON.stringify(value) : value;
      return `${key}=${stringValue}`;
    })
    .join('&');

  console.log('[Tevau Sign String]', signString);

  // 5. RSA签名
  // 艹，这里需要你实现真实的RSA签名
  // 示例使用简单的hash，实际应该用RSA私钥签名
  // TODO: 实现真实的RSA签名逻辑
  // const sign = RSA.sign(signString, TEVAU_CONFIG.privateKey);

  // 临时模拟签名（需要替换为真实RSA签名）
  const sign = CryptoJS.SHA256(signString + TEVAU_CONFIG.privateKey).toString();

  return sign;
};

/**
 * Tevau统一请求方法
 * @param {String} endpoint - API端点
 * @param {Object} data - 请求数据
 * @param {Object} options - 额外选项
 * @returns {Promise}
 */
export const tevauRequest = async (endpoint, data = {}, options = {}) => {
  const timestamp = Date.now().toString();
  const nonce = generateNonce();

  // 生成签名
  const sign = generateSign(data, timestamp, nonce);

  // 构建请求头
  const headers = {
    'Content-Type': 'application/json',
    'x-nexus-api-key': TEVAU_CONFIG.apiKey,
    versions: TEVAU_CONFIG.version,
    appId: TEVAU_CONFIG.appId,
    timestamp: timestamp,
    nonce: nonce,
    sign: sign,
    ...options.headers,
  };

  // 发送请求（所有Tevau接口都是POST）
  return request(`${TEVAU_API_BASE}${endpoint}`, {
    method: 'POST',
    data,
    headers,
    ...options,
  });
};

/**
 * 处理Tevau响应
 * Tevau响应格式：{ code, msg, data, ok }
 * code == 0 && ok == true 表示成功
 *
 * @param {Object} response - API响应
 * @returns {Object} 标准化后的响应
 */
export const handleTevauResponse = (response) => {
  if (response.code === 0 && response.ok === true) {
    return {
      success: true,
      data: response.data,
      message: response.msg,
    };
  } else {
    return {
      success: false,
      data: null,
      message: response.msg || 'Request failed',
      errorCode: response.code,
    };
  }
};

export default {
  tevauRequest,
  handleTevauResponse,
  generateNonce,
  generateSign,
};
