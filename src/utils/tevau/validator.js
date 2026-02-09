/**
 * Tevau表单验证工具
 * 职责：提供统一的表单验证规则和方法
 *
 * 艹，验证规则统一在这里，不要到处写重复的验证逻辑
 */

import { FILE_UPLOAD_CONFIG } from './constants';

/**
 * 验证邮箱格式
 * @param {String} email - 邮箱地址
 * @returns {Boolean}
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 验证手机号（国际格式）
 * @param {String} phone - 手机号
 * @returns {Boolean}
 */
export const validatePhone = (phone) => {
  // 支持国际格式，如：+1 234 567 8900 或 +86 138 1234 5678
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

/**
 * 验证邮编
 * @param {String} postalCode - 邮编
 * @param {String} country - 国家代码（可选）
 * @returns {Boolean}
 */
export const validatePostalCode = (postalCode, country) => {
  // 根据国家使用不同的验证规则
  const patterns = {
    US: /^\d{5}(-\d{4})?$/, // 美国：12345 或 12345-6789
    GB: /^[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}$/i, // 英国
    CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i, // 加拿大
    CN: /^\d{6}$/, // 中国
  };

  if (country && patterns[country]) {
    return patterns[country].test(postalCode);
  }

  // 默认验证：3-10位字母数字
  return /^[A-Z0-9\s-]{3,10}$/i.test(postalCode);
};

/**
 * 验证日期格式（YYYY-MM-DD）
 * @param {String} date - 日期字符串
 * @returns {Boolean}
 */
export const validateDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

/**
 * 验证年龄（必须年满18岁）
 * @param {String} dateOfBirth - 出生日期 (YYYY-MM-DD)
 * @returns {Boolean}
 */
export const validateAge = (dateOfBirth) => {
  if (!validateDate(dateOfBirth)) return false;

  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

/**
 * 验证文件大小
 * @param {File} file - 文件对象
 * @returns {Boolean}
 */
export const validateFileSize = (file) => {
  return file.size <= FILE_UPLOAD_CONFIG.MAX_SIZE;
};

/**
 * 验证文件格式
 * @param {File} file - 文件对象
 * @returns {Boolean}
 */
export const validateFileFormat = (file) => {
  return FILE_UPLOAD_CONFIG.ACCEPTED_FORMATS.includes(file.type);
};

/**
 * 验证文件（大小和格式）
 * @param {File} file - 文件对象
 * @returns {{ valid: Boolean, error: String }}
 */
export const validateFile = (file) => {
  if (!validateFileSize(file)) {
    return {
      valid: false,
      error: `File size exceeds ${FILE_UPLOAD_CONFIG.MAX_SIZE / 1024 / 1024}MB`,
    };
  }

  if (!validateFileFormat(file)) {
    return {
      valid: false,
      error: 'Invalid file format. Only JPG, PNG, PDF are allowed',
    };
  }

  return { valid: true, error: null };
};

/**
 * 验证金额
 * @param {Number} amount - 金额
 * @param {Number} min - 最小值
 * @param {Number} max - 最大值
 * @returns {Boolean}
 */
export const validateAmount = (amount, min = 0, max = Infinity) => {
  return typeof amount === 'number' && amount >= min && amount <= max;
};

/**
 * 验证卡号（仅用于显示格式化，不验证真实性）
 * @param {String} cardNumber - 卡号
 * @returns {Boolean}
 */
export const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cleaned);
};

/**
 * Ant Design Form验证规则 - 邮箱
 */
export const emailRule = {
  validator: (_, value) => {
    if (!value || validateEmail(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter a valid email address'));
  },
};

/**
 * Ant Design Form验证规则 - 手机号
 */
export const phoneRule = {
  validator: (_, value) => {
    if (!value || validatePhone(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter a valid phone number'));
  },
};

/**
 * Ant Design Form验证规则 - 年龄（18岁以上）
 */
export const ageRule = {
  validator: (_, value) => {
    if (!value || validateAge(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('You must be at least 18 years old'));
  },
};

/**
 * Ant Design Form验证规则 - 邮编
 */
export const postalCodeRule = (country) => ({
  validator: (_, value) => {
    if (!value || validatePostalCode(value, country)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter a valid postal code'));
  },
});

export default {
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateDate,
  validateAge,
  validateFileSize,
  validateFileFormat,
  validateFile,
  validateAmount,
  validateCardNumber,
  emailRule,
  phoneRule,
  ageRule,
  postalCodeRule,
};
