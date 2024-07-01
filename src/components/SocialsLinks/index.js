import styles from './index.less';

const SocialsLinks = (props) => {
  const { className } = props;
  return (
    <div className={[styles['socials-links'], className].join(' ')}>
      <a className="hvr-grow" href="https://x.com/JanctionMGT">
        <i className="iconfont icon-x"></i>
      </a>
      <div className="hvr-grow">
        <i className="iconfont icon-discord"></i>
      </div>
      <a className="hvr-grow" href="https://github.com/Janction-R-D">
        <i className="iconfont icon-github"></i>
      </a>
    </div>
  );
};

export default SocialsLinks;
