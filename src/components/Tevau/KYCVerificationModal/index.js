/**
 * KYC验证弹窗组件
 * 职责：展示KYC活体认证二维码或KYC状态进度
 */

import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import { QRCodeCanvas } from 'qrcode.react';
import { history } from 'umi';
import CircleArrowIcon from '@/components/Tevau/CircleArrowIcon';
import styles from './index.less';
import '@/styles/common/button.less';

const KYCVerificationModal = ({
  visible,
  onCancel,
  kycUrl,
  kycStatus,
  auditStatus,
  onRefresh,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [countdown, setCountdown] = useState(180); // 3分钟 = 180秒
  const [isExpired, setIsExpired] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const timerRef = useRef(null);

  // 本地状态，用于控制多步弹窗流程
  // step: 0=二维码（人脸认证）, 1=认证中, 2=成功/失败结果
  const [step, setStep] = useState(0);
  const [localAuditStatus, setLocalAuditStatus] = useState(auditStatus);
  const [localKycStatus, setLocalKycStatus] = useState(kycStatus || null);

  useEffect(() => {
    if (kycUrl) {
      setQrCodeUrl(kycUrl);
      setCountdown(180); // 重置倒计时
      setIsExpired(false);
      setStep(0); // 有URL时，从二维码步骤开始
    } else if (visible) {
      // 没有URL但弹窗可见时，从“认证中”步骤开始
      setStep(1);
    }
  }, [kycUrl, visible]);

  // 当外部传入的状态变化或重新打开弹窗时，重置本地状态
  useEffect(() => {
    if (visible) {
      setLocalAuditStatus(auditStatus ?? 0);
      setLocalKycStatus(kycStatus || null);
    }
  }, [visible, auditStatus, kycStatus]);

  // 倒计时逻辑
  useEffect(() => {
    if (visible && qrCodeUrl && !isExpired) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsExpired(true);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [visible, qrCodeUrl, isExpired]);

  // 刷新二维码
  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
  };

  // 获取状态图片和标题（基于本地状态）
  const getStatusDisplay = () => {
    // auditStatus: 0=审核中, 1=认证通过, 2=未通过, 3=未提审, 5=未认证
    switch (localAuditStatus) {
      case 1:
        return {
          image: require('@/assets/images/tevau/kycSuccess.png'),
          title: 'KYC Verification Successful',
          showButton: true,
          buttonText: 'Apply for Virtual Card',
          buttonAction: () => history.push('/tevau/ActivateCard'),
        };
      case 2:
        return {
          image: require('@/assets/images/tevau/kycFail.png'),
          title: 'KYC Verification Failed',
          showButton: true,
          buttonText: 'Retry',
          buttonAction: () => history.push('/tevau/register'),
        };
      default:
        // 0, 3, 5 或其他状态
        return {
          image: require('@/assets/images/tevau/kycProgress.png'),
          title: 'KYC Verification In Progress',
          showButton: false,
        };
    }
  };

  // 统一处理关闭逻辑：在不同 step 之间切换，最后一步才真正关闭
  const handleClose = () => {
    // 第一步：从二维码 -> 认证中
    if (step === 0) {
      setStep(1);
      setLocalAuditStatus(0);
      setLocalKycStatus('KYC verification is in progress.');
      return;
    }

    // 第二步：从认证中 -> 随机成功或失败
    if (step === 1) {
      const isSuccess = Math.random() < 0.5;
      setLocalAuditStatus(isSuccess ? 1 : 2);
      setLocalKycStatus(
        isSuccess
          ? 'KYC verification completed successfully.'
          : 'KYC verification failed. Please try again.',
      );
      setStep(2);
      return;
    }

    // 第三步：结果弹窗，真正关闭
    if (onCancel) {
      onCancel();
    }
  };

  // 第一步：有KYC URL且处于二维码步骤，显示二维码
  if (qrCodeUrl && step === 0) {
    return (
      <Modal
        open={visible}
        onCancel={handleClose}
        footer={null}
        closable={false}
        maskClosable={true}
        wrapClassName={styles['kyc-modal-wrap']}
        className={styles['kyc-modal']}
        width={800}
        centered
        destroyOnClose
      >
        <div className={styles['kyc-content']}>
          {/* 关闭按钮 */}
          <Button
            className={styles['close-btn']}
            type="link"
            onClick={handleClose}
          >
            <CloseOutlined style={{ fontSize: '20px' }} />
          </Button>

          {/* 标题 */}
          <h2 className={styles['kyc-title']}>KYC face verification.</h2>

          {/* 内容区域 */}
          <div className={styles['kyc-body']}>
            {/* 左侧：图片和说明 */}
            <div className={styles['kyc-left']}>
              <div className={styles['kyc-image-wrapper']}>
                <img
                  src={require('@/assets/images/tevau/tevauToQR.png')}
                  alt="KYC Verification"
                  className={styles['kyc-image']}
                />
              </div>
              <p className={styles['kyc-description']}>
                Please use your phone to scan the QR code and complete the KYC
                face verification.
              </p>
            </div>

            {/* 右侧：二维码 */}
            <div className={styles['kyc-right']}>
              <div className={styles['qr-code-wrapper']}>
                {qrCodeUrl && (
                  <QRCodeCanvas
                    value={qrCodeUrl}
                    size={200}
                    level="H"
                    includeMargin={true}
                    className={styles['qr-code']}
                  />
                )}
                {isExpired && (
                  <div className={styles['qr-expired-mask']}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<ReloadOutlined />}
                      onClick={handleRefresh}
                      loading={isRefreshing}
                      size="large"
                      className={styles['refresh-icon-btn']}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  // 其他步骤：显示状态（认证中 / 成功 / 失败）
  const statusDisplay = getStatusDisplay();

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      closable={false}
      maskClosable={true}
      wrapClassName={styles['kyc-modal-wrap']}
      className={styles['kyc-modal']}
      width={800}
      centered
      destroyOnClose
    >
      <div className={styles['kyc-content']}>
        {/* 关闭按钮 */}
        <Button
          className={styles['close-btn']}
          type="link"
          onClick={handleClose}
        >
          <CloseOutlined style={{ fontSize: '20px' }} />
        </Button>

        {/* 标题 */}
        <h2 className={styles['kyc-title']}>{statusDisplay.title}</h2>

        {/* 状态内容 */}
        <div className={styles['kyc-status-content']}>
          <div className={styles['status-image-wrapper']}>
            <img
              src={statusDisplay.image}
              alt="KYC Status"
              className={styles['status-image']}
            />
          </div>

          {localKycStatus && (
            <p className={styles['status-message']}>{localKycStatus}</p>
          )}

          {statusDisplay.showButton && (
            <Button
              type="primary"
              onClick={statusDisplay.buttonAction}
              className="tevau-btn"
              style={{ width: '100%', maxWidth: '400px', height: '60px' }}
            >
              <span>{statusDisplay.buttonText}</span>
              <CircleArrowIcon size={16} />
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default KYCVerificationModal;
