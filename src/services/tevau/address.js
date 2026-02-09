/**
 * Tevau地址服务层
 * 职责：封装所有与地址管理相关的API调用（用于实体卡邮寄）
 *
 * 艹，升级实体卡需要邮寄地址，这里管理所有地址相关操作
 */

import request from '@/utils/request';
import { TEVAU_API_BASE, TEVAU_ENDPOINTS } from './config';

/**
 * 获取地址列表
 * @returns {Promise<Array>} 地址列表
 */
export async function fetchAddressList() {
  return request(`${TEVAU_API_BASE}${TEVAU_ENDPOINTS.ADDRESS.LIST}`, {
    method: 'GET',
  });
}

/**
 * 添加新地址
 * @param {Object} data - 地址数据
 * @param {String} data.fullName - 收件人姓名
 * @param {String} data.phone - 联系电话
 * @param {String} data.addressLine1 - 地址行1
 * @param {String} data.addressLine2 - 地址行2（可选）
 * @param {String} data.city - 城市
 * @param {String} data.state - 州/省
 * @param {String} data.country - 国家
 * @param {String} data.postalCode - 邮编
 * @param {Boolean} data.isDefault - 是否设为默认地址
 * @returns {Promise<Object>} 新增的地址信息
 */
export async function addAddress(data) {
  return request(`${TEVAU_API_BASE}${TEVAU_ENDPOINTS.ADDRESS.ADD}`, {
    method: 'POST',
    data,
  });
}

/**
 * 更新地址
 * @param {String} addressId - 地址ID
 * @param {Object} data - 地址数据（同添加地址）
 * @returns {Promise<Object>} 更新后的地址信息
 */
export async function updateAddress(addressId, data) {
  const url = `${TEVAU_API_BASE}${TEVAU_ENDPOINTS.ADDRESS.UPDATE}`.replace(
    ':addressId',
    addressId,
  );
  return request(url, {
    method: 'PUT',
    data,
  });
}

/**
 * 删除地址
 * @param {String} addressId - 地址ID
 * @returns {Promise<Object>} 删除结果
 */
export async function deleteAddress(addressId) {
  const url = `${TEVAU_API_BASE}${TEVAU_ENDPOINTS.ADDRESS.DELETE}`.replace(
    ':addressId',
    addressId,
  );
  return request(url, {
    method: 'DELETE',
  });
}

/**
 * 设置默认地址
 * @param {String} addressId - 地址ID
 * @returns {Promise<Object>} 操作结果
 */
export async function setDefaultAddress(addressId) {
  const url = `${TEVAU_API_BASE}${TEVAU_ENDPOINTS.ADDRESS.SET_DEFAULT}`.replace(
    ':addressId',
    addressId,
  );
  return request(url, {
    method: 'POST',
  });
}
