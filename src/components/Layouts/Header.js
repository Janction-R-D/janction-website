import SocialsLinks from '@/components/SocialsLinks';
import Icons from '@/components/Icons';
import { useEffect, useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { history } from 'umi';
import styles from './index.less';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Product', path: '/product' },
  { name: 'Ecosystem', path: '/ecosystem' },
  { name: 'Articles', path: '/articles' },
  { name: 'GetStarted', path: '/getStarted' },
];
const Header = (props) => {
  const [active, setActive] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    setActive(history.location.pathname);
  }, [history.location.pathname]);

  const onRouteClick = (route) => {
    setMenuVisible(!menuVisible);
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
      className={`animate__animated animate__fadeInDown ${styles['main-header']}`}
    >
      <a className={styles['logo']} href="/">
        <img
          src={require('@/assets/images/icons/logo_name.png')}
          alt="logo"
          width="116"
          height="24"
        />
      </a>
      <nav>
        <ul>
          {routes.map((item) => (
            <li
              key={item.name}
              onClick={() => {
                onRouteClick(item);
              }}
              className={active == item.path ? styles['active'] : ''}
            >
              <a>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <SocialsLinks />
      <Dropdown overlay={renderMenu}>
        <div className={styles['android-menu']}>
          <Icons name="menu" />
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;
