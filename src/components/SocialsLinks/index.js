import styles from './index.less';

const SocialsLinks = (props) => {
  const { className } = props;
  return (
    <div className={[styles['socials-links'], className].join(' ')}>
      <a className="hvr-grow" href="https://x.com/JanctionMGT" target="_black">
        <i className="iconfont icon-x"></i>
      </a>
      {/* <a className="hvr-grow" target="_black">
        <i className="iconfont icon-discord"></i>
      </a> */}
      <a className="hvr-grow" href="https://t.me/jasmyofficial" target="_black">
        <i className="iconfont icon-telegram"></i>
      </a>
      <a
        className="hvr-grow"
        href="https://github.com/Janction-R-D"
        target="_black"
      >
        <i className="iconfont icon-github"></i>
      </a>
    </div>
  );
};

export default SocialsLinks;
