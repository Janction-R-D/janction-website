import styles from './index.less';
import Loader from './Loading';
import ThirdConnectButton from './ThirdConnectButton';
// import RainbowConnect from './RainbowConnect';
import { useState } from 'react';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles['login-container']}>
      {loading && <Loader />}
      <div className={styles['logo']}>
        <img src={require('@/assets/images/icons/logo.png')} alt="" />
      </div>
      <div className={`df gap10 fd_c ai_c ${styles['slogan']}`}>
        <h2 className="tc fw500 f24">
          One Account
          <br />
          Unlimited Access
        </h2>
        <p>One account for everything Janction</p>
      </div>
      {/* <RainbowConnect setLoading={setLoading} /> */}
      <ThirdConnectButton setLoading={setLoading} />
    </div>
  );
};

export default Login;
