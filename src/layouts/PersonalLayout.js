import styles from './index.less';

const PersonalLayout = (props) => {
  const { children } = props;

  return (
    <div id={styles['personal-container']}>
      <main>{children}</main>
    </div>
  );
};

export default PersonalLayout;
