/**
 * 卡片升级Hook
 * 职责：管理卡片升级（虚拟卡→实体卡）的业务逻辑
 *
 * 艹，升级实体卡需要地址信息，这个Hook处理所有相关逻辑
 */

import { useState, useCallback } from 'react';
import { message } from 'antd';
import { upgradeToPhysicalCard } from '@/services/tevau';
import { handleTevauError } from '@/utils/tevau';

/**
 * 卡片升级Hook
 * @returns {Object} { loading, error, upgradeCard, reset }
 */
export default function useCardUpgrade() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 升级为实体卡
   * @param {String} cardId - 卡片ID
   * @param {Object} upgradeData - 升级数据（地址等）
   * @returns {Object} { success, data, error }
   */
  const upgradeCard = useCallback(async (cardId, upgradeData) => {
    if (!cardId) {
      message.error('Card ID is required');
      return { success: false, error: 'Card ID is required' };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await upgradeToPhysicalCard(cardId, upgradeData);

      if (response.code === 0 || response.success) {
        message.success('Card upgrade request submitted successfully!');

        return {
          success: true,
          data: response.data,
        };
      } else {
        throw new Error(response.message || 'Upgrade failed');
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      setError(errorMsg);
      message.error(errorMsg);

      return {
        success: false,
        error: errorMsg,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 重置状态
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    loading,
    error,
    upgradeCard,
    reset,
  };
}
