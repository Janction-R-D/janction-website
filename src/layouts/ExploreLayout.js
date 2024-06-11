import ExploreHeader from '@/components/Layouts/ExploreHeader';
import Footer from '@/components/Layouts/Footer';
import RainbowKit from '@/components/RainbowKit';
import 'animate.css';
import styles from './index.less';

export default function ExploreLayout(props) {
  const { children } = props;

  return (
    <div id={styles['explore-container']}>
      <RainbowKit>
        <ExploreHeader />
        <main className={styles['page-container']}>{children}</main>
        <Footer />
      </RainbowKit>
    </div>
  );
}
