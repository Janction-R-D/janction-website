import SocialsLinks from '@/components/SocialsLinks';
import styles from './index.less';

const Footer = (props) => {
  return (
    <footer
      className={`animate__animated animate__zoomIn ${styles['main-footer']}`}
    >
      <div className="df jc_sb ai_c">
        <div className="df fd_c">
          <img
            src={require('@/assets/images/icons/logo.png')}
            alt=""
            width="52"
            height="52"
          />
          <img
            src={require('@/assets/images/icons/jaction.png')}
            alt=""
            width="122"
            height="17"
            className="mt40 mb40"
          />
        </div>
        <div className={styles['links-container']}>
          <div>
            <a className={styles['m-t']}>Developers</a>
            <a>Product</a>
            <a>Ecosystem</a>
            <a href="https://docs.janction.io/" target="_blank">
              Whitepaper
            </a>
          </div>
          <div>
            <a
              href="https://jasmy.co.jp/en.html"
              target="_blank"
              className={styles['m-t']}
            >
              Company
            </a>
            <a href="/">Home</a>
            <a>About</a>
            <a href="https://medium.com/@janctionmgt" target="_blank">
              Articles
            </a>
          </div>
          <div>
            <a
              href="https://jasmy.co.jp/en.html"
              target="_blank"
              className={styles['m-t']}
            >
              Community
            </a>
            <a href="https://x.com/JanctionMGT" target="_blank">
              Twitter
            </a>
            <a>Discord</a>
          </div>
        </div>
      </div>
      <div className={styles['related-container']}>
        <SocialsLinks className={styles['links']} />
        <a href="/" className="f16">
          ©2024
        </a>
      </div>
    </footer>
  );
};

export default Footer;
