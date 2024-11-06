import { fetchNonce, performLogin } from '@/services/auth';
import storage from '@/utils/storage';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';
import { history, useModel } from 'umi';
import {
  useAccount,
  useAccountEffect,
  useDisconnect,
  useSignMessage,
} from 'wagmi';
import styles from './index.less';
import { useEffect } from 'react';

const expires = 60 * 60 * 10 * 1000;
const Login = (props) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();
  const { initialState, setInitialState } = useModel('@@initialState');

  const { disconnect } = useDisconnect();

  useEffect(() => {
    const refresh = storage.get('refresh');
    if (refresh) {
      setTimeout(() => {
        openConnectModal && openConnectModal();
        storage.remove('refresh');
      }, 1000);
    }
  }, []);

  useAccountEffect({
    onConnect({ address, chainId }) {
      const userAccount = {
        address,
        chainId,
      };

      const signAndLogin = async () => {
        try {
          const nonce = await fetchNonce();

          console.log('nonce getted:', nonce);

          const siweMessage = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in Janction with your wallet.',
            uri: 'https://janction.com',
            version: '1',
            chainId,
            nonce,
          });

          const message = siweMessage.prepareMessage();

          await signMessageAsync(
            {
              message,
            },
            {
              onSuccess: async (data) => {
                const param = {
                  message,
                  signature: data,
                  is_node: false,
                };

                console.log({ param });

                const token = await performLogin(param);
                console.log({ token });
                setInitialState({
                  ...initialState,
                  userAccount,
                });
                storage.set({
                  name: 'userAccount',
                  value: userAccount,
                  expires,
                });
                storage.set({ name: 'token', value: token, expires });

                const from = history.location.query?.from || '/';
                window.location.replace(from);
              },
            },
          );
        } catch (err) {
          console.log('『err』', err);
        }
      };

      signAndLogin();
    },
  });

  const onConnect = async () => {
    console.log('『address』', address);
    if (address) {
      disconnect();
      // Triggered when the user clears local data
      storage.set({ name: 'refresh', value: true });
      location.reload();
      // openConnectModal();
    } else {
      openConnectModal();
    }
  };

  return (
    <div className={styles['login-container']}>
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
      <a className={styles['login-btn']} onClick={onConnect}>
        Sign in with Ethereum
      </a>
    </div>
  );
};

export default Login;
