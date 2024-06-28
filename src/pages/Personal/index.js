import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Nodes from './components/Nodes';
import styles from './index.less';

const navList = [
  { name: 'Dashboard', path: '/personal/dashboard', key: 0, icon: 'dashboard' },
  { name: 'Deploy Node', path: '/personal/nodes', key: 1, icon: 'nodes' },
];

const Personal = (props) => {
  const [curNav, setCurNav] = useState(navList[0]);
  const [fold, setFold] = useState(false);

  const foldHandle = () => {
    setFold(!fold);
  };

  const onNavChange = (nav) => {
    setCurNav(nav);
  };

  return (
    <div className={styles['personal-container']}>
      <aside className={fold && styles['fold']}>
        <header>
          <img
            className={styles['logo-name']}
            src={require('@/assets/images/icons/logo_name.png')}
          />
          <img
            className={styles['logo']}
            src={require('@/assets/svgs/logo.svg')}
          />
          <div className={styles['fold']} onClick={foldHandle}>
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
              <i className={styles[item.icon]} />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
        <div className={styles['footer']}>
          <h1>JANCTION</h1>
          <p>©2024 janction.io</p>
          <i className={styles['unfold']} onClick={foldHandle}></i>
        </div>
      </aside>
      <main>
        <header>
          <div className={styles['links']}>
            <div>
              <i className="iconfont icon-doc"></i>
            </div>
            <div>
              <i className="iconfont icon-github"></i>
            </div>
            <div>
              <i className="iconfont icon-discord"></i>
            </div>
            <div>
              <i className="iconfont icon-x"></i>
            </div>
          </div>
          <ConnectButton></ConnectButton>
        </header>
        <div className={styles['content']}>
          {curNav.key == 0 && <Dashboard />}
          {curNav.key == 1 && <Nodes />}
        </div>
      </main>
    </div>
  );
};

Personal.wrappers = ['@/wrappers/auth'];
export default Personal;
