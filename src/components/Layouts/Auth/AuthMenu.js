import { QuestionCircleOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';
import { navList } from '@/layouts/GenesisLayout';
export const AndroidAuthMenu = ({ active }) => {
  const [menuShow, setMenuShow] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { isLessee } = initialState || {};
  const menu = useMemo(() => {
    return navList.filter((item) => (item.role ? item.role(isLessee) : true));
  }, [isLessee]);
  const onMenuChange = (nav) => {
    history.push(nav.path);
  };

  return (
    <div className={styles['android-auth-menu']}>
      <section className={styles['menu-box']}>
        <i
          id="menu-icon"
          className={`iconfont ${!menuShow ? 'icon-line-menu' : 'icon-close'}`}
          onClick={() => {
            setMenuShow(!menuShow);
          }}
        ></i>
        <div
          className={`${styles['role']} ${
            isLessee ? styles['buyer-role'] : ''
          }`}
          id="welcome-android"
        >
          {isLessee ? <span>Lessee</span> : <span>Lessor</span>}
        </div>
      </section>
      <nav className={`${menuShow ? styles['menu-show'] : ''}`}>
        {(menu || []).map((item) => (
          <li key={item.key}>
            <div
              className={`${active == item.path ? styles['active'] : ''}`}
              onClick={() => {
                setMenuShow(false);
                onMenuChange(item);
              }}
            >
              <i className={`iconfont icon-${item.icon}`} />
              <span>{item.name}</span>
            </div>
            {active == item.path ? (
              <i className="iconfont icon-check1"></i>
            ) : null}
          </li>
        ))}
      </nav>
    </div>
  );
};

export const AuthMenuAside = ({ menu, active, onMenuChange }) => {
  const { initialState } = useModel('@@initialState');

  const { isLessee } = initialState || {};

  const [fold, setFold] = useState(true);

  const foldHandle = () => {
    setFold(!fold);
  };

  return (
    <aside
      className={[styles['auth-menu-aside'], fold && styles['fold']].join(' ')}
    >
      <header>
        <section>
          <img
            className={styles['logo-name']}
            id="welcome"
            src={require('@/assets/images/icons/logo_name.png')}
          />
          <div className={styles['logo']}>
            <img src={require('@/assets/images/icons/logo.png')} />
          </div>

          {!fold && (
            <div
              className={`${styles['role']} ${
                isLessee ? styles['buyer-role'] : ''
              }`}
            >
              {isLessee ? <span>Lessee</span> : <span>Lessor</span>}
            </div>
          )}
        </section>
      </header>
      <nav>
        {menu.map((item) => (
          <div
            id={item.id}
            key={item.key}
            className={`${styles['menu-item']} ${
              active === item.path || (active && active === item.redirect)
                ? styles['active']
                : ''
            }`}
            onClick={() => onMenuChange(item)}
          >
            <div className={styles['icon']}>
              <i className={`iconfont icon-${item.icon}`} />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </nav>
      <div className={styles['footer']}>
        <div
          className={styles['item']}
          onClick={() => {
            history.push('/genesis/help');
          }}
        >
          <div className={styles['icon']}>
            <QuestionCircleOutlined />
          </div>
          <span>Help</span>
        </div>
        {/* <div className={styles['item']}>
    <div className={styles['icon']}>
      <SettingOutlined />
    </div>
    <span>Settings</span>
  </div> */}
      </div>
      <div
        className={styles['fold-wrapper-2']}
        onClick={() => history.push('/')}
        id="home-icon"
      >
        <i className="iconfont icon-home1"></i>
      </div>
      <div className={styles['fold-wrapper']} onClick={foldHandle}>
        <i className={`iconfont ${fold ? 'icon-unfold' : 'icon-fold'}`}></i>
      </div>
    </aside>
  );
};

export default AndroidAuthMenu;
