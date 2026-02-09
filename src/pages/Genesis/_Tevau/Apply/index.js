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
  // TODO: 艹，需要从用户系统获取userCode！
  // 临时处理：先不传userCode，等有了真实的用户映射后再完善
  const userCode = null; // 临时：应该从用户系统获取Tevau userCode

  // 使用Hooks管理业务逻辑
  const {
    loading: applyLoading,
    applyCard,
    applicationData,
  } = useCardApplication();
  const {
    kycUrl,
    submitKYC,
    getLivenessUrl,
    loading: kycLoading,
  } = useKYCVerification(userCode);

  const [currentStep, setCurrentStep] = useState(0);
  const [needKYC, setNeedKYC] = useState(true); // 艹，默认需要KYC，后续根据实际情况调整

  // TODO: 后续需要实现KYC状态查询，判断用户是否已通过KYC

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
   * TODO: 艹，需要实现文件上传到自己服务器的逻辑
   * Tevau不提供文件上传接口，需要先上传到自己的服务器获取URL
   */
  const handleUploadDocument = async (file, documentType) => {
    console.warn('TODO: 实现文件上传逻辑');
    // const url = await uploadToYourServer(file);
    // return url;
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
