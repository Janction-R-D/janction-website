import Footer from '@/components/Layouts/Footer';
import Header from '@/components/Layouts/Header';
import styles from './index.less';

const ExploreLayout = (props) => {
  return (
    <div id={styles['explore-layout']} className={props.className}>
      <Header />
      <main className={styles['page-container']}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default ExploreLayout;
