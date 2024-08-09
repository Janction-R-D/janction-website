import styles from './index.less';
import SocialsLinks from '@/components/SocialsLinks';
import { history } from 'umi';

const routes = [
  {
    name: 'App',
    children: [
      // { name: 'Overview', path: '/explore/overview' },
      { name: 'Dashboard', path: '/genesis', target: '_blank', icon: 'deploy' },
      { name: 'Nodes Status', path: '/explore/nodes', icon: 'nodes' },
      { name: 'Award', path: '/explore/point', icon: 'point' },
    ],
  },
];

const Launch = (props) => {
  const onRouteClick = (route) => {
    if (!route.path) return;
    history.push(route.path);
  };

  return (
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
        <a className={styles['doc']}>
          <i className="iconfont icon-doc"></i>
        </a>
      </header>
      <main>
        <section>
          <h1>Launch</h1>
          <div className={styles['launch-content']}>
            {routes.map((route) => (
              <div key={route.name} className={styles['function']}>
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
                        <img
                          src={require(`@/assets/images/icons/${item.icon}.png`)}
                        />
                        <span>{item.name}</span>
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
          src={require('@/assets/images/icons/logo.png')}
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
  );
};

export default Launch;
