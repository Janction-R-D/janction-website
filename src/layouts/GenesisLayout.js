import AuthHeader from '@/components/Layouts/Auth/AuthHeader';
import { AuthMenuAside } from '@/components/Layouts/Auth/AuthMenu';
import SocialsLinks from '@/components/SocialsLinks';
import { useEffect, useMemo, useState } from 'react';
import { history, useModel } from 'umi';
import styles from './genesis.less';

export const navList = [
  {
    name: 'Dashboard',
    path: '/genesis/dashboard',
    redirect: '/genesis',
    id: 'dashboard',
    key: 0,
    icon: 'home',
  },
  {
    name: 'Deploy Node',
    path: '/genesis/deployNode',
    key: 1,
    id: 'deployNode',
    icon: 'deploy-node',
    role: (isLessee) => !isLessee,
  },
  {
    name: 'Purchase',
    path: '/genesis/purchase',
    key: 6,
    id: 'purchase-link',
    icon: 'purchase',
    role: (isLessee) => isLessee,
  },
  {
    name: 'My Instance',
    path: '/genesis/instance',
    key: 2,
    id: 'instances-link',
    icon: 'my-nodes',
    role: (isLessee) => isLessee,
  },
  {
    name: 'My Nodes',
    path: '/genesis/nodes',
    key: 3,
    id: 'nodes',
    icon: 'my-nodes',
    role: (isLessee) => !isLessee,
  },
  {
    name: 'Orders',
    path: '/genesis/orders',
    key: 4,
    id: 'orders-link',
    icon: 'workbench',
    role: (isLessee) => isLessee,
  },
  {
    name: 'Billings',
    path: '/genesis/billDetails',
    key: 5,
    icon: 'billings',
    id: 'billDetails',
    role: (isLessee) => !isLessee,
  },
];
const GenesisLayout = (props) => {
  const { children, noPadding, aside = true, rewards } = props;

  const { initialState } = useModel('@@initialState');

  const { isLessee } = initialState || {};

  const [active, setActive] = useState();

  useEffect(() => {
    setActive(history.location.pathname);
  }, [history.location.pathname]);

  const onMenuChange = (nav) => {
    if (nav.name === 'Purchase') {
      history.push(nav.path, { path: location.pathname }); // location.pathname
    } else {
      history.push(nav.path);
    }
  };

  const menu = useMemo(() => {
    return navList.filter((item) => (item.role ? item.role(isLessee) : true));
  }, [isLessee]);

  return (
    <div id={styles['genesis-layout']}>
      <main>
        <div className={styles['personal-container']}>
          {aside && (
            <AuthMenuAside
              menu={menu}
              active={active}
              onMenuChange={onMenuChange}
            />
          )}
          <main className={noPadding && styles['main-no-padding']}>
            <AuthHeader
              showLogo={rewards}
              // menu={menu}
              active={active}
              onMenuChange={onMenuChange}
            />
            <div className={styles['content']}>{children}</div>
            {rewards && (
              <footer className={styles['rewards-footer']}>
                <div>
                  <a className={styles['logo']}>
                    <img
                      src={require('@/assets/images/icons/logo_name.png')}
                      alt="logo"
                    />
                  </a>
                  <p>
                    Thank you for your contributions to the Janction computing
                    Power Network
                  </p>
                </div>
              </footer>
            )}
          </main>
          {!rewards && (
            <footer className={styles['android-footer']}>
              <img
                className={styles['logo']}
                src={require('@/assets/images/icons/logo_name.png')}
              />
              <div className={styles['bottom']}>
                <SocialsLinks />
                <p className={styles['comp-info']}>
                  JANCTION ©2024
                  <br />
                  janction.io
                </p>
              </div>
            </footer>
          )}
        </div>
      </main>
    </div>
  );
};
GenesisLayout.wrappers = ['@/wrappers/auth'];
export default GenesisLayout;
