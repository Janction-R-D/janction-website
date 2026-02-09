/**
 * 卡片列表Hook（根据真实API重构）
 * 职责：管理卡片列表的获取、刷新、筛选、分页等业务逻辑
 *
 * 艹，适配Tevau真实API的卡片列表Hook
 */

import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { getCardListByUserCode } from '@/services/tevau/card';
import { handleTevauError } from '@/utils/tevau';

/**
 * 卡片列表Hook
 * @param {String} userCode - Tevau用户编码
 * @param {Boolean} autoFetch - 是否自动获取数据
 * @param {Object} initialParams - 初始查询参数
 * @returns {Object} Hook返回值
 */
export default function useCardList(
  userCode,
  autoFetch = true,
  initialParams = {},
) {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filterParams, setFilterParams] = useState(initialParams);

  /**
   * 获取卡片列表
   */
  const fetchCards = useCallback(
    async (params = {}) => {
      if (!userCode) {
        console.warn('UserCode is required for fetching cards');
        return;
      }

      setLoading(true);

      try {
        const response = await getCardListByUserCode({
          userCode,
          page: pagination.current,
          limit: pagination.pageSize,
          ...filterParams,
          ...params,
        });

        // Tevau响应格式：{ code, msg, data, ok }
        if (response.code === 0 && response.ok) {
          const { list = [], total = 0, pages = 0 } = response.data || {};

          setCards(list);
          setPagination((prev) => ({
            ...prev,
            total,
          }));
        } else {
          throw new Error(response.msg || 'Failed to fetch cards');
        }
      } catch (err) {
        const errorMsg = handleTevauError(err);
        message.error(errorMsg);
        setCards([]);
      } finally {
        setLoading(false);
      }
    },
    [userCode, pagination.current, pagination.pageSize, filterParams],
  );

  /**
   * 刷新列表
   */
  const refresh = useCallback(() => {
    fetchCards();
  }, [fetchCards]);

  /**
   * 改变分页
   */
  const changePage = useCallback((page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize,
    }));
  }, []);

  /**
   * 设置筛选条件
   */
  const filter = useCallback((params) => {
    setFilterParams(params);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  }, []);

  /**
   * 重置筛选
   */
  const resetFilter = useCallback(() => {
    setFilterParams({});
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  }, []);

  // 当分页或筛选条件改变时，重新获取数据
  useEffect(() => {
    if (autoFetch && userCode) {
      fetchCards();
    }
  }, [
    pagination.current,
    pagination.pageSize,
    filterParams,
    autoFetch,
    userCode,
  ]);

  return {
    loading,
    cards,
    pagination,
    filterParams,
    fetchCards,
    refresh,
    changePage,
    filter,
    resetFilter,
  };
}
