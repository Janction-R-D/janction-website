/**
 * Tevau交易记录服务层
 * 职责：封装所有与交易记录相关的API调用
 *
 * 艹，查询交易记录和账户余额
 */

import { tevauRequest } from '@/utils/tevau/request';
import { TEVAU_ENDPOINTS } from './config';

/**
 * 查询交易记录（分页）
 * POST /openapi/query/getBillPage
 *
 * @param {Object} params
 * @param {String} params.cardId - 卡片ID
 * @param {Number} params.page - 页码
 * @param {Number} params.limit - 每页数量
 * @param {String} params.createTimeStart - 开始时间（可选）
 * @param {String} params.createTimeEnd - 结束时间（可选）
 * @returns {Promise<Object>} { total, list, pages }
 */
export async function getBillPage(params) {
  return tevauRequest(TEVAU_ENDPOINTS.TRANSACTION.GET_BILL_PAGE, params);
}

/**
 * 查询单笔交易详情
 * POST /openapi/query/getBillDetail
 *
 * @param {Object} params
 * @param {String} params.orderId - 订单ID
 * @param {String} params.cardId - 卡片ID
 * @returns {Promise<Object>} 交易详情
 */
export async function getBillDetail(params) {
  return tevauRequest(TEVAU_ENDPOINTS.TRANSACTION.GET_BILL_DETAIL, params);
}

/**
 * 查询预付款账户余额
 * POST /openapi/query/getAccountBalance
 *
 * @returns {Promise<Object>} 余额信息
 */
export async function getAccountBalance() {
  return tevauRequest(TEVAU_ENDPOINTS.ACCOUNT.GET_BALANCE, {});
}

/**
 * 查询预付款账户交易列表（分页）
 * POST /openapi/query/getAccountDetailPage
 *
 * @param {Object} params
 * @param {String} params.tenantAccountingType - 账户类型（可选）
 * @param {String} params.tradeSn - 交易编号（可选）
 * @param {Number} params.page - 页码
 * @param {Number} params.limit - 每页数量
 * @returns {Promise<Object>} 交易列表
 */
export async function getAccountDetailPage(params) {
  return tevauRequest(TEVAU_ENDPOINTS.ACCOUNT.GET_DETAIL_PAGE, params);
}
