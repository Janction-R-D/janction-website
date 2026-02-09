/**
 * 卡片申请页面
 * 职责:组合业务逻辑(Hooks)和UI组件，协调卡片申请流程
 *
 * 艹，这个页面实现整个申请流程，包括KYC验证
 */

import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Card, Steps, Result, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import CardApplicationForm from '@/components/Tevau/CardApplicationForm';
import KYCForm from '@/components/Tevau/KYCForm';
import { useCardApplication, useKYCVerification } from '@/hooks/tevau';
import styles from './index.less';

const { Step } = Steps;

const CardApplyPage = () => {
  // 使用Hooks管理业务逻辑
  const {
    loading: applyLoading,
    applyCard,
    applicationData,
  } = useCardApplication();
  const {
    kycStatus,
    submitKYC,
    uploadDocument,
    loading: kycLoading,
  } = useKYCVerification();

  const [currentStep, setCurrentStep] = useState(0);
  const [needKYC, setNeedKYC] = useState(false);

  // 检查是否需要KYC
  useEffect(() => {
    if (kycStatus === 'not_started' || kycStatus === 'rejected') {
      setNeedKYC(true);
    } else if (kycStatus === 'approved') {
      setNeedKYC(false);
    }
  }, [kycStatus]);

  /**
   * 处理卡片申请提交
   */
  const handleCardApplicationSubmit = async (formData) => {
    const result = await applyCard(formData);

    if (result.success) {
      if (needKYC) {
        // 需要KYC验证，跳转到下一步
        setCurrentStep(1);
      } else {
        // 已通过KYC，跳转到完成步骤
        setCurrentStep(needKYC ? 2 : 1);
      }
    } else if (result.needKYC) {
      // 返回的错误表示需要KYC
      setNeedKYC(true);
      setCurrentStep(1);
    }
  };

  /**
   * 处理KYC提交
   */
  const handleKYCSubmit = async (kycData) => {
    const result = await submitKYC(kycData);

    if (result.success) {
      // KYC提交成功，跳转到完成步骤
      setCurrentStep(2);
    }
  };

  /**
   * 处理文档上传
   */
  const handleUploadDocument = async (file, documentType) => {
    await uploadDocument(file, documentType);
  };

  /**
   * 跳转到卡片列表
   */
  const goToCardList = () => {
    history.push('/genesis/tevau/cards');
  };

  /**
   * 重新申请
   */
  const applyAnother = () => {
    setCurrentStep(0);
  };

  return (
    <div className={styles.applyPageContainer}>
      <Card className={styles.mainCard}>
        <div className={styles.stepsContainer}>
          <Steps current={currentStep}>
            <Step
              title="Card Application"
              description="Fill in your information"
            />
            {needKYC && (
              <Step
                title="KYC Verification"
                description="Verify your identity"
              />
            )}
            <Step title="Completed" description="Application submitted" />
          </Steps>
        </div>

        <div className={styles.stepContent}>
          {/* 步骤1: 卡片申请表单 */}
          {currentStep === 0 && (
            <CardApplicationForm
              onSubmit={handleCardApplicationSubmit}
              loading={applyLoading}
            />
          )}

          {/* 步骤2: KYC验证（如果需要） */}
          {currentStep === 1 && needKYC && (
            <KYCForm
              onSubmit={handleKYCSubmit}
              onUploadDocument={handleUploadDocument}
              loading={kycLoading}
            />
          )}

          {/* 步骤3: 完成 */}
          {((currentStep === 1 && !needKYC) ||
            (currentStep === 2 && needKYC)) && (
            <Result
              status="success"
              icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              title="Application Submitted Successfully!"
              subTitle={`Your virtual card application has been submitted. ${
                needKYC ? 'KYC verification is under review.' : ''
              } Card ID: ${applicationData?.cardId || 'N/A'}`}
              extra={[
                <Button type="primary" key="cards" onClick={goToCardList}>
                  View My Cards
                </Button>,
                <Button key="apply" onClick={applyAnother}>
                  Apply Another Card
                </Button>,
              ]}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default CardApplyPage;
CardApplyPage.wrappers = ['@/wrappers/auth'];
