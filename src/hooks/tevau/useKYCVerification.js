/**
 * KYC验证Hook（根据真实API重构）
 * 职责：管理Tevau的KYC验证流程
 *
 * 艹，Tevau的KYC流程：
 * 1. submitKycData - 提交KYC数据（含证件照URL）
 * 2. getKycUrl - 获取活体认证URL
 * 3. 用户跳转完成活体认证
 * 4. 通过Webhook接收审核结果
 * 5. simUserKycAudit - 测试环境模拟审核（可选）
 *
 * 注意：证件照上传不是Tevau提供的API，需要先上传到你们自己的服务器！
 */

import { useState, useCallback } from 'react';
import { message } from 'antd';
import { submitKycData, getKycUrl, simUserKycAudit } from '@/services/tevau';
import { handleTevauError } from '@/utils/tevau';

/**
 * KYC验证Hook
 * @param {String} userCode - Tevau用户编码
 * @returns {Object} Hook返回值
 */
export default function useKYCVerification(userCode) {
  const [loading, setLoading] = useState(false);
  const [kycUrl, setKycUrl] = useState(null);
  const [error, setError] = useState(null);

  /**
   * 提交KYC数据
   * @param {Object} kycData - KYC数据
   * @param {String} kycData.countryArea - 国家/地区代码
   * @param {String} kycData.firstNameEn - 英文名
   * @param {String} kycData.lastNameEn - 英文姓
   * @param {String} kycData.birthday - 出生日期 YYYY-MM-DD
   * @param {String} kycData.identityCardType - 证件类型 0=身份证,1=护照,2=驾照
   * @param {String} kycData.identityFrontPicUrl - 证件正面照URL（需先上传）
   * @param {String} kycData.identityBackPicUrl - 证件反面照URL（需先上传）
   * @param {String} kycData.identityCard - 证件号码
   * @param {String} kycData.identityCardValidityTime - 证件有效期
   * @returns {Object} { success, data, error }
   */
  const submitKYC = useCallback(
    async (kycData) => {
      if (!userCode) {
        const errorMsg = 'UserCode is required';
        message.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      setLoading(true);
      setError(null);

      try {
        // 第一步：提交KYC数据
        const submitResponse = await submitKycData({
          userCode,
          ...kycData,
        });

        if (submitResponse.code === 0 && submitResponse.ok) {
          message.success('KYC data submitted successfully!');

          // 第二步：获取活体认证URL
          const urlResponse = await getKycUrl(userCode);

          if (urlResponse.code === 0 && urlResponse.ok) {
            const livenessUrl = urlResponse.data?.link;
            setKycUrl(livenessUrl);

            return {
              success: true,
              kycUrl: livenessUrl,
              accountId: urlResponse.data?.accountId,
              transactionId: urlResponse.data?.transactionId,
            };
          } else {
            throw new Error(urlResponse.msg || 'Failed to get liveness URL');
          }
        } else {
          throw new Error(submitResponse.msg || 'Failed to submit KYC data');
        }
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
   * 获取活体认证URL（单独调用）
   * @returns {Object} { success, kycUrl, error }
   */
  const getLivenessUrl = useCallback(async () => {
    if (!userCode) {
      const errorMsg = 'UserCode is required';
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getKycUrl(userCode);

      if (response.code === 0 && response.ok) {
        const livenessUrl = response.data?.link;
        setKycUrl(livenessUrl);

        return {
          success: true,
          kycUrl: livenessUrl,
          accountId: response.data?.accountId,
          transactionId: response.data?.transactionId,
        };
      } else {
        throw new Error(response.msg || 'Failed to get liveness URL');
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      setError(errorMsg);
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [userCode]);

  /**
   * 模拟KYC审核（仅测试环境）
   * @param {Boolean} passOrNot - 是否通过审核
   * @returns {Object} { success, data, error }
   */
  const simulateAudit = useCallback(
    async (passOrNot = true) => {
      if (!userCode) {
        const errorMsg = 'UserCode is required';
        message.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      setLoading(true);
      setError(null);

      try {
        const response = await simUserKycAudit({
          userCode,
          passOrNot,
        });

        if (response.code === 0 && response.ok) {
          const auditMsg = passOrNot
            ? 'KYC audit passed (simulated)!'
            : 'KYC audit rejected (simulated)';
          message.success(auditMsg);

          return { success: true, data: response.data };
        } else {
          throw new Error(response.msg || 'Failed to simulate audit');
        }
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
   * 重置状态
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setKycUrl(null);
  }, []);

  return {
    loading,
    error,
    kycUrl,
    submitKYC,
    getLivenessUrl,
    simulateAudit,
    reset,
  };
}
