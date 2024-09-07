import styles from './index.less';

const GenesisLayout = (props) => {
  const { children } = props;

  return (
    <div id={styles['genesis-layout']}>
      <main>{children}</main>
    </div>
  );
};

export default GenesisLayout;
