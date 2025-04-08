import NotifyModal from '@/components/NotifyModal';
import { avatar, copy } from '@/utils/lang';
import storage from '@/utils/storage';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { history, useLocation, useModel } from 'umi';
import { useAccount, useDisconnect } from 'wagmi';
import AndroidAuthMenu from './AuthMenu';
import styles from './index.less';
import Guide from '@/pages/Genesis/Dashboard/components/Guide/Guide';
import { fetchUserConfig } from '@/services/genesis';

export const Logo = () => {
  return (
    <a
      className={styles['bar-logo']}
      onClick={() => {
        history.push('/');
      }}
    >
      <img src={require('@/assets/images/icons/logo_name.png')} alt="logo" />
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
  const { avatarSnapUrl, getUserInfo, setUserName } = useModel('common');
  const [run, setRun] = useState(false);
  const [userConf, setUserConf] = useState({});
  const { address } = useAccount();

  useEffect(() => {
    getUserConfig();
    getUserInfo((res) => {
      if (res?.name) {
        setUserName(res.name);
      } else {
        defaultNameHandle();
      }
    });
  }, [run]);
  const defaultNameHandle = () => {
    const addStr = address?.slice(0, 16);
    setUserName(`user_${addStr}`);
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
      </div>
    </header>
  );
}

export function ProfileModal({ isModalOpen, handleOk, handleCancel }) {
  const location = useLocation();
  const { avatarSnapUrl, userName } = useModel('common');

  const { inviterCode } = location.query || {};
  return (
    <ConnectButton.Custom>
      {({ account, chain }) => {
        const { initialState, setInitialState } = useModel('@@initialState');
        const { isLessee } = initialState || {};
        const { disconnect } = useDisconnect();

        const onIdentityChange = () => {
          storage.set({ name: 'isLessee', value: !isLessee });
          setInitialState({
            ...initialState,
            isLessee: !isLessee,
          });
          handleCancel();
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
                  <p> {account?.displayName || 'Unknow'}</p>
                  <i
                    className="iconfont icon-copy poi"
                    onClick={() => copy(account?.address)}
                  ></i>
                </span>
                <div className={styles['type-account']} id="user-mode">
                  {isLessee ? (
                    <div onClick={onIdentityChange}>
                      <p>Switch to Lessor Role</p>
                      <i className="iconfont icon-next"></i>
                    </div>
                  ) : (
                    <div onClick={onIdentityChange}>
                      <p>Switch to Lessee Role</p>
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
                  Personal information
                </a>
              </li>
              {/* <li>
                <i className="iconfont icon-search_doc"></i>{' '}
                <a onClick={() => handleNavigate('/genesis/access-control')}>
                  Access control
                </a>
              </li> */}
              {!isLessee && (
                <li>
                  <i className="iconfont icon-pledge"></i>
                  <a onClick={() => handleNavigate('/genesis/pledge')}>
                    Staking
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
                    Wallet Management
                  </a>
                </li>
              )}
            </ul>
            {!!account?.address && (
              <Button className={styles['log-out']} onClick={handleLogOut}>
                Logout
              </Button>
            )}
            {!account?.address && (
              <Button className={styles['log-out']} onClick={handleLogin}>
                Login
              </Button>
            )}
          </Modal>
        );
      }}
    </ConnectButton.Custom>
  );
}
