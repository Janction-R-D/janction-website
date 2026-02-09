/**
 * Tevau错误处理工具
 * 职责：统一处理Tevau API的错误，提供友好的错误提示
 *
 * 艹，错误处理必须统一，不然到处都是重复的错误处理代码
 */

// 错误码对应的友好提示信息
const ERROR_MESSAGES = {
  // KYC相关错误
  KYC_NOT_VERIFIED: 'Please complete KYC verification first',
  KYC_PENDING: 'Your KYC verification is under review',
  KYC_REJECTED: 'Your KYC verification was rejected. Please resubmit.',
  KYC_EXPIRED: 'Your KYC verification has expired. Please resubmit.',
  KYC_REQUIRED: 'KYC verification is required for this operation',

  // 卡片相关错误
  CARD_LIMIT_REACHED: 'You have reached the maximum card limit',
  CARD_NOT_FOUND: 'Card not found',
  CARD_ALREADY_FROZEN: 'Card is already frozen',
  CARD_ALREADY_ACTIVE: 'Card is already active',
  CARD_ALREADY_CLOSED: 'Card has been closed and cannot be operated',
  INVALID_CARD_TYPE: 'Invalid card type',
  INVALID_CARD_STATUS: 'Current card status does not allow this operation',
  CARD_UPGRADE_NOT_ALLOWED: 'This card cannot be upgraded',

  // 账户相关错误
  INSUFFICIENT_BALANCE: 'Insufficient balance in your account',
  ACCOUNT_SUSPENDED: 'Your account has been suspended',
  ACCOUNT_NOT_FOUND: 'Account not found',
  INVALID_AMOUNT: 'Invalid amount',
  MINIMUM_AMOUNT_NOT_MET: 'Amount does not meet minimum requirement',
  MAXIMUM_AMOUNT_EXCEEDED: 'Amount exceeds maximum limit',

  // 地址相关错误
  ADDRESS_NOT_FOUND: 'Address not found',
  INVALID_ADDRESS: 'Invalid address information',
  DEFAULT_ADDRESS_REQUIRED: 'At least one default address is required',

  // 文档上传相关错误
  FILE_TOO_LARGE: 'File size exceeds the maximum limit (5MB)',
  INVALID_FILE_FORMAT: 'Invalid file format. Only JPG, PNG, PDF are allowed',
  UPLOAD_FAILED: 'File upload failed. Please try again',

  // 认证相关错误
  UNAUTHORIZED: 'Authentication failed. Please login again',
  TOKEN_EXPIRED: 'Your session has expired. Please login again',
  INVALID_TOKEN: 'Invalid authentication token',
  PERMISSION_DENIED: 'You do not have permission to perform this operation',

  // 网络和系统错误
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  TIMEOUT: 'Request timeout. Please try again',
  SERVICE_UNAVAILABLE:
    'Service temporarily unavailable. Please try again later',

  // 参数验证错误
  INVALID_PARAMETER: 'Invalid parameter',
  MISSING_REQUIRED_FIELD: 'Required field is missing',
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PHONE: 'Invalid phone number',
  INVALID_DATE: 'Invalid date format',

  // 业务规则错误
  OPERATION_NOT_ALLOWED: 'This operation is not allowed',
  DUPLICATE_REQUEST: 'Duplicate request detected',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later',
};

/**
 * 处理Tevau API错误
 * @param {Error|Object} error - 错误对象
 * @returns {String} 友好的错误提示
 */
export const handleTevauError = (error) => {
  console.error('[Tevau Error]', error);

  // 如果是网络错误
  if (!error.response && error.message === 'Network Error') {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // 如果是超时错误
  if (error.code === 'ECONNABORTED') {
    return ERROR_MESSAGES.TIMEOUT;
  }

  // 从响应中提取错误码
  const errorCode =
    error?.response?.data?.error_code ||
    error?.response?.data?.code ||
    error?.code ||
    error?.errorCode;

  // 根据错误码返回对应的错误提示
  if (errorCode && ERROR_MESSAGES[errorCode]) {
    return ERROR_MESSAGES[errorCode];
  }

  // 根据HTTP状态码返回错误提示
  const status = error?.response?.status;
  if (status) {
    switch (status) {
      case 400:
        return ERROR_MESSAGES.INVALID_PARAMETER;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.PERMISSION_DENIED;
      case 404:
        return 'Resource not found';
      case 429:
        return ERROR_MESSAGES.RATE_LIMIT_EXCEEDED;
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      case 503:
        return ERROR_MESSAGES.SERVICE_UNAVAILABLE;
      default:
        break;
    }
  }

  // 返回后端的错误消息
  const backendMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message;

  if (backendMessage) {
    return backendMessage;
  }

  // 默认错误提示
  return 'An unexpected error occurred. Please try again.';
};

/**
 * 判断是否为KYC相关错误
 * @param {String|Error} errorOrCode - 错误码或错误对象
 * @returns {Boolean}
 */
export const isKYCError = (errorOrCode) => {
  const errorCode =
    typeof errorOrCode === 'string'
      ? errorOrCode
      : errorOrCode?.response?.data?.error_code || errorOrCode?.code;

  return [
    'KYC_NOT_VERIFIED',
    'KYC_PENDING',
    'KYC_REJECTED',
    'KYC_EXPIRED',
    'KYC_REQUIRED',
  ].includes(errorCode);
};

/**
 * 判断是否为认证错误
 * @param {String|Error} errorOrCode - 错误码或错误对象
 * @returns {Boolean}
 */
export const isAuthError = (errorOrCode) => {
  const errorCode =
    typeof errorOrCode === 'string'
      ? errorOrCode
      : errorOrCode?.response?.data?.error_code || errorOrCode?.code;

  const status = errorOrCode?.response?.status;

  return (
    ['UNAUTHORIZED', 'TOKEN_EXPIRED', 'INVALID_TOKEN'].includes(errorCode) ||
    status === 401
  );
};

/**
 * 判断是否为网络错误
 * @param {Error} error - 错误对象
 * @returns {Boolean}
 */
export const isNetworkError = (error) => {
  return !error.response && error.message === 'Network Error';
};

/**
 * 获取错误码
 * @param {Error|Object} error - 错误对象
 * @returns {String|null} 错误码
 */
export const getErrorCode = (error) => {
  return (
    error?.response?.data?.error_code ||
    error?.response?.data?.code ||
    error?.code ||
    error?.errorCode ||
    null
  );
};

export default {
  handleTevauError,
  isKYCError,
  isAuthError,
  isNetworkError,
  getErrorCode,
  ERROR_MESSAGES,
};
