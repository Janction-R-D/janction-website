import styles from './index.less';

const PurchaseSubCard = (props) => {
  const { title, children } = props;
  return (
    <div className={styles['purchase-sub-card']}>
      {title && <h2 className={styles['sub-card-title']}>{title}</h2>}
      <div className={styles['sub-card-content']}>{children}</div>
    </div>
  );
};

export default PurchaseSubCard;
