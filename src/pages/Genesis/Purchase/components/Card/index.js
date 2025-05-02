import JanctionDivider from '@/components/JanctionDivider';
import styles from './index.less';

const PurchaseCard = (props) => {
  const { title, children } = props;
  return (
    <div className={styles['purchase-card']}>
      <>
        <JanctionDivider />
      </>

      <div className={styles['card-content']}>{children}</div>
    </div>
  );
};

export default PurchaseCard;
