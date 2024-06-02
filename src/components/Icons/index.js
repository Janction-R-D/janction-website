import styles from './index.less';

const Icons = (props) => {
  const { name, width, height, className, ...extra } = props;

  return (
    <i
      className={`${styles[name]} ${className}`}
      style={{ width, height }}
      {...extra}
    ></i>
  );
};

export default Icons;
