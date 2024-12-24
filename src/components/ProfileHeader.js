import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './profileHeader.less';
import { useAccount, useDisconnect } from 'wagmi';
import storage from '@/utils/storage';
import { history, useLocation, useModel } from 'umi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { fetchUserCenter } from '@/services/genesis';
import NotifyModal from './NotifyModal';
import { avatar, copy } from '@/utils/lang';

export default function ProfileHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { address } = useAccount();
  const location = useLocation();
  const { inviterCode } = location.query || {};

  const handleNotifyOk = () => {
    setIsNotifyModalOpen(true);
  };
  useEffect(() => {
    if (inviterCode && !initialState?.userAccount) return;
    const getUserCenterData = () => {
      return fetchUserCenter()
        .then((res) => {})
        .catch((err) => console.log(err));
    };
    getUserCenterData();
  }, []);
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
    <header className={styles['header']}>
      <span onClick={handleNotifyOk}>
        <i className="iconfont icon-bell "></i>
      </span>
      <div className={styles['img-container']} onClick={showModal}>
        <img className={styles['profile-img']} src={avatar(address)} />
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
    </header>
  );
}

export function ProfileModal({ isModalOpen, handleOk, handleCancel }) {
  const location = useLocation();
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
          >
            <section className={styles['header-card']}>
              <div className={styles['modal-profile-img']}>
                <img
                  className={styles['profile-img']}
                  src={avatar(account?.address)}
                />
              </div>
              <section className={styles['profile-info']}>
                <h3>{chain?.name || 'Unknow'}</h3>
                <span className={styles['chain-copy']}>
                  <p> {account?.displayName || 'Unknow'}</p>
                  <i
                    className="iconfont icon-copy poi"
                    onClick={() => copy(account?.address)}
                  ></i>
                </span>
                <div className={styles['type-account']}>
                  {isLessee ? (
                    <div onClick={onIdentityChange}>
                      <p>Switch to Landlord Role</p>
                      <i className="iconfont icon-next"></i>
                    </div>
                  ) : (
                    <div onClick={onIdentityChange}>
                      <p>Switch to Tenant Role</p>
                      <i className="iconfont icon-next"></i>
                    </div>
                  )}
                </div>
              </section>
            </section>
            <ul>
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
              <li>
                <i className="iconfont icon-income"></i>
                <a onClick={() => handleNavigate('/genesis/income')}>
                  Income management
                </a>
              </li>
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
