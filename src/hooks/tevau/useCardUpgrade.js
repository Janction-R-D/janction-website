/**
 * 卡片绑定Hook（根据真实API重构）
 * 职责：管理虚拟卡与实体卡的绑定
 *
 * 艹，Tevau的"升级"实际上是通过bindCard绑定实体卡实现的
 * 不是单独的upgrade接口！
 */

import { useState, useCallback } from 'react';
import { message } from 'antd';
import { bindCard } from '@/services/tevau';
import { handleTevauError } from '@/utils/tevau';

/**
 * 卡片绑定Hook
 * @returns {Object} { loading, error, bindPhysicalCard, reset }
 */
export default function useCardUpgrade() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 绑定实体卡
   * @param {String} cardId - 虚拟卡ID
   * @param {String} physicalCardId - 实体卡ID
   * @returns {Object} { success, data, error }
   */
  const bindPhysicalCard = useCallback(async (cardId, physicalCardId) => {
    if (!cardId || !physicalCardId) {
      const errorMsg = 'Card ID and Physical Card ID are required';
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await bindCard({ cardId, physicalCardId });

      if (response.code === 0 && response.ok) {
        message.success('Physical card bound successfully!');

        return {
          success: true,
          data: response.data,
        };
      } else {
        throw new Error(response.msg || 'Binding failed');
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
    bindPhysicalCard,
    upgradeCard: bindPhysicalCard, // 兼容旧的API名称
    reset,
  };
}
