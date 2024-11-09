import styles from './index.less';

const LabelVal = (props) => {
  const { name, children, align = 'center' } = props;
  return (
    <div
      className={styles['label-value-wrapper']}
      style={{ alignItems: align }}
    >
      <div className={styles['name']}>{name}</div>
      <div className={styles['value']}>{children}</div>
    </div>
  );
};

export default LabelVal;
