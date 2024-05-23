import PageContainer from '@/components/PageContainer';
import styles from './index.less';

const Products = (props) => {
  return (
    <PageContainer>
      <div className={styles['product-container']}>
        <div className="animate__animated animate__zoomIn df jc_c">
          <h2 data-text="THE JANCTION FOR ALL AI SERVICE">
            THE JANCTION FOR ALL AI SERVICE
          </h2>
        </div>
      </div>
    </PageContainer>
  );
};

export default Products;
