import styles from './index.less';
import SocialsLinks from '@/components/SocialsLinks';

const LoginLayout = (props) => {
  const { children } = props;
  return (
    <div id={styles['login-layout']}>
      <header>
        <a className={styles['logo']} href="/">
          <img
            src={require('@/assets/images/icons/logo_name.png')}
            alt="logo"
            width="116"
            height="24"
          />
        </a>
      </header>
      <div className={styles['return']}>
        <a className="df ai_c gap10" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            ></path>
          </svg>
          <span>Return to janction.io/</span>
        </a>
      </div>
      <main>{children}</main>
      <footer>
        <img
          src={require('@/assets/images/icons/logo.png')}
          alt=""
          width="52"
          height="52"
        />
        <div className="df ai_c">
          <SocialsLinks />
          <a href="/" className="f16">
            ©2024
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LoginLayout;
