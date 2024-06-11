import SocialsLinks from '@/components/SocialsLinks';
import styles from './index.less';

const Footer = (props) => {
  return (
    <footer className="animate__animated animate__zoomIn">
      <div className="df jc_sb ai_c">
        <div className="df fd_c">
          <img
            src={require('@/assets/images/icons/jun-icon.png')}
            alt=""
            width="52"
            height="52"
          />
          <img
            src={require('@/assets/images/icons/jun.png')}
            alt=""
            width="122"
            height="17"
            className="mt40 mb40"
          />
        </div>
        <div className={styles['links-container']}>
          <div>
            <div>Developers</div>
            <a>Product</a>
            <a>Ecosystem</a>
            <a>Whitepaper</a>
          </div>
          <div>
            <div>Company</div>
            <a>Home</a>
            <a>About</a>
            <a>Articles</a>
          </div>
          <div>
            <div>Community</div>
            <a>Twitter</a>
            <a>Discord</a>
          </div>
        </div>
      </div>
      <div className={styles['related-container']}>
        <SocialsLinks />
        <a href="/" className="f16">
          ©2024
        </a>
      </div>
    </footer>
  );
};

export default Footer;
