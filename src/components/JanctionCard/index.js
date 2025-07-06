import JanctionDivider from '../JanctionDivider';
import styles from './index.less';

const JanctionCard = (props) => {
  const { title, extra, divider, className, children, ...extraProps } = props;

  return (
    <div
      className={[styles['janction-card'], className].join(' ')}
      {...(extraProps || {})}
    >
      <div className={styles['card-header']}>
        {title && <h1 className={styles['card-title']}>{title}</h1>}
        {extra && <div>{extra}</div>}
      </div>
      {divider && <JanctionDivider />}
      <div className={styles['card-content']}>{children}</div>
    </div>
  );
};

export default JanctionCard;
