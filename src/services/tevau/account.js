/**
 * Tevau账户服务层
 * 职责：封装所有与账户相关的API调用
 *
 * 艹，账户信息、余额查询等功能都在这里
 */

import request from '@/utils/request';
import { TEVAU_API_BASE, TEVAU_ENDPOINTS } from './config';

/**
 * 获取账户信息
 * @returns {Promise<Object>} 账户详细信息
 */
export async function fetchAccountInfo() {
  return request(`${TEVAU_API_BASE}${TEVAU_ENDPOINTS.ACCOUNT.INFO}`, {
    method: 'GET',
  });
}

/**
 * 获取账户余额
 * @returns {Promise<Object>} { balance: 0, currency: 'USD', available: 0, frozen: 0 }
 */
export async function fetchAccountBalance() {
  return request(`${TEVAU_API_BASE}${TEVAU_ENDPOINTS.ACCOUNT.BALANCE}`, {
    method: 'GET',
  });
}

/**
 * 账户充值
 * @param {Object} data - 充值数据
 * @param {Number} data.amount - 充值金额
 * @param {String} data.currency - 货币类型
 * @param {String} data.paymentMethod - 支付方式
 * @returns {Promise<Object>} 充值结果
 */
export async function depositAccount(data) {
  return request(`${TEVAU_API_BASE}${TEVAU_ENDPOINTS.ACCOUNT.DEPOSIT}`, {
    method: 'POST',
    data,
  });
}

/**
 * 账户提现
 * @param {Object} data - 提现数据
 * @param {Number} data.amount - 提现金额
 * @param {String} data.currency - 货币类型
 * @param {String} data.withdrawMethod - 提现方式
 * @param {String} data.withdrawAccount - 提现账户
 * @returns {Promise<Object>} 提现结果
 */
export async function withdrawAccount(data) {
  return request(`${TEVAU_API_BASE}${TEVAU_ENDPOINTS.ACCOUNT.WITHDRAW}`, {
    method: 'POST',
    data,
  });
}
