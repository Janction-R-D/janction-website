import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './profileHeader.less';
import { useDisconnect } from 'wagmi';
import storage from '@/utils/storage';
import { history, useModel } from 'umi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function ProfileHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <span>
        <i className="iconfont icon-bell "></i>
      </span>
      <div className={styles['img-container']} onClick={showModal}>
        <img className={styles['profile-img']} src="/profile.png" />
      </div>
      <ProfileModal
        styles={styles}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </header>
  );
}

function ProfileModal({ styles, isModalOpen, handleOk, handleCancel }) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const { initialState, setInitialState } = useModel('@@initialState');

        const { isLessee } = initialState || {};
        const { disconnect } = useDisconnect();
        const onIdentityChange = () => {
          storage.set({ name: ' isLessee', value: !isLessee });
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
                <img className={styles['profile-img']} src="/profile.png" />
              </div>
              <section className={styles['profile-info']}>
                <h3>{chain?.name}</h3>
                <span>
                  <p> {account?.displayName}</p>
                  <i className="iconfont icon-copy"></i>
                </span>
                <div className={styles['type-account']}>
                  {isLessee ? (
                    <div onClick={onIdentityChange}>
                      <p>Switch to Switch Lessor Role</p>
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
              <li>
                <i className="iconfont icon-search_doc"></i>{' '}
                <a onClick={() => handleNavigate('/genesis/access-control')}>
                  Access control
                </a>
              </li>
              {!isLessee && (
                <li>
                  <i className="iconfont icon-pledge"></i>
                  <a onClick={() => handleNavigate('/genesis/pledge')}>
                    Pledge
                  </a>
                </li>
              )}
              <li>
                <i className="iconfont icon-income"></i>
                <a onClick={() => handleNavigate('/genesis/income')}>
                  Income management
                </a>
              </li>
            </ul>
            <Button className={styles['log-out']} onClick={handleLogOut}>
              Logout
            </Button>
          </Modal>
        );
      }}
    </ConnectButton.Custom>
  );
}
