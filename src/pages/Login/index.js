import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useModel, history } from 'umi';
import styles from './index.less';
import { useAccountEffect } from 'wagmi';
import storage from '@/utils/storage';

const Login = (props) => {
  const { openConnectModal } = useConnectModal();
  const { initialState, setInitialState } = useModel('@@initialState');

  useAccountEffect({
    onConnect({ address, chainId }) {
      const userAccount = {
        address,
        chainId,
      };
      setInitialState({
        ...initialState,
        userAccount,
      });
      storage.set({ name: 'userAccount', value: userAccount });
      const from = history.location.query?.from || '/';
      history.push(from);
    },
  });

  return (
    <div className={styles['login-container']}>
      <div className={styles['logo']}>
        <img src={require('@/assets/images/faq/faq.png')} alt="" />
      </div>
      <div className={`df gap10 fd_c ai_c ${styles['slogan']}`}>
        <h2 className="tc fw500 f24">
          One Account
          <br />
          Unlimited Access
        </h2>
        <p>One account for everything Janction</p>
      </div>
      <a className={styles['login-btn']} onClick={openConnectModal}>
        Sign in with Ethereum
      </a>
    </div>
  );
};

export default Login;
