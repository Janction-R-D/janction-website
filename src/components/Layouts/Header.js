import dashboard from '@/assets/images/icons/dashboard.png';
import { renderBackgroudImg } from '@/utils/lang';
import { useEffect, useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { history } from 'umi';
import styles from './index.less';
import { useScroll } from 'framer-motion';

const routes = [
  { name: 'Home', path: '/', redirect: '/home' },
  { name: 'Explore', path: '/explore' },
  { name: 'Get started', path: '/getStarted' },
  { name: 'Solution', path: '/solution' },
];
const Header = (props) => {
  const [active, setActive] = useState();
  const [menuVisible, setMenuVisible] = useState(false);
  const { scrollY } = useScroll();
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    // const unsubscribe = scrollY.onChange((latest) => {
    //   setFixed(latest > 32);
    // });
    const unsubscribe = scrollY.on('change', (latest) => {
      setFixed(latest > 32);
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [scrollY]);

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
            className={
              active == item.path || active == item.redirect
                ? styles['active']
                : ''
            }
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
      className={[styles['main-header'], fixed && styles['fixed']].join(' ')}
    >
      <a
        className={styles['logo']}
        onClick={() => {
          history.push('/');
        }}
      >
        <img src={require('@/assets/images/icons/logo_name.png')} alt="logo" />
      </a>
      <nav>
        <ul>
          {routes.map((item) => (
            <li
              key={item.name}
              onClick={() => {
                onRouteClick(item);
              }}
              className={
                active == item.path || active == item.redirect
                  ? styles['active']
                  : ''
              }
            >
              {item.children ? (
                <Dropdown
                  overlayClassName={styles['children-dropdown']}
                  // overlay={() => renderChildren(item.children)}
                  menu={() => renderChildren(item.children)}
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
      <a
        onClick={() => {
          history.push('/genesis');
        }}
        className={styles['dashboard']}
        style={renderBackgroudImg(dashboard)}
      ></a>
      <Dropdown
        placement="bottomRight"
        overlay={renderMenu}
        // menu={renderMenu}
      >
        <div className={styles['android-menu']}>
          <i className="iconfont icon-line-menu" />
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;
