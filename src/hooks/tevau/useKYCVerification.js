/**
 * KYC验证Hook
 * 职责：管理KYC验证流程、状态查询、文档上传
 *
 * 艹，KYC验证是虚拟卡申请的必经之路
 * 这个Hook封装了所有KYC相关的业务逻辑
 */

import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import {
  fetchKYCStatus,
  submitKYCInfo,
  uploadKYCDocument,
  batchUploadKYCDocuments,
  submitKYCVerification,
} from '@/services/tevau';
import { handleTevauError, KYC_STATUS } from '@/utils/tevau';

/**
 * KYC验证Hook
 * @param {Boolean} autoCheck - 是否自动检查KYC状态（默认true）
 * @returns {Object} Hook返回值
 */
export default function useKYCVerification(autoCheck = true) {
  const [loading, setLoading] = useState(false);
  const [kycStatus, setKycStatus] = useState(KYC_STATUS.NOT_STARTED);
  const [kycData, setKycData] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  /**
   * 检查KYC状态
   */
  const checkStatus = useCallback(async () => {
    try {
      const response = await fetchKYCStatus();

      if (response.code === 0 || response.success) {
        setKycStatus(response.data?.status || KYC_STATUS.NOT_STARTED);
        setKycData(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch KYC status:', err);
      // 状态查询失败不显示错误提示，避免干扰用户
    }
  }, []);

  /**
   * 提交KYC信息
   * @param {Object} formData - KYC表单数据
   * @returns {Object} { success, data, error }
   */
  const submitKYC = useCallback(
    async (formData) => {
      setLoading(true);

      try {
        const response = await submitKYCInfo(formData);

        if (response.code === 0 || response.success) {
          message.success('KYC information submitted successfully!');
          await checkStatus(); // 重新获取状态
          return { success: true, data: response.data };
        } else {
          throw new Error(response.message || 'Submission failed');
        }
      } catch (err) {
        const errorMsg = handleTevauError(err);
        message.error(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [checkStatus],
  );

  /**
   * 上传单个KYC文档
   * @param {File} file - 文件对象
   * @param {String} documentType - 文档类型
   * @returns {Object} { success, data, error }
   */
  const uploadDocument = useCallback(async (file, documentType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    try {
      const response = await uploadKYCDocument(formData);

      if (response.code === 0 || response.success) {
        message.success('Document uploaded successfully!');

        // 保存已上传的文档ID
        setUploadedDocuments((prev) => [
          ...prev,
          {
            documentId: response.data?.documentId,
            documentType,
            fileName: file.name,
          },
        ]);

        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || 'Upload failed');
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  /**
   * 批量上传KYC文档
   * @param {Array<Object>} files - 文件数组 [{ file, documentType }]
   * @returns {Object} { success, results, errors }
   */
  const batchUpload = useCallback(async (files) => {
    setLoading(true);

    try {
      const results = await batchUploadKYCDocuments(files);

      const successCount = results.filter(
        (r) => r.code === 0 || r.success,
      ).length;

      if (successCount > 0) {
        message.success(`${successCount} documents uploaded successfully!`);
      }

      if (successCount < files.length) {
        message.warning(
          `${files.length - successCount} documents failed to upload`,
        );
      }

      // 保存成功上传的文档
      const successDocs = results
        .map((r, index) => {
          if (r.code === 0 || r.success) {
            return {
              documentId: r.data?.documentId,
              documentType: files[index].documentType,
              fileName: files[index].file.name,
            };
          }
          return null;
        })
        .filter(Boolean);

      setUploadedDocuments((prev) => [...prev, ...successDocs]);

      return {
        success: successCount === files.length,
        results,
        errors: results.filter((r) => r.code !== 0 && !r.success),
      };
    } catch (err) {
      const errorMsg = handleTevauError(err);
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 提交KYC验证（最终提交）
   * @returns {Object} { success, data, error }
   */
  const submitVerification = useCallback(async () => {
    if (uploadedDocuments.length === 0) {
      message.warning('Please upload at least one document');
      return { success: false, error: 'No documents uploaded' };
    }

    setLoading(true);

    try {
      const documentIds = uploadedDocuments.map((doc) => doc.documentId);

      const response = await submitKYCVerification({ documentIds });

      if (response.code === 0 || response.success) {
        message.success('KYC verification submitted successfully!');
        await checkStatus(); // 重新获取状态
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || 'Verification failed');
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      message.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [uploadedDocuments, checkStatus]);

  /**
   * 重置状态
   */
  const reset = useCallback(() => {
    setLoading(false);
    setUploadedDocuments([]);
  }, []);

  // 初始化时检查KYC状态
  useEffect(() => {
    if (autoCheck) {
      checkStatus();
    }
  }, [autoCheck, checkStatus]);

  return {
    loading,
    kycStatus,
    kycData,
    uploadedDocuments,
    checkStatus,
    submitKYC,
    uploadDocument,
    batchUpload,
    submitVerification,
    reset,
  };
}
