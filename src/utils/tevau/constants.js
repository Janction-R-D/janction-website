/**
 * Tevau常量定义
 * 职责：统一管理所有Tevau相关的常量
 *
 * 艹，所有常量定义在这里，方便维护和修改
 */

// 卡片状态
export const CARD_STATUS = {
  PENDING: 'pending', // 申请中
  ACTIVE: 'active', // 激活
  FROZEN: 'frozen', // 冻结
  CLOSED: 'closed', // 已关闭
  UPGRADING: 'upgrading', // 升级中（虚拟→实体）
  PHYSICAL_SHIPPED: 'shipped', // 实体卡已发货
  PHYSICAL_DELIVERED: 'delivered', // 实体卡已送达
};

// 卡片状态显示文本
export const CARD_STATUS_TEXT = {
  [CARD_STATUS.PENDING]: 'Pending Application',
  [CARD_STATUS.ACTIVE]: 'Active',
  [CARD_STATUS.FROZEN]: 'Frozen',
  [CARD_STATUS.CLOSED]: 'Closed',
  [CARD_STATUS.UPGRADING]: 'Upgrading to Physical',
  [CARD_STATUS.PHYSICAL_SHIPPED]: 'Shipped',
  [CARD_STATUS.PHYSICAL_DELIVERED]: 'Delivered',
};

// 卡片状态颜色
export const CARD_STATUS_COLOR = {
  [CARD_STATUS.PENDING]: 'orange',
  [CARD_STATUS.ACTIVE]: 'green',
  [CARD_STATUS.FROZEN]: 'red',
  [CARD_STATUS.CLOSED]: 'default',
  [CARD_STATUS.UPGRADING]: 'blue',
  [CARD_STATUS.PHYSICAL_SHIPPED]: 'purple',
  [CARD_STATUS.PHYSICAL_DELIVERED]: 'green',
};

// KYC状态
export const KYC_STATUS = {
  NOT_STARTED: 'not_started', // 未开始
  PENDING: 'pending', // 审核中
  APPROVED: 'approved', // 已通过
  REJECTED: 'rejected', // 已拒绝
  EXPIRED: 'expired', // 已过期
};

// KYC状态显示文本
export const KYC_STATUS_TEXT = {
  [KYC_STATUS.NOT_STARTED]: 'Not Started',
  [KYC_STATUS.PENDING]: 'Under Review',
  [KYC_STATUS.APPROVED]: 'Approved',
  [KYC_STATUS.REJECTED]: 'Rejected',
  [KYC_STATUS.EXPIRED]: 'Expired',
};

// KYC状态颜色
export const KYC_STATUS_COLOR = {
  [KYC_STATUS.NOT_STARTED]: 'default',
  [KYC_STATUS.PENDING]: 'orange',
  [KYC_STATUS.APPROVED]: 'green',
  [KYC_STATUS.REJECTED]: 'red',
  [KYC_STATUS.EXPIRED]: 'volcano',
};

// 卡片类型
export const CARD_TYPE = {
  VIRTUAL: 'virtual', // 虚拟卡
  PHYSICAL: 'physical', // 实体卡
};

// 卡片类型显示文本
export const CARD_TYPE_TEXT = {
  [CARD_TYPE.VIRTUAL]: 'Virtual Card',
  [CARD_TYPE.PHYSICAL]: 'Physical Card',
};

// 支持的货币
export const CURRENCIES = [
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'EUR', label: 'Euro', symbol: '€' },
  { value: 'GBP', label: 'British Pound', symbol: '£' },
];

// KYC文档类型
export const KYC_DOCUMENT_TYPES = {
  ID_FRONT: 'id_front', // 身份证正面
  ID_BACK: 'id_back', // 身份证反面
  PASSPORT: 'passport', // 护照
  SELFIE: 'selfie', // 自拍照
  PROOF_OF_ADDRESS: 'proof_of_address', // 地址证明
  DRIVING_LICENSE_FRONT: 'driving_license_front', // 驾照正面
  DRIVING_LICENSE_BACK: 'driving_license_back', // 驾照反面
};

