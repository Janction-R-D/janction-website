import SocialsLinks from '@/components/SocialsLinks';
import { useEffect, useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { history } from 'umi';
import styles from './index.less';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  {
    name: 'Product',
    children: [
      { name: 'Product', path: '/product' },
      { name: 'GetStarted', path: '/getStarted' },
    ],
  },
  { name: 'Ecosystem', path: '/ecosystem' },
  { name: 'Articles', path: '/articles' },
  { name: 'Launch', path: '/launch', target: '_blank' },
];
const Header = (props) => {
  const [active, setActive] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setActive(history.location.pathname);
  }, [history.location.pathname]);

  const onRouteClick = (route) => {
    if (route.target == '_blank') {
      window.open(route.path);
      return;
    }
    setMenuVisible(!menuVisible);
    setActive(route.path);
    history.push(route.path);
  };

  const renderMenu = () => {
    const renderChildren = (menuItem) => {
      if (menuItem.children) {
        return (
          <Menu.SubMenu
            key={menuItem.name}
            path={menuItem.path}
            onClick={() => onRouteClick(menuItem)}
            title={menuItem.name}
          >
            {menuItem.children.map((item) => renderChildren(item))}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item
          key={menuItem.name}
          path={menuItem.path}
          onClick={() => onRouteClick(menuItem)}
        >
          {menuItem.name}
        </Menu.Item>
      );
    };
    return <Menu>{routes.map((item) => renderChildren(item))}</Menu>;
  };

  const renderChildren = (children) => {
    return (
      <Menu className={styles['children-menu']}>
        {children.map((item) => (
          <Menu.Item
            key={item.name}
            path={item.path}
            onClick={() => onRouteClick(item)}
            className={active == item.path ? styles['active'] : ''}
          >
            <a>
              <span>{item.name}</span>
              <div className={styles['arrow']}>
                <img src={require('@/assets/svgs/expand.svg')} alt="" />
              </div>
            </a>
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
              {item.children ? (
                <Dropdown
                  overlayClassName={styles['children-dropdown']}
                  overlay={() => renderChildren(item.children)}
                >
                  <a>{item.name}</a>
                </Dropdown>
              ) : (
                <a>{item.name}</a>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <SocialsLinks className={styles['links']} />
      <Dropdown placement="bottomRight" overlay={renderMenu}>
        <div className={styles['android-menu']}>
          <i className="iconfont icon-line-menu" />
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;
