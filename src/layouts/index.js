import Footer from '@/components/Layouts/Footer';
import Header from '@/components/Layouts/Header';
import LoginLayout from './LoginLayout';
import GenesisLayout from './GenesisLayout';
import 'animate.css';
import 'hover.css';
import styles from './index.less';
import { useEffect, useMemo } from 'react';
import { history } from 'umi';
import { GenesisProvider } from './Context/GenesisContext';
import WalletManagement from '@/pages/Genesis/Wallet-Management';

export const fullWidthRoute = ['/home', '/explore', '/getStarted', '/solution'];
export const authRoute = [
  '/genesis/dashboard',
  '/genesis/deployNode',
  '/genesis/nodes',
  '/genesis/mount',
  '/genesis/instance',
  '/genesis/instance/create',
  '/genesis/purchase',
  '/genesis/help',
  '/genesis/orders',
  '/genesis/billDetails',
  '/genesis/user-center',
  '/genesis/pledge',
  '/genesis/income',
  '/genesis/purchase/settlement',
  '/genesis/wallet-management',
];

export default function Layout(props) {
  const { children } = props;

  const fullWidth = useMemo(() => {
    return fullWidthRoute.includes(props.location.pathname);
  }, [props.location.pathname]);

  const isAuthRoute = useMemo(() => {
    return authRoute.includes(props.location.pathname);
  }, [props.location.pathname]);

  useEffect(() => {
    history.listen(() => {
      //当路由切换时
      window.scrollTo(0, 0);
    });
  }, [props.location.pathname]);

  if (props.location.pathname.includes('/login')) {
    return <LoginLayout>{children}</LoginLayout>;
  }
  // wallet managment route
  if (isAuthRoute && props.location.pathname.includes('/wallet-management')) {
    return (
      <GenesisProvider>
        <WalletManagement />
      </GenesisProvider>
    );
  }

  if (isAuthRoute) {
    return (
      <GenesisProvider>
        <GenesisLayout>{children}</GenesisLayout>{' '}
      </GenesisProvider>
    );
  }

  // auth route 404
  if (props.location.pathname.includes('/genesis')) {
    return (
      <GenesisProvider>
        <GenesisLayout noPadding>{children}</GenesisLayout>
      </GenesisProvider>
    );
  }

  if (fullWidth) {
    return (
      <div id={styles['main-layout']}>
        <Header />
        <main className={fullWidth && styles['main-wp100']}>{children}</main>
        <Footer />
      </div>
    );
  }

  // 404
  return (
    <div id={styles['empty-layout']}>
      <Header />
      <main>{children}</main>
    </div>
  );
}
