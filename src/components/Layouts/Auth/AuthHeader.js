import NotifyModal from '@/components/NotifyModal';
import CardModal from '@/components/Tevau/CardModal';
import KYCVerificationModal from '@/components/Tevau/KYCVerificationModal';
import { avatar, copy } from '@/utils/lang';
import storage from '@/utils/storage';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { history, Redirect, useIntl, useLocation, useModel } from 'umi';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import AndroidAuthMenu from './AuthMenu';
import styles from './index.less';
import Guide from '@/pages/Genesis/Dashboard3/components/Guide/Guide';
import { fetchUserConfig } from '@/services/genesis';
import { LoginOutlined } from '@ant-design/icons';
import { handleIdentityChange } from '@/utils/metamaskLogin';
import ChatBot from '@/components/Chatbot';
import { useChainId } from 'wagmi';
import { useEthersSigner } from '@/hooks/useEthersSigner';
import { getKycInfo, getKycUrl } from '@/services/tevau/kyc';
import { handleTevauError } from '@/utils/tevau';

export const Logo = () => {
  return (
    <a
      className={styles['bar-logo']}
      onClick={() => {
        history.push('/');
      }}
    >
      <img
        src={require('@/assets/images/icons/janction-logo-text.png')}
        alt="logo"
      />
    </a>
  );
};

