import Footer from '@/components/Layouts/Footer';
import Header from '@/components/Layouts/Header';
import LoginLayout from './LoginLayout';
import GenesisLayout from './GenesisLayout';
import 'animate.css';
import 'hover.css';
import styles from './index.less';
import ExploreLayout from './ExploreLayout';
import { useMemo } from 'react';

export const fullWidthRoute = ['/home', '/explore', '/getStarted', '/solution'];

export default function Layout(props) {
  const { children } = props;

  const fullWidth = useMemo(() => {
    return fullWidthRoute.includes(props.location.pathname);
  }, [props.location.pathname]);

  if (props.location.pathname.includes('/login')) {
    return <LoginLayout>{children}</LoginLayout>;
  }

  if (props.location.pathname == '/genesis') {
    return <GenesisLayout>{children}</GenesisLayout>;
  }

  return (
    <div id={styles['main-layout']}>
      <Header />
      <main className={fullWidth && styles['main-wp100']}>{children}</main>
      <Footer />
    </div>
  );
}
