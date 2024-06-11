import SocialsLinks from '@/components/SocialsLinks';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

const Header = (props) => {
  const [active, setActive] = useState();
  const routes = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Product', path: '/product' },
    { name: 'Ecosystem', path: '/ecosystem' },
    { name: 'Articles', path: '/articles' },
    { name: 'GetStarted', path: '/getStarted' },
  ];

  useEffect(() => {
    setActive(history.location.pathname);
  }, [history.location.pathname]);

  const onRouteClick = (route) => {
    setActive(route.path);
    history.push(route.path);
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
    </header>
  );
};

export default Header;
