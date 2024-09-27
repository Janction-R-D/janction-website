import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Nodes from './components/Nodes';
import Instance from './components/Instance';
import BillDetails from './components/BillDetails';
import SocialsLinks from '@/components/SocialsLinks';
import styles from './index.less';
import CustomConnectButton from '../../components/CustomConnectButton';
import Create from './components/Create';
import Orders from './components/Orders';

const navList = [
  { name: 'Dashboard', path: '/genesis/dashboard', key: 0, icon: 'dashboard' },
  { name: 'Deploy Node', path: '/genesis/nodes', key: 1, icon: 'switch' },
  { name: 'My Nodes', path: '/genesis/instance', key: 2, icon: 'switch' },
  {
    name: 'Configuration Instance',
    path: '/genesis/create',
    key: 5,
    icon: 'switch',
  },
  { name: 'Orders', path: '/genesis/instance', key: 3, icon: 'switch' },
  { name: 'Billings', path: '/genesis/billDetails', key: 4, icon: 'switch' },
];

const Personal = (props) => {
  const [curNav, setCurNav] = useState(navList[0]);
  const [fold, setFold] = useState(false);
  const [menuShow, setMenuShow] = useState(false);

  const foldHandle = () => {
    setFold(!fold);
  };

  const onNavChange = (nav) => {
    setCurNav(nav);
    setMenuShow(false);
  };

  return (
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
          <div
            className={['hvr-grow', styles['fold']].join(' ')}
            onClick={foldHandle}
          >
            <i className="iconfont icon-pre"></i>
          </div>
        </header>
        <nav>
          {navList.map((item) => (
            <div
              key={item.key}
              className={curNav.key == item.key && styles['active']}
              onClick={() => onNavChange(item)}
            >
              <i className={`iconfont icon-${item.icon}`} />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
        <div className={styles['footer']}>
          <h1>JANCTION</h1>
          <p>©2024 janction.io</p>
          <div
            className={['hvr-grow', styles['unfold']].join(' ')}
            onClick={foldHandle}
          >
            <i className="iconfont icon-next"></i>
          </div>
        </div>
      </aside>
      <main>
        <header>
          <div className={styles['links']}>
            <a href="https://docs.janction.io" target="_black">
              <i className="iconfont icon-doc"></i>
            </a>
            <a href="https://github.com/Janction-R-D" target="_black">
              <i className="iconfont icon-github"></i>
            </a>
            {/* <a target="_black">
              <i className="iconfont icon-discord"></i>
            </a> */}
            <a href="https://x.com/JanctionMGT" target="_black">
              <i className="iconfont icon-x"></i>
            </a>
          </div>
          {/* <ConnectButton/> */}
          <CustomConnectButton />
        </header>
        <div className={styles['content']}>
          {curNav.key == 0 && <Dashboard />}
          {curNav.key == 1 && <Nodes />}
          {curNav.key == 2 && <Instance />}
          {curNav.key == 3 && <Orders />}
          {curNav.key == 4 && <BillDetails />}
          {curNav.key == 5 && <Create />}
          {window.location.pathname === '/genesis/create' && <Create />}
        </div>
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
  );
};

Personal.wrappers = ['@/wrappers/auth'];
export default Personal;
