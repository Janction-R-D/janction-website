/**
 * Tevau KYC服务层（根据真实API文档重构）
 * 职责：封装所有与KYC验证相关的API调用
 *
 * 艹，KYC是Tevau的核心流程之一
 */

import { tevauRequest } from '@/utils/tevau/request';
import { TEVAU_ENDPOINTS } from './config';

/**
 * 提交KYC数据（V1版本）
 * POST /openapi/kyc/submitKycData
 *
 * @param {Object} data - KYC数据
 * @param {String} data.userCode - 用户编码
 * @param {String} data.countryArea - 国家/地区代码（如HK）
 * @param {String} data.firstNameEn - 英文名
 * @param {String} data.lastNameEn - 英文姓
 * @param {String} data.birthday - 出生日期 (YYYY-MM-DD)
 * @param {String} data.identityCardType - 证件类型 (0=身份证, 1=护照, 2=驾照)
 * @param {String} data.identityFrontPicUrl - 证件正面照URL
 * @param {String} data.identityBackPicUrl - 证件反面照URL（身份证需要）
 * @param {String} data.identityCard - 证件号码
 * @param {String} data.identityCardValidityTime - 证件有效期 (YYYY-MM-DD)
 * @returns {Promise<Object>}
 */
export async function submitKycData(data) {
  return tevauRequest(TEVAU_ENDPOINTS.KYC.SUBMIT_KYC, data);
}

/**
 * 获取活体认证URL
 * POST /openapi/kyc/getKycUrl
 *
 * @param {String} userCode - 用户编码
 * @returns {Promise<Object>} { link, accountId, transactionId }
 */
export async function getKycUrl(userCode) {
  return tevauRequest(TEVAU_ENDPOINTS.KYC.GET_KYC_URL, { userCode });
}

/**
 * Sandbox环境模拟KYC审核（仅测试环境）
 * POST /openapi/kyc/simUserKycAudit
 *
 * @param {Object} data
 * @param {Boolean} data.passOrNot - 是否通过审核
 * @param {String} data.userCode - 用户编码
 * @returns {Promise<Object>}
 */
export async function simUserKycAudit(data) {
  return tevauRequest(TEVAU_ENDPOINTS.KYC.SIM_AUDIT, data);
}
