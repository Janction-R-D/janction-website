import Footer from '@/components/Layouts/Footer';
import Header from '@/components/Layouts/Header';
import styles from './index.less';
import Create from '../pages/Genesis/BillDetails/components/Create';

const CreateLayout = (props) => {
  return (
    <div id={styles['explore-layout']} className={props.className}>
      <Header />
      <main className={styles['page-container']}>
        <Create />
      </main>
      <Footer />
    </div>
  );
};

export default CreateLayout;
