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
import MessageCenter from '@/pages/Genesis/Message-center';
import Nodes from '@/pages/Genesis/DeployNodes';
import Purchase from '@/pages/Genesis/Purchase';
import PurchaseLayout from './PurchaseLayout';
import Settlement from '@/pages/Genesis/Purchase/Settlement';

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
  '/genesis/message-center',
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
        <GenesisLayout aside={false}>
          <WalletManagement />
        </GenesisLayout>
      </GenesisProvider>
    );
  }
  // message center route
  // if (isAuthRoute && props.location.pathname.includes('/message-center')) {
  //   return (
  //     <GenesisProvider>
  //       <MessageCenter />
  //     </GenesisProvider>
  //   );
  // }
  // deployNodes new UI for testing
  if (props.location.pathname.includes('/deployNodes')) {
    return (
      <GenesisProvider>
        <GenesisLayout>
          <Nodes />
        </GenesisLayout>
      </GenesisProvider>
    );
  }
  if (props.location.pathname == '/genesis/purchase') {
    return (
      <GenesisProvider>
        <PurchaseLayout>
          <Purchase />
        </PurchaseLayout>
      </GenesisProvider>
    );
  }
  if (props.location.pathname == '/genesis/purchase/settlement') {
    return (
      <GenesisProvider>
        <PurchaseLayout>
          <Settlement />
        </PurchaseLayout>
      </GenesisProvider>
    );
  }
  if (isAuthRoute) {
    return (
      <GenesisProvider>
        <GenesisLayout>{children}</GenesisLayout>
      </GenesisProvider>
    );
  }

  // no aside
  if (props.location.pathname == '/genesis/rewards') {
    return (
      <GenesisProvider>
        <GenesisLayout aside={false} rewards>
          {children}
        </GenesisLayout>
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

  if (props.location.pathname == '/root') {
    return <div id={styles['main-layout']}>{children}</div>;
  }

  // 404
  return (
    <div id={styles['empty-layout']}>
      <Header />
      <main>{children}</main>
    </div>
  );
}
