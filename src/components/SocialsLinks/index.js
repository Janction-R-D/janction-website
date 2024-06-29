import styles from './index.less';

const SocialsLinks = (props) => {
  return (
    <div className={styles['socials-links']}>
      <div className="hvr-grow">
        <i className="iconfont icon-x"></i>
      </div>
      <div className="hvr-grow">
        <i className="iconfont icon-discord"></i>
      </div>
      <div className="hvr-grow">
        <i className="iconfont icon-github"></i>
      </div>
    </div>
  );
};

export default SocialsLinks;
