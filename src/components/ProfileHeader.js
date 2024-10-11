import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './profileHeader.less';
import { useDisconnect } from 'wagmi';
import storage from '@/utils/storage';
import { history, useModel } from 'umi';

export default function ProfileHeader() {
  const [showModal, setShowModal] = useState(false);
  const classname = showModal ? 'card-modal' : 'none';
  const handleClick = () => {
    setShowModal(!showModal);
  };
  return (
    <header className={styles['header']}>
      <span>
        <i className="iconfont icon-bell "></i>
      </span>
      <div className={styles['img-container']} onClick={handleClick}>
        <img className={styles['profile-img']} src="/profile.png" />
      </div>
      <ProfileModal
        styles={styles}
        classname={classname}
        setShowModal={setShowModal}
      />
    </header>
  );
}

function ProfileModal({ styles, classname, setShowModal }) {
  const { initialState, setInitialState } = useModel('@@initialState');

  const { isLessees } = initialState;
  const { disconnect } = useDisconnect();
  const onIdentityChange = () => {
    storage.set({ name: 'isLessees', value: !isLessees });
    setInitialState({
      ...initialState,
      isLessees: !isLessees,
    });
    setShowModal(false);
    location.reload();
  };
  const handleLogOut = () => {
    disconnect();
    history.push('/');
  };
  return (
    <div className={styles[classname]}>
      <section className={styles['header-card']}>
        <div className={styles['modal-profile-img']}>
          <img className={styles['profile-img']} src="/profile.png" />
        </div>
        <section className={styles['profile-info']}>
          <h3>Nailia</h3>
          <span>
            <p> 237819371213</p>
            <i className="iconfont icon-copy"></i>
          </span>
          <div className={styles['type-account']}>
            {isLessees ? (
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
          <i className="iconfont icon-my-nodes"></i>
          <a>Personal information</a>
        </li>
        <li>
          <i className="iconfont icon-my-nodes"></i> <a>Access control</a>
        </li>
        <li>
          <i className="iconfont icon-my-nodes"></i> <a>Pledge</a>
        </li>
        <li>
          <i className="iconfont icon-my-nodes"></i>
          <a>Income management</a>
        </li>
      </ul>
      <Button className={styles['log-out']} onClick={handleLogOut}>
        Logout
      </Button>
    </div>
  );
}
