/**
 * 卡片申请Hook（根据真实API重构）
 * 职责：封装卡片申请的业务逻辑、状态管理、错误处理
 *
 * 艹，这个Hook处理整个卡片申请流程
 * 流程：创建用户 → 提交KYC → 创建卡片
 */

import { useState, useCallback } from 'react';
import { message } from 'antd';
import { addUser, queryUser } from '@/services/tevau/user';
import { submitCard } from '@/services/tevau/card';
import { submitKycData, getKycUrl } from '@/services/tevau/kyc';
import { handleTevauError } from '@/utils/tevau';

/**
 * 卡片申请Hook
 * @returns {Object} Hook返回值
 */
export default function useCardApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const [userCode, setUserCode] = useState(null);
  const [kycUrl, setKycUrl] = useState(null);

  /**
   * 创建或获取Tevau用户
   * @param {String} thirdId - 第三方用户ID（通常是你们系统的用户ID）
   * @returns {Object} { success, userCode, error }
   */
  const ensureUser = useCallback(async (thirdId) => {
    try {
      // 先尝试查询用户
      const queryRes = await queryUser({ thirdId });
      if (queryRes.code === 0 && queryRes.ok) {
        setUserCode(queryRes.data.userCode);
        return { success: true, userCode: queryRes.data.userCode };
      }
    } catch (err) {
      // 查询失败，尝试创建
    }

    // 创建新用户
    try {
      const createRes = await addUser({ thirdId });
      if (createRes.code === 0 && createRes.ok) {
        setUserCode(createRes.data.userCode);
        return { success: true, userCode: createRes.data.userCode };
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      return { success: false, error: errorMsg };
    }

    return { success: false, error: 'Failed to create user' };
  }, []);

  /**
   * 提交KYC数据
   * @param {Object} kycData - KYC表单数据
   * @param {String} userCodeParam - 用户编码（可选，不传则使用状态中的）
   * @returns {Object} { success, kycUrl, error }
   */
  const submitKYC = useCallback(
    async (kycData, userCodeParam) => {
      setLoading(true);
      setError(null);

      const targetUserCode = userCodeParam || userCode;
      if (!targetUserCode) {
        setError('User code is required');
        setLoading(false);
        return { success: false, error: 'User code is required' };
      }

      try {
        // 提交KYC数据
        const submitRes = await submitKycData({
          userCode: targetUserCode,
          ...kycData,
        });

        if (submitRes.code === 0 && submitRes.ok) {
          // 获取活体认证URL
          const urlRes = await getKycUrl(targetUserCode);
          if (urlRes.code === 0 && urlRes.ok) {
            setKycUrl(urlRes.data.link);
            message.success(
              'KYC submitted! Please complete liveness verification.',
            );
            return { success: true, kycUrl: urlRes.data.link };
          }
        }

        throw new Error(submitRes.msg || 'KYC submission failed');
      } catch (err) {
        const errorMsg = handleTevauError(err);
        setError(errorMsg);
        message.error(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [userCode],
  );

  /**
   * 申请虚拟卡
   * @param {Object} cardData - 卡片申请数据
   * @param {String} userCodeParam - 用户编码（可选）
   * @returns {Object} { success, data, error }
   */
  const applyCard = useCallback(
    async (cardData, userCodeParam) => {
      setLoading(true);
      setError(null);

      const targetUserCode = userCodeParam || userCode;
      if (!targetUserCode) {
        setError('User code is required. Please create user first.');
        setLoading(false);
        return { success: false, error: 'User code is required' };
      }

      try {
        // 调用创建卡片API
        const response = await submitCard({
          userCode: targetUserCode,
          cardCode: 1004, // 默认卡片类型，根据实际情况调整
          ...cardData,
        });

        if (response.code === 0 && response.ok) {
          setApplicationData(response.data);
          message.success('Virtual card created successfully!');

          return {
            success: true,
            data: response.data,
          };
        } else {
          throw new Error(response.msg || 'Card application failed');
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
    },
    [userCode],
  );

  /**
   * 完整的申请流程（创建用户 + KYC + 创建卡）
   * @param {String} thirdId - 第三方用户ID
   * @param {Object} kycData - KYC数据
   * @param {Object} cardData - 卡片数据
   * @returns {Object} { success, data, error, needLiveness }
   */
  const completeApplication = useCallback(
    async (thirdId, kycData, cardData) => {
      setLoading(true);

      try {
        // 1. 创建/获取用户
        const userResult = await ensureUser(thirdId);
        if (!userResult.success) {
          return { success: false, error: userResult.error };
        }

        // 2. 提交KYC
        const kycResult = await submitKYC(kycData, userResult.userCode);
        if (!kycResult.success) {
          return { success: false, error: kycResult.error };
        }

        // 3. KYC提交成功，需要用户完成活体认证
        // 返回活体认证URL，让用户跳转完成
        return {
          success: true,
          needLiveness: true,
          kycUrl: kycResult.kycUrl,
          userCode: userResult.userCode,
          message: 'Please complete liveness verification before creating card',
        };

        // 注意：创建卡片应该在KYC审核通过后再调用
        // 你可以通过Webhook监听KYC审核结果，然后再调用applyCard
      } catch (err) {
        const errorMsg = handleTevauError(err);
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [ensureUser, submitKYC],
  );

  /**
   * 重置状态
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setApplicationData(null);
    setUserCode(null);
    setKycUrl(null);
  }, []);

  return {
    loading,
    error,
    applicationData,
    userCode,
    kycUrl,
    ensureUser,
    submitKYC,
    applyCard,
    completeApplication,
    reset,
  };
}
