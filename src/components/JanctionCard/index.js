import JanctionDivider from '../JanctionDivider';
import styles from './index.less';

const JanctionCard = (props) => {
  const { title, divider, children } = props;

  return (
    <div className={styles['janction-card']}>
      {title && <h1 className={styles['card-title']}>{title}</h1>}
      {divider && <JanctionDivider />}
      <div className={styles['card-content']}>{children}</div>
    </div>
  );
};

export default JanctionCard;
