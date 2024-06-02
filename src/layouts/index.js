import { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import SocialsLinks from '@/components/SocialsLinks';
import 'animate.css';
import FullScreenLayout from './FullScreenLayout';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Product', path: '/product' },
  { name: 'Ecosystem', path: '/ecosystem' },
  { name: 'Articles', path: '/articles' },
];

export default function Layout(props) {
  const { children } = props;
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(history.location.pathname);
  }, [history.location.pathname]);

  const onRouteClick = (route) => {
    setActive(route.path);
    history.push(route.path);
  };

  if (props.location.pathname === '/personal') {
    return <FullScreenLayout>{props.children}</FullScreenLayout>;
  }

  return (
    <div id={styles['container']}>
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
      <main className={styles['page-container']}>{children}</main>
      <footer className="animate__animated animate__zoomIn">
        <div className="df jc_sb ai_c">
          <div className="df fd_c">
            <img
              src={require('@/assets/images/icons/jun-icon.png')}
              alt=""
              width="52"
              height="52"
            />
            <img
              src={require('@/assets/images/icons/jun.png')}
              alt=""
              width="122"
              height="17"
              className="mt40 mb40"
            />
          </div>
          <div className={styles['links-container']}>
            <div>
              <div>Developers</div>
              <a>Product</a>
              <a>Ecosystem</a>
              <a>Whitepaper</a>
            </div>
            <div>
              <div>Company</div>
              <a>Home</a>
              <a>About</a>
              <a>Articles</a>
            </div>
            <div>
              <div>Community</div>
              <a>Twitter</a>
              <a>Discord</a>
            </div>
          </div>
        </div>
        <div className={styles['related-container']}>
          <SocialsLinks />
          <a href="/" className="f16">
            ©2024
          </a>
        </div>
      </footer>
    </div>
  );
}
