/**
 * Tevau用户服务层
 * 职责：封装所有与Tevau用户相关的API调用
 *
 * 艹，这是根据真实API文档重构的用户服务
 */

import { tevauRequest } from '@/utils/tevau/request';
import { TEVAU_ENDPOINTS } from './config';

/**
 * 创建Tevau客户
 * POST /openapi/user/addUser
 *
 * @param {Object} data
 * @param {String} data.thirdId - 第三方用户唯一标识
 * @returns {Promise<Object>} { userCode, thirdId }
 */
export async function addUser(data) {
  return tevauRequest(TEVAU_ENDPOINTS.USER.ADD_USER, data);
}

/**
 * 查询Tevau客户
 * POST /openapi/user/queryUser
 *
 * @param {Object} data
 * @param {String} data.thirdId - 第三方用户唯一标识
 * @returns {Promise<Object>} 用户信息
 */
export async function queryUser(data) {
  return tevauRequest(TEVAU_ENDPOINTS.USER.QUERY_USER, data);
}

/**
 * 确保用户存在（如果不存在则创建）
 * @param {String} thirdId - 第三方用户ID
 * @returns {Promise<Object>} { userCode, thirdId }
 */
export async function ensureUser(thirdId) {
  try {
    // 先查询
    const queryResult = await queryUser({ thirdId });
    if (queryResult.code === 0 && queryResult.ok) {
      return queryResult.data;
    }
  } catch (err) {
    // 查询失败，尝试创建
  }

  // 创建用户
  const createResult = await addUser({ thirdId });
  if (createResult.code === 0 && createResult.ok) {
    return createResult.data;
  }

  throw new Error('Failed to ensure user');
}
