import Connect from './Connect';
import styles from './index.less';
import Loader from './Loading';
import LoginModal from './LoginModal';
import { Button } from 'antd';
import RainbowConnect from './RainbowConnect';
import { useState } from 'react';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onCancel = () => setOpen(false);
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
      <a className={styles['login-btn']} onClick={() => setOpen(true)}>
        Sign in
      </a>
      <LoginModal open={open} onCancel={onCancel} setLoading={setLoading} />
      {/* <RainbowConnect setLoading={setLoading} /> */}
    </div>
  );
};

export default Login;