export default function AuthHeader(props) {
  const {
    showLogo,
    // menu,
    active,
    onMenuChange,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isKycModalVisible, setIsKycModalVisible] = useState(false);
  const [kycUrl, setKycUrl] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [auditStatus, setAuditStatus] = useState(null);
  const [currentUserCode, setCurrentUserCode] = useState(null);
  const [isRefreshingKycUrl, setIsRefreshingKycUrl] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const { avatarSnapUrl, getUserInfo, setUserName, userName } =
    useModel('common');
  const [run, setRun] = useState(false);
  const [userConf, setUserConf] = useState({});
  const { address } = useAccount();

  useEffect(() => {
    getUserConfig();
    getUserInfo();

    if (!userName) {
      defaultNameHandle();
    }
  }, []);
  const defaultNameHandle = () => {
    if (!userName) {
      const addStr = address?.slice(0, 16);
      setUserName(`user_${addStr}`);
    }
  };
  const getUserConfig = async () => {
    if (!location.pathname.includes('dashboard')) return; // Modal guide  will pop up only in dahsboard page
    try {
      const res = await fetchUserConfig();

      setUserConf(res);

      if (!res?.pass_newbie_guide) {
        setRun(true); //If the users haven't passed the new user guidance yet
        return;
      }
      setRun(false); // User has passed the guide, don't show it
    } catch (err) {
      console.log(err);
    }
  };
  const handleNotifyOk = () => {
    setIsNotifyModalOpen(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      //       setIsKycModalVisible(true);
      //     }
      //   } else {
      //     // 未通过或其他状态，显示进度
      //     setIsKycModalVisible(true);
      //   }
      // }

      // 模拟数据
      const mockAuditStatus = 0; // 0=审核中, 1=认证通过, 2=未通过, 3=未提审, 5=未认证
      setAuditStatus(mockAuditStatus);

      if (mockAuditStatus === 0 || mockAuditStatus === 1) {
        // 模拟获取活体认证URL
        const mockKycUrl = `https://kyc.tevau.io/verify?token=mock_token_${Date.now()}`;
        setKycUrl(mockKycUrl);
        setIsKycModalVisible(true);
      } else {
        // 未通过或其他状态，显示进度
        setKycStatus('KYC verification is pending review.');
        setIsKycModalVisible(true);
      }
    } catch (err) {
      const errorMsg = handleTevauError(err);
      console.error('Query KYC status error:', errorMsg);
      // 即使查询失败，也显示弹窗
      setKycStatus('Failed to query KYC status. Please try again later.');
      setIsKycModalVisible(true);
    }
  };

  // 刷新KYC URL
  const handleRefreshKycUrl = async () => {
    if (!currentUserCode) return null;
    setIsRefreshingKycUrl(true);
    try {
      // 模拟API调用
      // const urlResponse = await getKycUrl(currentUserCode);
      // if (urlResponse.code === 0 && urlResponse.ok) {
      //   const newUrl = urlResponse.data?.link;
      //   setKycUrl(newUrl);
      //   return newUrl;
      // }

      // 模拟数据
      const mockKycUrl = `https://kyc.tevau.io/verify?token=mock_token_${Date.now()}`;
      setKycUrl(mockKycUrl);
      return mockKycUrl;
    } catch (err) {
      console.error('Refresh KYC URL error:', err);
      return null;
    } finally {
      setIsRefreshingKycUrl(false);
    }
  };

  const handleCardClick = async () => {
    // 检查是否有userCode，如果有则查询KYC状态
    const userCode = storage.get('TEVAU_USER_CODE');
    if (userCode) {
      // 有userCode，查询KYC状态并显示KYC弹窗
      await queryKycStatus(userCode);
    } else {
      // 没有userCode，显示原来的CardModal
      setIsCardModalOpen(true);
    }
  };
  const handleCardModalCancel = () => {
    setIsCardModalOpen(false);
  };
  const handleGetCard = () => {
    // TODO: 实现获取卡片逻辑
    history.push('/genesis/_Tevau/cards');
    setIsCardModalOpen(false);
  };
  const handleRegister = () => {
    history.push('/tevau/register');
    setIsCardModalOpen(false);
  };

  return (
    <header className={styles['auth-header']}>
      <Guide
        run={run}
        setRun={setRun}
        userConf={userConf}
        setUserConf={setUserConf}
        setIsModalOpen={setIsModalOpen}
        setIsNotifyModalOpen={setIsNotifyModalOpen}
      />
      <div className={styles['wrapper']}>
        <div className={styles['left']}>
          {showLogo ? (
            <Logo />
          ) : (
            <AndroidAuthMenu
              // menu={menu}
              active={active}
              onMenuChange={onMenuChange}
            />
          )}
        </div>
        <div className={styles['extra']}>
          <div className={styles['extra-chat']}>
            <ChatBot fold={true} />
          </div>
          <div className={styles['credit-card']} onClick={handleCardClick}>
            <img
              src={require('@/assets/images/tevau/creditCard.png')}
              alt="credit card"
            />
          </div>
          <div
            className={styles['msg']}
            id="notifications-icon"
            onClick={handleNotifyOk}
          >
            <i className="iconfont icon-bell "></i>
          </div>
          <div
            className={styles['img-container']}
            onClick={showModal}
            id="profile-menu-icon"
          >
            <img
              className={styles['profile-img']}
              src={avatarSnapUrl || avatar(address)}
            />
            <span>
              <i className="iconfont icon-pre_page"></i>
              {userName}

              <i className="iconfont icon-next_page"></i>
            </span>
          </div>
        </div>
        <NotifyModal
          isModalOpen={isNotifyModalOpen}
          setIsModalOpen={setIsNotifyModalOpen}
          handleOk={handleNotifyOk}
          styles={styles}
        />
        <ProfileModal
          styles={styles}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
        <CardModal
          visible={isCardModalOpen}
          onCancel={handleCardModalCancel}
          onGetCard={handleGetCard}
          onRegister={handleRegister}
        />
        <KYCVerificationModal
          visible={isKycModalVisible}
          onCancel={() => setIsKycModalVisible(false)}
          kycUrl={kycUrl}
          kycStatus={kycStatus}
          auditStatus={auditStatus}
          onRefreshKycUrl={handleRefreshKycUrl}
        />
      </div>
    </header>
  );
}

