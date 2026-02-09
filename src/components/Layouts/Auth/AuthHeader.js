import NotifyModal from '@/components/NotifyModal';
import CardModal from '@/components/Tevau/CardModal';
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
  const handleCardClick = () => {
    setIsCardModalOpen(true);
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
    // TODO: 实现注册逻辑
    history.push('/genesis/_Tevau/cards');
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
