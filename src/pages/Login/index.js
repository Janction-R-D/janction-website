import styles from './index.less';
import Loader from './Loading';
import { useState } from 'react';
import FlippedModal from './Modals/FlippedCard';
import SuccessModal from './Modals/SuccessModal';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState('signup');
  const onCancel = () => {
    setOpen(false);
    setIsFlipped(false);
    setMode('signup');
  };
  const onSuccessConfirm = () => {
    setIsSuccess(false);
    setTimeout(() => {
      setIsFlipped(false);
      setOpen(true);
    }, 500);
  };
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
      <FlippedModal
        open={open}
        onCancel={onCancel}
        setLoading={setLoading}
        setIsSuccess={setIsSuccess}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        mode={mode}
        setMode={setMode}
      />
      <SuccessModal
        visible={isSuccess}
        onClose={() => setIsSuccess(false)}
        onConfirm={onSuccessConfirm}
      />

      {/* <RainbowConnect setLoading={setLoading} /> */}
    </div>
  );
};

export default Login;
