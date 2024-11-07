import CustomConnectButton from '@/components/CustomConnectButton';
import SocialsLinks from '@/components/SocialsLinks';
import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import ProfileHeader from '../components/ProfileHeader';
import styles from './genesis.less';

const navList = [
  {
    name: 'Dashboard',
    path: '/genesis/dashboard',
    redirect: '/genesis',
    key: 0,
    icon: 'home',
  },
  {
    name: 'Deploy Node',
    path: '/genesis/nodes',
    key: 1,
    icon: 'deploy-node',
  },
  { name: 'My instances', path: '/genesis/instance', key: 2, icon: 'my-nodes' },
  { name: 'Orders', path: '/genesis/orders', key: 3, icon: 'my-nodes' },
  {
    name: 'Billings',
    path: '/genesis/billDetails',
    key: 4,
    icon: 'billings',
  },
];
const GenesisLayout = (props) => {
  const { children } = props;

  const [active, setActive] = useState();
  const [fold, setFold] = useState(false);
  const [menuShow, setMenuShow] = useState(false);

  useEffect(() => {
    setActive(history.location.pathname);
  }, [history.location.pathname]);

  const foldHandle = () => {
    setFold(!fold);
  };

  const onNavChange = (nav) => {
    setMenuShow(false);
    history.push(nav.path);
  };

  // const onIdentityChange = () => {
  //   storage.set({ name: 'isLessees', value: !isLessees });
  //   setInitialState({
  //     ...initialState,
  //     isLessees: !isLessees,
  //   });
  //   location.reload();
  // };

  return (
    <div id={styles['genesis-layout']}>
      <main>
        <div className={styles['personal-container']}>
          <header className={styles['android-header']}>
            <div className={styles['menu']}>
              <i
                className="iconfont icon-point-menu"
                onClick={() => {
                  setMenuShow(!menuShow);
                }}
              ></i>
              <nav
                className={styles['menu-list']}
                style={{ display: menuShow ? 'flex' : 'none' }}
              >
                {navList.map((item) => (
                  <div key={item.key} onClick={() => onNavChange(item)}>
                    <i className={`iconfont icon-${item.icon}`} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </nav>
            </div>
            <img
              className={styles['logo']}
              src={require('@/assets/images/icons/logo_name.png')}
            />
            <CustomConnectButton afterClick={() => setMenuShow(false)} />
          </header>
          <aside className={fold && styles['fold']}>
            <header>
              <img
                className={styles['logo-name']}
                src={require('@/assets/images/icons/logo_name.png')}
              />
              <div className={styles['logo']}>
                <img src={require('@/assets/images/icons/logo.png')} />
              </div>
            </header>
            <nav>
              {navList.map((item) => (
                <div
                  key={item.key}
                  className={
                    (active == item.path ||
                      (active && active == item.redirect)) &&
                    styles['active']
                  }
                  onClick={() => onNavChange(item)}
                >
                  <div className={styles['icon']}>
                    <i className={`iconfont icon-${item.icon}`} />
                  </div>
                  <span>{item.name}</span>
                </div>
              ))}
            </nav>
            <div className={styles['footer']}>
              <div className={styles['item']}>
                <div className={styles['icon']}>
                  <QuestionCircleOutlined />
                </div>
                <span>Help</span>
              </div>
              <div className={styles['item']}>
                <div className={styles['icon']}>
                  <SettingOutlined />
                </div>
                <span>Settings</span>
              </div>
            </div>
            <div className={styles['fold-wrapper-2']}>
              <a href="/">
                <i className="iconfont icon-home1"></i>
              </a>
            </div>
            <div className={styles['fold-wrapper']} onClick={foldHandle}>
              <i
                className={`iconfont ${fold ? 'icon-unfold' : 'icon-fold'}`}
              ></i>
            </div>
          </aside>
          <main>
            <header>
              <ProfileHeader />
            </header>
            <div className={styles['content']}>{children}</div>
          </main>
          <footer className={styles['android-footer']}>
            <img
              className={styles['logo']}
              src={require('@/assets/images/icons/logo_name.png')}
            />
            <div className={styles['bottom']}>
              <SocialsLinks />
              <p className={styles['comp-info']}>
                JANCTION ©2024
                <br />
                janction.io
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};
GenesisLayout.wrappers = ['@/wrappers/auth'];
export default GenesisLayout;
