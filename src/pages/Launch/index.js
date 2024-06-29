import styles from './index.less';
import SocialsLinks from '@/components/SocialsLinks';
import RainbowKit from '@/components/RainbowKit';
import { history } from 'umi';

const routes = [
  {
    name: 'Nexus',
    children: [
      { name: 'Overview', path: '/explore/overview' },
      { name: 'Nodes', path: '/explore/nodes' },
      { name: 'Point', path: '/explore/point' },
    ],
  },
  { name: 'Genesis', path: '/personal', target: '_blank' },
  { name: 'Wating' },
];

const Launch = (props) => {
  const onRouteClick = (route) => {
    if (!route.path) return;
    history.push(route.path);
  };

  return (
    <RainbowKit>
      <div className={styles['launch-container']}>
        <header>
          <a className={styles['logo']} href="/">
            <img
              src={require('@/assets/images/icons/logo_name.png')}
              alt="logo"
              width="116"
              height="24"
            />
          </a>
          <div>
            <i className="iconfont icon-doc"></i>
          </div>
        </header>
        <main>
          <section>
            <h1>Launch</h1>
            <div className={styles['launch-content']}>
              {routes.map((route) => (
                <div
                  key={route.name}
                  className={[styles['function'], styles[route.name]].join(' ')}
                  onClick={() => {
                    if (route.children) return;
                    onRouteClick(route);
                  }}
                >
                  <div className="df ai_c gap10">
                    <i></i>
                    <h2>{route.name}</h2>
                  </div>
                  {route.children && (
                    <div className={styles['routes']}>
                      {route.children.map((item) => (
                        <a
                          className={[styles['item'], 'hvr-float'].join(' ')}
                          key={item.name}
                          onClick={() => onRouteClick(item)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
        <footer>
          <img
            src={require('@/assets/images/icons/jun-icon.png')}
            alt=""
            width="52"
            height="52"
          />
          <div className="df ai_c">
            <SocialsLinks />
            <a href="/" className="f16">
              ©2024
            </a>
          </div>
        </footer>
      </div>
    </RainbowKit>
  );
};

export default Launch;
