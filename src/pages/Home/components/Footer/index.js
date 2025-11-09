import SocialsLinks from '@/components/SocialsLinks';
import styles from './index.less';

const HomeFooter = (props) => {
  return (
    <footer
      className={`animate__animated animate__zoomIn ${styles['main-footer']}`}
    >
      <div className="df jc_sb ai_c gap18">
        <div className="df fd_c">
          <img
            src={require('@/assets/images/icons/janction-icon.png')}
            alt=""
            className={styles.logo}
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
            <a href="/company" className={styles['m-t']}>
              Company
            </a>
            <a href="/">Home</a>
            <a href="/solution">About</a>
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
            <a href="https://x.com/JANCTION_Global" target="_blank">
              Twitter
            </a>
            <a href=" https://t.me/jasmyofficial" target="_blank">
              Telegram
            </a>
            <a href=" https://gpx.link/" target="_blank">
              GPX
            </a>
          </div>
        </div>
      </div>
      <div className={styles['related-container']}>
        <SocialsLinks className={styles['links']} />
        <a href="/" className="f16">
          ©2025
        </a>
      </div>
    </footer>
  );
};

export default HomeFooter;
