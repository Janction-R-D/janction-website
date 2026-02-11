import { useEffect, useState } from 'react';
import { useLocation, useModel } from 'umi';
import Lessee from './Lessee';
import Lessor from './Lessor';
import KYCVerificationModal from '@/components/Tevau/KYCVerificationModal';
import { getKycInfo, getKycUrl } from '@/services/tevau/kyc';
import { handleTevauError } from '@/utils/tevau';
import storage from '@/utils/storage';

const Dashboard = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const location = useLocation();
  const { from } = location.state || {};
  const { fromKycRegister, userCode: stateUserCode } = location.state || {};
  const { isLessee } = initialState || {};

  const [kycModalVisible, setKycModalVisible] = useState(false);
  const [kycUrl, setKycUrl] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [auditStatus, setAuditStatus] = useState(null);
  const [currentUserCode, setCurrentUserCode] = useState(null);

  // 检查是否需要查询KYC状态
  useEffect(() => {
    const checkKyc = storage.get('TEVAU_CHECK_KYC');
    const userCode = stateUserCode || storage.get('TEVAU_USER_CODE');

    if ((fromKycRegister || checkKyc) && userCode) {
      queryKycStatus(userCode);
      // 清除标记
      storage.remove('TEVAU_CHECK_KYC');
    }
  }, [fromKycRegister, stateUserCode]);

  // 查询KYC状态
  const queryKycStatus = async (userCode) => {
    setCurrentUserCode(userCode);
    try {
      // 模拟API调用
      // const response = await getKycInfo(userCode);
      // if (response.code === 0 && response.ok) {
      //   const kycData = response.data;
      //   setAuditStatus(kycData.auditStatus);
      //   setKycStatus(kycData.identityFailerReason || null);

      //   // 如果审核通过或审核中，获取活体认证URL
      //   if (kycData.auditStatus === 0 || kycData.auditStatus === 1) {
      //     const urlResponse = await getKycUrl(userCode);
      //     if (urlResponse.code === 0 && urlResponse.ok) {
      //       setKycUrl(urlResponse.data?.link);
      //       setKycModalVisible(true);
      //     }
      //   } else {
      //     // 未通过或其他状态，显示进度
      //     setKycModalVisible(true);
      //   }
      // }

      // 模拟数据
      const mockAuditStatus = 0; // 0=审核中, 1=认证通过, 2=未通过, 3=未提审, 5=未认证
      setAuditStatus(mockAuditStatus);

      if (mockAuditStatus === 0 || mockAuditStatus === 1) {
        // 模拟获取活体认证URL
        const mockKycUrl = `https://kyc.tevau.io/verify?token=mock_token_${Date.now()}`;
        setKycUrl(mockKycUrl);
        setKycModalVisible(true);
      } else {
        // 未通过或其他状态，显示进度
        setKycStatus('KYC verification is pending review.');
        setKycModalVisible(true);
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      console.error('Query KYC status error:', errorMsg);
      // 即使查询失败，也显示弹窗
      setKycStatus('Failed to query KYC status. Please try again later.');
      setKycModalVisible(true);
    }
  };

  // 刷新KYC URL
  const handleRefreshKycUrl = async () => {
    if (!currentUserCode) return;

    try {
      // 实际API调用（当前模拟）
      // const response = await getKycUrl(currentUserCode);
      // if (response.code === 0 && response.ok) {
      //   setKycUrl(response.data?.link);
      // }

      // 模拟获取新的URL
      const newMockKycUrl = `https://kyc.tevau.io/verify?token=mock_token_${Date.now()}`;
      setKycUrl(newMockKycUrl);
    } catch (err) {
      const errorMsg = handleTevauError(err);
      console.error('Refresh KYC URL error:', errorMsg);
    }
  };

  if (from == 'gpu-page') {
    setInitialState({
      ...initialState,
      isLessee: true,
    });
    return (
      <>
        <Lessee />
        <KYCVerificationModal
          visible={kycModalVisible}
          onCancel={() => setKycModalVisible(false)}
          kycUrl={kycUrl}
          kycStatus={kycStatus}
          auditStatus={auditStatus}
          onRefresh={handleRefreshKycUrl}
        />
      </>
    );
  }

  return (
    <>
      {isLessee ? <Lessee /> : <Lessor />}
      <KYCVerificationModal
        visible={kycModalVisible}
        onCancel={() => setKycModalVisible(false)}
        kycUrl={kycUrl}
        kycStatus={kycStatus}
        auditStatus={auditStatus}
        onRefresh={handleRefreshKycUrl}
      />
    </>
  );
};

Dashboard.wrappers = ['@/wrappers/auth'];
export default Dashboard;
