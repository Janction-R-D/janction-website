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
export const marginTopRoute = ['/home', '/explore', '/getStarted'];
export const paddingRoute = ['/home', '/explore', '/getStarted'];

export default function Layout(props) {
  const { children } = props;

  const fullWidth = useMemo(() => {
    return fullWidthRoute.includes(props.location.pathname);
  }, [props.location.pathname]);

  const marginTop = useMemo(() => {
    return marginTopRoute.includes(props.location.pathname);
  }, [props.location.pathname]);

  const padding = useMemo(() => {
    return paddingRoute.includes(props.location.pathname);
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
      <main
        className={[
          fullWidth && styles['main-wp100'],
          marginTop && styles['main-mt'],
          padding && styles['main-pd'],
        ].join(' ')}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
