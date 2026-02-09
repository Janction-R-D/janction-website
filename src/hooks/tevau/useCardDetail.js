/**
 * 卡片详情Hook（根据真实API重构）
 * 职责：管理单张卡片的详情获取和操作
 *
 * 艹，单张卡片的所有操作
 */

import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import {
  getCardDetail,
  freezeCard,
  unfreezeCard,
  cancelCard,
  activeCard,
  getCardPanHtml,
  getPinCode,
} from '@/services/tevau/card';
import { getBillPage } from '@/services/tevau/transaction';
import { handleTevauError } from '@/utils/tevau';

/**
 * 卡片详情Hook
 * @param {String} cardId - 卡片ID
 * @param {Boolean} autoFetch - 是否自动获取详情
 * @returns {Object} Hook返回值
 */
export default function useCardDetail(cardId, autoFetch = true) {
  const [loading, setLoading] = useState(false);
  const [cardDetail, setCardDetail] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [panHtml, setPanHtml] = useState(null);
  const [pinCode, setPinCode] = useState(null);

  /**
   * 获取卡片详情
   */
  const fetchDetail = useCallback(async () => {
    if (!cardId) return;

    setLoading(true);

    try {
      const response = await getCardDetail(cardId);

      if (response.code === 0 && response.ok) {
        setCardDetail(response.data);
      } else {
        throw new Error(response.msg || 'Failed to fetch card detail');
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [cardId]);

  /**
   * 获取交易记录
   */
  const fetchTransactions = useCallback(
    async (params = {}) => {
      if (!cardId) return;

      setTransactionsLoading(true);

      try {
        const response = await getBillPage({
          cardId,
          page: 1,
          limit: 20,
          ...params,
        });

        if (response.code === 0 && response.ok) {
          setTransactions(response.data?.list || []);
        } else {
          throw new Error(response.msg || 'Failed to fetch transactions');
        }
      } catch (err) {
        const errorMsg = handleTevauError(err);
        message.error(errorMsg);
      } finally {
        setTransactionsLoading(false);
      }
    },
    [cardId],
  );

  /**
   * 冻结卡片
   */
  const freeze = useCallback(async () => {
    if (!cardId) return { success: false, error: 'Card ID is required' };

    setLoading(true);

    try {
      const response = await freezeCard(cardId);

      if (response.code === 0 && response.ok) {
        message.success('Card frozen successfully!');
        await fetchDetail();
        return { success: true };
      } else {
        throw new Error(response.msg || 'Failed to freeze card');
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [cardId, fetchDetail]);

  /**
   * 解冻卡片
   */
  const unfreeze = useCallback(async () => {
    if (!cardId) return { success: false, error: 'Card ID is required' };

    setLoading(true);

    try {
      const response = await unfreezeCard(cardId);

      if (response.code === 0 && response.ok) {
        message.success('Card unfrozen successfully!');
        await fetchDetail();
        return { success: true };
      } else {
        throw new Error(response.msg || 'Failed to unfreeze card');
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [cardId, fetchDetail]);

  /**
   * 注销卡片
   */
  const cancel = useCallback(async () => {
    if (!cardId) return { success: false, error: 'Card ID is required' };

    setLoading(true);

    try {
      const response = await cancelCard(cardId);

      if (response.code === 0 && response.ok) {
        message.success('Card cancelled successfully!');
        await fetchDetail();
        return { success: true };
      } else {
        throw new Error(response.msg || 'Failed to cancel card');
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [cardId, fetchDetail]);

  /**
   * 激活实体卡
   */
  const activate = useCallback(
    async (activeCode) => {
      if (!cardId) return { success: false, error: 'Card ID is required' };

      setLoading(true);

      try {
        const response = await activeCard({ cardId, activeCode });

        if (response.code === 0 && response.ok) {
          message.success('Card activated successfully!');
          await fetchDetail();
          return { success: true };
        } else {
          throw new Error(response.msg || 'Failed to activate card');
        }
      } catch (err) {
        const errorMsg = handleTevauError(err);
        message.error(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [cardId, fetchDetail],
  );

  /**
   * 获取卡片PAN信息
   */
  const fetchPan = useCallback(async () => {
    if (!cardId) return;

    try {
      const response = await getCardPanHtml(cardId);

      if (response.code === 0 && response.ok) {
        setPanHtml(response.data);
        return { success: true, data: response.data };
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, [cardId]);

  /**
   * 获取PIN码
   */
  const fetchPin = useCallback(async () => {
    if (!cardId) return;

    try {
      const response = await getPinCode(cardId);

      if (response.code === 0 && response.ok) {
        setPinCode(response.data);
        return { success: true, data: response.data };
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, [cardId]);

  /**
   * 刷新详情
   */
  const refresh = useCallback(() => {
    fetchDetail();
  }, [fetchDetail]);

  // 自动获取卡片详情
  useEffect(() => {
    if (autoFetch && cardId) {
      fetchDetail();
    }
  }, [autoFetch, cardId, fetchDetail]);

  return {
    loading,
    cardDetail,
    transactions,
    transactionsLoading,
    panHtml,
    pinCode,
    fetchDetail,
    fetchTransactions,
    freeze,
    unfreeze,
    cancel,
    activate,
    fetchPan,
    fetchPin,
    refresh,
  };
}
