import Footer from '@/components/Layouts/Footer';
import Header from '@/components/Layouts/Header';
import 'animate.css';
import ExploreLayout from './ExploreLayout';
import PersonalLayout from './PersonalLayout';
import styles from './index.less';

export default function Layout(props) {
  const { children } = props;

  if (props.location.pathname == '/personal') {
    return <PersonalLayout rainbowKit>{children}</PersonalLayout>;
  }

  if (props.location.pathname.includes('/explore')) {
    return <ExploreLayout rainbowKit>{children}</ExploreLayout>;
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
