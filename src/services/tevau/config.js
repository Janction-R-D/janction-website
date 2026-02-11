/**
 * Tevau API配置文件（根据真实API文档调整）
 * 职责：统一管理Tevau相关的配置和常量
 *
 * 艹，这是根据真实Tevau API文档重构的配置
 * 所有接口都是POST请求，需要签名认证
 */

// Tevau API基础地址（根据环境变量动态设置）
export const TEVAU_API_BASE =
  process.env.TEVAU_API_BASE || 'https://api.tevau.io';

// Tevau认证配置
export const TEVAU_CONFIG = {
  apiKey: process.env.TEVAU_API_KEY || '', // x-nexus-api-key
  appId: process.env.TEVAU_APP_ID || '', // appId
  version: process.env.TEVAU_VERSION || 'v1', // versions
  privateKey: process.env.TEVAU_PRIVATE_KEY || '', // RSA私钥用于签名
};

// API端点配置（所有接口都是POST）
export const TEVAU_ENDPOINTS = {
  // 01. 客户管理
  USER: {
    ADD_USER: '/openapi/user/addUser', // 创建客户
    QUERY_USER: '/openapi/user/queryUser', // 查询客户
  },

  // 02. KYC身份验证
  KYC: {
    SUBMIT_KYC: '/openapi/kyc/submitKycData', // 提交KYC数据
    GET_KYC_URL: '/openapi/kyc/getKycUrl', // 获取活体认证URL
    GET_KYC_INFO: '/openapi/kyc/getKycInfo', // 查询客户KYC状态和信息
    SIM_AUDIT: '/openapi/kyc/simUserKycAudit', // Sandbox模拟KYC审核
  },

  // 03. 卡片管理
  CARD: {
    SUBMIT_CARD: '/openapi/card/submitCard', // 创建卡
    GET_CARD_LIST: '/openapi/card/getCardListByUserCode', // 查询卡列表
    GET_CARD_DETAIL: '/openapi/query/card/getCardDetail', // 查询卡详情
    ADJUST_BALANCE: '/openapi/card/adjustCardBalance', // 调整卡余额
    BIND_CARD: '/openapi/card/bindCard', // 绑定实体卡
    CANCEL_CARD: '/openapi/card/cancelCard', // 注销卡
    FREEZE_CARD: '/openapi/card/freezeCard', // 冻结卡
    UNFREEZE_CARD: '/openapi/card/unfreezeCard', // 解冻卡
    ACTIVE_CARD: '/openapi/card/activeCard', // 激活实体卡
    GET_CARD_PAN: '/openapi/card/getCardPanHtml', // 查询卡PAN-HTML
    GET_PIN_CODE: '/openapi/card/getPinCode', // 查询PIN码
    GET_CARD_LIMIT: '/openapi/card/getCardLimit', // 查询卡限额
    UPDATE_CARD_FEE: '/openapi/card/updateCardFee', // 调整卡费用
    GET_CARD_FEE: '/openapi/card/getCardFee', // 查询卡费用
    CONFIRM_3DS: '/openapi/card/confirm3DS', // 3DS授权确认
    UPDATE_PHONE: '/openapi/card/updateCardPhoneNumber', // 更新手机号
    UPDATE_EMAIL: '/openapi/card/updateCardEmail', // 更新邮箱
    UPDATE_PIN: '/openapi/card/updateCardPin', // 修改PIN
  },

  // 04. 物流信息
  LOGISTICS: {
    GET_INFO: '/openapi/logistics/getLogisticsInfo', // 查询物流信息
  },

  // 05. 预付款账户
  ACCOUNT: {
    GET_BALANCE: '/openapi/query/getAccountBalance', // 查询余额
    GET_DETAIL_PAGE: '/openapi/query/getAccountDetailPage', // 查询交易列表
  },

  // 06. 交易记录
  TRANSACTION: {
    GET_BILL_PAGE: '/openapi/query/getBillPage', // 查询交易记录
    GET_BILL_DETAIL: '/openapi/query/getBillDetail', // 查询交易详情
  },

  // 07. 模拟交易（测试环境）
  TRADE_SIM: {
    AUTHORISATION: '/openapi/trade/authorisation', // 模拟授权
    CLEARING: '/openapi/trade/clearing', // 模拟结算
    REFUND: '/openapi/trade/refund', // 模拟退款
    REVERSAL: '/openapi/trade/reversal', // 模拟退单
    SIMULATE_3DS: '/openapi/trade/3dsSimulate', // 模拟3DS
    CARD_STATUS: '/openapi/trade/auth/cardStatus', // 模拟卡状态
  },
};

// 请求超时配置
export const TEVAU_TIMEOUT = 30000; // 30秒

// 卡片状态映射（根据API文档）
export const TEVAU_CARD_STATUS = {
  0: 'INACTIVE', // 未激活
  1: 'ACTIVE', // 激活
  2: 'FROZEN', // 冻结
  3: 'CANCELLED', // 注销
  4: 'LOST', // 挂失
};

// 证件类型（根据API文档）
export const TEVAU_IDENTITY_CARD_TYPE = {
  0: 'ID_CARD', // 身份证
  1: 'PASSPORT', // 护照
  2: 'DRIVING_LICENSE', // 驾照
};

export default {
  TEVAU_API_BASE,
  TEVAU_CONFIG,
  TEVAU_ENDPOINTS,
  TEVAU_TIMEOUT,
  TEVAU_CARD_STATUS,
  TEVAU_IDENTITY_CARD_TYPE,
};
