/**
 * Tevau卡片服务层（根据真实API文档重构）
 * 职责：封装所有与Tevau卡片相关的API调用
 *
 * 艹，这是根据真实API文档重新实现的
 * 所有接口都是POST，响应格式统一
 */

import { tevauRequest } from '@/utils/tevau/request';
import { TEVAU_ENDPOINTS } from './config';

/**
 * 创建卡片
 * POST /openapi/card/submitCard
 *
 * @param {Object} data - 卡片数据
 * @param {String} data.userCode - 用户编码（从addUser获取）
 * @param {Number} data.cardCode - 卡片类型代码（1004等）
 * @param {String} data.dialCode - 区号
 * @param {String} data.phoneNumber - 手机号
 * @param {String} data.email - 邮箱
 * @param {Object} data.billingAddress - 账单地址
 * @param {Object} data.postalAddress - 邮寄地址（实体卡需要）
 * @returns {Promise<Object>} { cardId, orderNo }
 */
export async function submitCard(data) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.SUBMIT_CARD, data);
}

/**
 * 查询用户的卡片列表
 * POST /openapi/card/getCardListByUserCode
 *
 * @param {Object} params - 查询参数
 * @param {String} params.userCode - 用户编码
 * @param {Number} params.status - 卡片状态（可选）
 * @param {Number} params.page - 页码
 * @param {Number} params.limit - 每页数量
 * @returns {Promise<Object>} 卡片列表
 */
export async function getCardListByUserCode(params) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.GET_CARD_LIST, params);
}

/**
 * 查询卡片详情
 * POST /openapi/query/card/getCardDetail
 *
 * @param {String} cardId - 卡片ID
 * @returns {Promise<Object>} 卡片详情
 */
export async function getCardDetail(cardId) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.GET_CARD_DETAIL, { cardId });
}

/**
 * 调整卡片余额
 * POST /openapi/card/adjustCardBalance
 *
 * @param {Object} data
 * @param {String} data.cardId - 卡片ID
 * @param {String} data.amount - 调整金额
 * @param {String} data.type - 调整类型
 * @returns {Promise<Object>}
 */
export async function adjustCardBalance(data) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.ADJUST_BALANCE, data);
}

/**
 * 绑定实体卡
 * POST /openapi/card/bindCard
 *
 * @param {Object} data
 * @param {String} data.cardId - 虚拟卡ID
 * @param {String} data.physicalCardId - 实体卡ID
 * @returns {Promise<Object>}
 */
export async function bindCard(data) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.BIND_CARD, data);
}

/**
 * 注销卡片
 * POST /openapi/card/cancelCard
 *
 * @param {String} cardId - 卡片ID
 * @returns {Promise<Object>}
 */
export async function cancelCard(cardId) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.CANCEL_CARD, { cardId });
}

/**
 * 冻结卡片
 * POST /openapi/card/freezeCard
 *
 * @param {String} cardId - 卡片ID
 * @returns {Promise<Object>}
 */
export async function freezeCard(cardId) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.FREEZE_CARD, { cardId });
}

/**
 * 解冻卡片
 * POST /openapi/card/unfreezeCard
 *
 * @param {String} cardId - 卡片ID
 * @returns {Promise<Object>}
 */
export async function unfreezeCard(cardId) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.UNFREEZE_CARD, { cardId });
}

/**
 * 激活实体卡
 * POST /openapi/card/activeCard
 *
 * @param {Object} data
 * @param {String} data.cardId - 卡片ID
 * @param {String} data.activeCode - 激活码
 * @returns {Promise<Object>}
 */
export async function activeCard(data) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.ACTIVE_CARD, data);
}

/**
 * 获取卡片PAN信息（HTML格式）
 * POST /openapi/card/getCardPanHtml
 *
 * @param {String} cardId - 卡片ID
 * @returns {Promise<Object>} HTML内容
 */
export async function getCardPanHtml(cardId) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.GET_CARD_PAN, { cardId });
}

/**
 * 获取PIN码
 * POST /openapi/card/getPinCode
 *
 * @param {String} cardId - 卡片ID
 * @returns {Promise<Object>} PIN码信息
 */
export async function getPinCode(cardId) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.GET_PIN_CODE, { cardId });
}

/**
 * 查询卡片限额
 * POST /openapi/card/getCardLimit
 *
 * @param {String} cardId - 卡片ID
 * @returns {Promise<Object>} 限额信息
 */
export async function getCardLimit(cardId) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.GET_CARD_LIMIT, { cardId });
}

/**
 * 更新卡片费用
 * POST /openapi/card/updateCardFee
 *
 * @param {Object} data
 * @param {String} data.cardId - 卡片ID
 * @param {Array} data.cardFeeConfigList - 费用配置列表
 * @returns {Promise<Object>}
 */
export async function updateCardFee(data) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.UPDATE_CARD_FEE, data);
}

/**
 * 查询卡片费用
 * POST /openapi/card/getCardFee
 *
 * @param {String} cardId - 卡片ID
 * @returns {Promise<Object>} 费用信息
 */
export async function getCardFee(cardId) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.GET_CARD_FEE, { cardId });
}

/**
 * 3DS授权确认/取消
 * POST /openapi/card/confirm3DS
 *
 * @param {Object} data
 * @param {String} data.cardId - 卡片ID
 * @param {Boolean} data.confirm - 确认或取消
 * @returns {Promise<Object>}
 */
export async function confirm3DS(data) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.CONFIRM_3DS, data);
}

/**
 * 更新卡片手机号
 * POST /openapi/card/updateCardPhoneNumber
 *
 * @param {Object} data
 * @param {String} data.cardId - 卡片ID
 * @param {String} data.dialCode - 区号
 * @param {String} data.phoneNumber - 新手机号
 * @returns {Promise<Object>}
 */
export async function updateCardPhoneNumber(data) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.UPDATE_PHONE, data);
}

/**
 * 更新卡片邮箱
 * POST /openapi/card/updateCardEmail
 *
 * @param {Object} data
 * @param {String} data.cardId - 卡片ID
 * @param {String} data.email - 新邮箱
 * @returns {Promise<Object>}
 */
export async function updateCardEmail(data) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.UPDATE_EMAIL, data);
}

/**
 * 修改卡片PIN
 * POST /openapi/card/updateCardPin
 *
 * @param {Object} data
 * @param {String} data.cardId - 卡片ID
 * @param {String} data.newPin - 新PIN码
 * @returns {Promise<Object>}
 */
export async function updateCardPin(data) {
  return tevauRequest(TEVAU_ENDPOINTS.CARD.UPDATE_PIN, data);
}

/**
 * 切换卡片冻结状态（封装）
 * @param {String} cardId - 卡片ID
 * @param {Boolean} freeze - true=冻结，false=解冻
 * @returns {Promise<Object>}
 */
export async function toggleCardFreeze(cardId, freeze) {
  return freeze ? freezeCard(cardId) : unfreezeCard(cardId);
}