// KYC文档类型显示文本
export const KYC_DOCUMENT_TYPE_TEXT = {
  [KYC_DOCUMENT_TYPES.ID_FRONT]: 'ID Card (Front)',
  [KYC_DOCUMENT_TYPES.ID_BACK]: 'ID Card (Back)',
  [KYC_DOCUMENT_TYPES.PASSPORT]: 'Passport',
  [KYC_DOCUMENT_TYPES.SELFIE]: 'Selfie Photo',
  [KYC_DOCUMENT_TYPES.PROOF_OF_ADDRESS]: 'Proof of Address',
  [KYC_DOCUMENT_TYPES.DRIVING_LICENSE_FRONT]: 'Driving License (Front)',
  [KYC_DOCUMENT_TYPES.DRIVING_LICENSE_BACK]: 'Driving License (Back)',
};

// 证件类型
export const ID_TYPES = {
  PASSPORT: 'passport',
  ID_CARD: 'id_card',
  DRIVING_LICENSE: 'driving_license',
};

// 证件类型显示文本
export const ID_TYPE_TEXT = {
  [ID_TYPES.PASSPORT]: 'Passport',
  [ID_TYPES.ID_CARD]: 'ID Card',
  [ID_TYPES.DRIVING_LICENSE]: 'Driving License',
};

// 邮寄方式
export const SHIPPING_METHODS = {
  STANDARD: 'standard',
  EXPRESS: 'express',
};

// 邮寄方式显示文本
export const SHIPPING_METHOD_TEXT = {
  [SHIPPING_METHODS.STANDARD]: 'Standard Shipping (7-14 days)',
  [SHIPPING_METHODS.EXPRESS]: 'Express Shipping (3-5 days)',
};

// 交易类型
export const TRANSACTION_TYPES = {
  PURCHASE: 'purchase', // 购买
  REFUND: 'refund', // 退款
  WITHDRAWAL: 'withdrawal', // 提现
  DEPOSIT: 'deposit', // 充值
  FEE: 'fee', // 手续费
  REVERSAL: 'reversal', // 冲正
};

// 交易类型显示文本
export const TRANSACTION_TYPE_TEXT = {
  [TRANSACTION_TYPES.PURCHASE]: 'Purchase',
  [TRANSACTION_TYPES.REFUND]: 'Refund',
  [TRANSACTION_TYPES.WITHDRAWAL]: 'Withdrawal',
  [TRANSACTION_TYPES.DEPOSIT]: 'Deposit',
  [TRANSACTION_TYPES.FEE]: 'Fee',
  [TRANSACTION_TYPES.REVERSAL]: 'Reversal',
};

// 交易状态
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

// 交易状态显示文本
export const TRANSACTION_STATUS_TEXT = {
  [TRANSACTION_STATUS.PENDING]: 'Pending',
  [TRANSACTION_STATUS.COMPLETED]: 'Completed',
  [TRANSACTION_STATUS.FAILED]: 'Failed',
  [TRANSACTION_STATUS.CANCELLED]: 'Cancelled',
};

// 文件上传限制
export const FILE_UPLOAD_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
  ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf'],
};

// 国家列表（常用国家）
export const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'JP', label: 'Japan' },
  { value: 'SG', label: 'Singapore' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'CN', label: 'China' },
];

export default {
  CARD_STATUS,
  CARD_STATUS_TEXT,
  CARD_STATUS_COLOR,
  KYC_STATUS,
  KYC_STATUS_TEXT,
  KYC_STATUS_COLOR,
  CARD_TYPE,
  CARD_TYPE_TEXT,
  CURRENCIES,
  KYC_DOCUMENT_TYPES,
  KYC_DOCUMENT_TYPE_TEXT,
  ID_TYPES,
  ID_TYPE_TEXT,
  SHIPPING_METHODS,
  SHIPPING_METHOD_TEXT,
  TRANSACTION_TYPES,
  TRANSACTION_TYPE_TEXT,
  TRANSACTION_STATUS,
  TRANSACTION_STATUS_TEXT,
  FILE_UPLOAD_CONFIG,
  COUNTRIES,
};
