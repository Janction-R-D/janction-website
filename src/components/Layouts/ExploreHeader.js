import Icons from '@/components/Icons';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { Dropdown, Menu } from 'antd';
import { useAccount } from 'wagmi';
import styles from './index.less';

const routes = [
  { name: 'Overview', path: '/explore/overview', key: 0, icon: 'overview' },
  { name: 'Nodes', path: '/explore/nodes', key: 1, icon: 'nodes' },
  { name: 'Point', path: '/explore/point', key: 2, icon: 'point' },
];
const ExploreHeader = (props) => {
  const [active, setActive] = useState(routes[0]);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    setActive(history.location.pathname);
  }, [history.location.pathname]);

  const onRouteClick = (route) => {
    setActive(route.path);
    history.push(route.path);
  };

  const renderMenu = () => {
    return (
      <Menu>
        {routes.map((item) => (
          <Menu.Item
            key={item.name}
            path={item.path}
            onClick={() => onRouteClick(item)}
          >
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <header
      className={`animate__animated animate__fadeInDown df ai_c jc_sb ${styles['explore-header']}`}
    >
      <nav>
        <ul className="df ai_c">
          {routes.map((item) => (
            <li
              key={item.name}
              className={`df ai_c ${item.path == active && styles['active']}`}
              onClick={() => onRouteClick(item)}
            >
              <img
                src={require(`@/assets/svgs/${item.icon}.svg`)}
                width={24}
                height={24}
              />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
      <a className={styles['logo']} href="/">
        <img
          src={require('@/assets/images/icons/logo_name.png')}
          alt="logo"
          width="116"
          height="24"
        />
      </a>
      <div className={styles['extra']}>
        <div className={styles['connect-account']}>
          {address ? (
            <ConnectButton className="hvr-grow" />
          ) : (
            <button
              onClick={openConnectModal}
              className={['hvr-grow', styles['connect-button']].join(' ')}
            >
              Connect Account
            </button>
          )}
        </div>
      </div>
      <Dropdown overlay={renderMenu}>
        <div className={styles['android-menu']}>
          <Icons name="menu" />
        </div>
      </Dropdown>
    </header>
  );
};

export default ExploreHeader;
