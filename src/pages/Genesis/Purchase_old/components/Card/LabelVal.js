import styles from './index.less';

const LabelVal = (props) => {
  const { name, nameWidthAuto, children, align = 'center' } = props;
  return (
    <div
      className={styles['label-value-wrapper']}
      style={{ alignItems: align }}
    >
      <div
        className={[
          styles['name'],
          nameWidthAuto && styles['name-auto-width'],
        ].join(' ')}
      >
        {name}
      </div>
      <div className={styles['value']}>{children}</div>
    </div>
  );
};

export default LabelVal;
