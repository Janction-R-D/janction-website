import styles from './index.less';
import Loader from './Loading';
import { useEffect, useState } from 'react';
import FlippedModal from './Modals/FlippedCard';
import SuccessModal from './Modals/SuccessModal';
import storage from '@/utils/storage';
import { message } from 'antd';
import { history, useLocation, useModel } from 'umi';
import { fetchOauthCallback } from '@/services/login';
import { expires } from '@/utils/lang';
import DesktopConnect from './CnnectElectron';

const origin = location.origin;
const CALLBACK_URL = `${origin}/login`;
const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [fromApp, setFromApp] = useState(false);
  const [mode, setMode] = useState('signup');
  const location = useLocation();
  const { initialState, setInitialState } = useModel('@@initialState');
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const loginFromApp = searchParams.get('redirect_uri');
    const checkIsLoged = storage.get('SESSION_TYPE');
    if (loginFromApp) {
      setFromApp(true);
    }
    if (checkIsLoged && !loginFromApp) history.push('/genesis/dashboard');
    const code = searchParams.get('code');
    const stateEncoded = searchParams.get('state');
    const state = stateEncoded ? decodeURIComponent(stateEncoded) : null;

    if (code && state) {
      logIn({ code, state });
    }
  }, [location.search]);
  const logIn = async (param) => {
    try {
      const receivedTkn = await getToken(param);
      message.success('User logged successfully!');
      setInitialState({
        ...initialState,
        sessionType: receivedTkn.platform,
      });
      setTimeout(() => {
        history.push('/genesis/rol', {
          type: receivedTkn.platform,
        });
      }, 1200);
    } catch (err) {
      console.log(err);
    }
  };
  const getToken = async (params) => {
    try {
      const tkn = await fetchOauthCallback(params);
      const { session, user } = tkn || {};
      storage.set({
        name: 'TOKEN',
        value: session.token,
        expires,
      });
      storage.set({
        name: 'USER_ACCOUNT',
        value: user,
        expires,
      });
      storage.set({
        name: 'SESSION_TYPE',
        value: user.platform,
        expires,
      });
      return user;
    } catch (error) {
      console.log(error);
    }
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

      {fromApp && <DesktopConnect setLoading={setLoading} loading={loading} />}

      {!fromApp && (
        <a className={styles['login-btn']} onClick={() => setOpen(true)}>
          Sign in
        </a>
      )}
      <FlippedModal
        open={open}
        onCancel={onCancel}
        setLoading={setLoading}
        setIsSuccess={setIsSuccess}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        mode={mode}
        setMode={setMode}
        loading={loading}
      />
      <SuccessModal
        visible={isSuccess}
        onClose={() => setIsSuccess(false)}
        onConfirm={onSuccessConfirm}
      />
    </div>
  );
};

export default Login;
