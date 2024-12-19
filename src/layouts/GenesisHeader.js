import React, { useContext, useState } from 'react';
import { history, useModel } from 'umi';
import styles from './genesis.less';
import GenesisContext from './Context/GenesisContext';
import { ProfileModal } from '@/components/ProfileHeader';
import NotifyModal from '@/components/NotifyModal';

export default function GenesisHeader({ menu }) {
  const { initialState } = useModel('@@initialState');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const { imgUrl, setImgUrl } = useContext(GenesisContext);
  const [menuShow, setMenuShow] = useState(false);
  const { isLessee } = initialState || {};
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleNotifyOk = () => {
    setIsNotifyModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onNavChange = (nav) => {
    setMenuShow(false);
    history.push(nav.path);
  };

  return (
    <header className={styles['android-header']}>
      <div className={styles['menu']}>
        <section className={styles['menu-box']}>
          <i
            className="iconfont icon-line-menu"
            onClick={() => {
              setMenuShow(!menuShow);
            }}
          ></i>
          <div
            className={`${styles['role']} ${
              isLessee ? styles['buyer-role'] : ''
            }`}
          >
            {isLessee ? <span>Tenant</span> : <span>Landlord</span>}
          </div>
        </section>

        <nav
          className={styles['menu-list']}
          style={{ display: menuShow ? 'flex' : 'none' }}
        >
          {menu.map((item) => (
            <div key={item.key} onClick={() => onNavChange(item)}>
              <i className={`iconfont icon-${item.icon}`} />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>
      {/* <img
              className={styles['logo']}
              src={require('@/assets/images/icons/logo_name.png')}
            /> */}
      <section className={styles['profile']}>
        <span onClick={handleNotifyOk}>
          <i className="iconfont icon-bell "></i>
        </span>
        <div className={styles['img-container']} onClick={showModal}>
          <img className={styles['profile-img']} src={imgUrl} />
        </div>
        <NotifyModal
          isModalOpen={isNotifyModalOpen}
          setIsModalOpen={setIsNotifyModalOpen}
          handleOk={handleNotifyOk}
        />
        <ProfileModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          imgUrl={imgUrl}
        />
      </section>
    </header>
  );
}
