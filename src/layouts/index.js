import Footer from '@/components/Layouts/Footer';
import Header from '@/components/Layouts/Header';
import LoginLayout from './LoginLayout';
import ExploreLayout from './ExploreLayout';
import PersonalLayout from './PersonalLayout';
import 'animate.css';
import 'hover.css';
import styles from './index.less';

export default function Layout(props) {
  const { children } = props;

  if (props.location.pathname.includes('/login')) {
    return <LoginLayout>{children}</LoginLayout>;
  }

  if (props.location.pathname == '/personal') {
    return <PersonalLayout>{children}</PersonalLayout>;
  }

  if (props.location.pathname == '/launch') {
    return children;
  }

  return (
    <div id={styles['container']}>
      <Header />
      <main className={styles['page-container']}>{children}</main>
      <div className={styles['shadow-box-1']}></div>
      <div className={styles['shadow-box-2']}></div>
      <Footer />
    </div>
  );
}
