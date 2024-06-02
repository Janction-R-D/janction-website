import styles from './index.less';

const FullScreenLayout = (props) => {
  return <div id={styles['full-screen-container']}>{props.children}</div>;
};

export default FullScreenLayout;
