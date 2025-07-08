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
// import MessageCenter from '@/pages/Genesis/Message-center';
import Nodes from '@/pages/Genesis/DeployNodes';
import Rol from '@/pages/Genesis/Rol';
import TryChat from '@/pages/Genesis/Agent/components/TryChat';
import PurchaseAi from '@/pages/Genesis/Agent/components/Purchase';
import Create from '@/pages/Genesis/Agent/components/Create';
import FileManager from '@/pages/Genesis/Agent/components/FileManager';
import HomeFooter from '@/pages/Home/components/Footer';
import HomeHeader from '@/pages/Home/components/Header';
import PaymentSuccessPage from '@/pages/Genesis/Purchase/Settlement/components/Success/Success';

// export const fullWidthRoute = ['/home', '/explore', '/getStarted', '/solution'];
export const fullWidthRoute = [];
export const newPaths = ['/home', '/solution', '/gpu', '/company'];
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
  '/genesis/rol',
  '/genesis/newbies',
  '/genesis/agent',
  '/genesis/agent/document',
  '/genesis/agent/my_repo',
  '/genesis/agent/about',
  '/genesis/agent/try_chat',
  '/genesis/agent/purchase',
  '/genesis/agent/create',
  '/genesis/agent/file_manager',
  '/genesis/purchase/success',
];

export default function Layout(props) {
  const { children } = props;

  const fullWidth = useMemo(() => {
    return fullWidthRoute.includes(props.location.pathname);
  }, [props.location.pathname]);
  const newPath = useMemo(() => {
    return newPaths.includes(props.location.pathname);
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

  if (isAuthRoute && props.location.pathname.includes('/rol')) {
    return <Rol />;
  }
  if (isAuthRoute && props.location.pathname.includes('/try_chat')) {
    return (
      <GenesisLayout>
        <TryChat />
      </GenesisLayout>
    );
  }
  if (isAuthRoute && props.location.pathname.includes('/agent/purchase')) {
    return (
      <GenesisLayout>
        <PurchaseAi />
      </GenesisLayout>
    );
  }
  if (isAuthRoute && props.location.pathname.includes('/agent/file_manager')) {
    return (
      <GenesisLayout>
        <FileManager />
      </GenesisLayout>
    );
  }
  if (isAuthRoute && props.location.pathname.includes('/agent/create')) {
    return (
      <GenesisLayout>
        <Create />
      </GenesisLayout>
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
  if (isAuthRoute && props.location.pathname.includes('/purchase/success')) {
    return <PaymentSuccessPage />;
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
  // entrada para la nueva pagina
  if (newPath) {
    return (
      <div id={styles['main-layout_2']}>
        <HomeHeader />
        <main className={fullWidth && styles['main-wp100']}>{children}</main>
        <HomeFooter />
      </div>
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