export function ProfileModal({ isModalOpen, handleOk, handleCancel }) {
  const location = useLocation();
  const { avatarSnapUrl, userName } = useModel('common');
  const [isLoged, setIsLoged] = useState(false);
  const { signMessageAsync } = useSignMessage();
  const { inviterCode } = location.query || {};
  const chainId = useChainId();
  const signer = useEthersSigner(chainId);
  useEffect(() => {
    const credentials = storage.get('TOKEN');
    if (credentials) {
      setIsLoged(true);
    }
  }, []);
  return (
    <ConnectButton.Custom>
      {({ account, chain }) => {
        const { initialState, setInitialState } = useModel('@@initialState');
        const { isLessee, sessionType } = initialState || {};
        const { disconnect } = useDisconnect();
        const intl = useIntl();
        const onChangeIdentity = async () => {
          const resConnect = await handleIdentityChange({
            signer,
            isLessee,
            setInitialState,
            initialState,
            handleCancel,
            setLoading: () => {},
            signMessageAsync,
            disconnect,
          });
        };

        const handleLogOut = () => {
          disconnect();
          storage.clear();
          setInitialState({
            ...initialState,
            userAccount: null,
          });
          history.push('/');
        };
        const handleLogin = () => {
          let url = `/login?from=${location.pathname}`;
          if (inviterCode) {
            url = `${url}&inviterCode=${inviterCode}`;
          }
          history.push(url);
        };
        const handleNavigate = (path) => {
          history.push(path);
          handleCancel();
        };
        const isLoggedIn = isLoged || !!account?.address;
        if (sessionType == 'wallet' && !isLoggedIn) {
          storage.clear();
          return history.replace(`/login?from=${location.pathname}`);
        }
        return (
          <Modal
            className={styles['card-modal']}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            header={false}
            height={300}
            width={400}
            closable={false}
            id="user-mode"
          >
            <section className={styles['header-card']}>
              <div className={styles['modal-profile-img']}>
                <img
                  className={styles['profile-img']}
                  src={avatarSnapUrl || avatar(account?.address)}
                />
              </div>
              <section className={styles['profile-info']} id="change-mode">
                <h3>{userName}</h3>
                <span className={styles['chain-copy']}>
                  <p> {account?.address ? account?.displayName : null}</p>
                  <i
                    className="iconfont icon-copy poi"
                    onClick={() => copy(account?.address)}
                  ></i>
                </span>
                <div className={styles['type-account']} id="user-mode">
                  {isLessee ? (
                    <div onClick={onChangeIdentity}>
                      <p>{intl.formatMessage({ id: 'switchToLessor' })}</p>
                      <i className="iconfont icon-next"></i>
                    </div>
                  ) : (
                    <div onClick={onChangeIdentity}>
                      <p>{intl.formatMessage({ id: 'switchToLessee' })}</p>
                      <i className="iconfont icon-next"></i>
                    </div>
                  )}
                </div>
              </section>
            </section>
            <ul className={styles['extra-page']}>
              <li>
                <i className="iconfont icon-user"></i>
                <a onClick={() => handleNavigate('/genesis/user-center')}>
                  {intl.formatMessage({ id: 'personalInfo' })}
                </a>
              </li>

              {!isLessee && (
                <li>
                  <i className="iconfont icon-pledge"></i>
                  <a onClick={() => handleNavigate('/genesis/pledge')}>
                    {intl.formatMessage({ id: 'staking' })}
                  </a>
                </li>
              )}
              {/* <li>
                <i className="iconfont icon-income"></i>
                <a onClick={() => handleNavigate('/genesis/income')}>
                  Income management
                </a>
              </li> */}
              {!isLessee && (
                <li>
                  <i className="iconfont icon-wallet1"></i>
                  <a
                    onClick={() => handleNavigate('/genesis/wallet-management')}
                  >
                    {intl.formatMessage({ id: 'walletManagement' })}
                  </a>
                </li>
              )}
            </ul>
            <div className={styles['btn']}>
              {isLoggedIn && (
                <Button className={styles['log-out']} onClick={handleLogOut}>
                  {intl.formatMessage({ id: 'logout' })}{' '}
                  <LoginOutlined className={styles['log-out-icon']} />
                </Button>
              )}
              {!isLoggedIn && (
                <Button className={styles['log-out']} onClick={handleLogin}>
                  {intl.formatMessage({ id: 'login' })}
                </Button>
              )}
            </div>
          </Modal>
        );
      }}
    </ConnectButton.Custom>
  );
}
