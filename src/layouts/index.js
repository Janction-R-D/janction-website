import Footer from '@/components/Layouts/Footer';
import Header from '@/components/Layouts/Header';
import LoginLayout from './LoginLayout';
import GenesisLayout from './GenesisLayout';
import 'animate.css';
import 'hover.css';
import styles from './index.less';
import { useEffect, useMemo } from 'react';
import { history } from 'umi';
import CreateLayout from './CreateLayout';

export const fullWidthRoute = ['/home', '/explore', '/getStarted', '/solution'];
export const marginTopRoute = ['/home', '/explore', '/getStarted'];
export const paddingRoute = ['/home', '/explore', '/getStarted'];

export default function Layout(props) {
  const { children } = props;

  const fullWidth = useMemo(() => {
    return fullWidthRoute.includes(props.location.pathname);
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

  if (props.location.pathname == '/genesis') {
    return <GenesisLayout>{children}</GenesisLayout>;
  }
  // if (props.location.pathname == '/create') {
  //   return <CreateLayout>{children}</CreateLayout>;
  // }

  return (
    <div id={styles['main-layout']}>
      <Header />
      <main className={fullWidth && styles['main-wp100']}>{children}</main>
      <Footer />
    </div>
  );
}
