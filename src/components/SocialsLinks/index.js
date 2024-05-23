import styles from './index.less';

const SocialsLinks = (props) => {
  return (
    <div className={styles['socials-links']}>
      <div className={styles['x']}></div>
      <div className={styles['discord']}></div>
      <div className={styles['github']}></div>
    </div>
  );
};

export default SocialsLinks;
