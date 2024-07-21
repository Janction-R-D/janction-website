import Footer from '@/components/Layouts/Footer';
import Header from '@/components/Layouts/Header';
import LoginLayout from './LoginLayout';
import PersonalLayout from './PersonalLayout';
import 'animate.css';
import 'hover.css';
import styles from './index.less';
import ExploreLayout from './ExploreLayout';
import { useMemo } from 'react';

export default function Layout(props) {
  const { children } = props;

  if (props.location.pathname.includes('/login')) {
    return <LoginLayout>{children}</LoginLayout>;
  }

  if (props.location.pathname == '/genesis') {
    return <PersonalLayout>{children}</PersonalLayout>;
  }

  if (props.location.pathname == '/explore/point') {
    return <ExploreLayout>{children}</ExploreLayout>;
  }

  if (props.location.pathname == '/explore/nodes') {
    return (
      <ExploreLayout className={styles['explore-nodes-container']}>
        {children}
      </ExploreLayout>
    );
  }

  if (props.location.pathname == '/launch') {
    return children;
  }

  const fullWidth = useMemo(() => {
    return props.location.pathname == '/home';
  }, [props.location.pathname]);

  return (
    <div id={styles['container']}>
      <Header />
      <main className={fullWidth && styles['main-wp100']}>{children}</main>
      {/* <div className={styles['shadow-box-1']}></div> */}
      {/* <div className={styles['shadow-box-2']}></div> */}
      <Footer />
    </div>
  );
}
