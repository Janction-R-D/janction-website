import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useModel, history } from 'umi';
import { SiweMessage } from 'siwe';
import styles from './index.less';
import { useAccountEffect, useSignMessage } from 'wagmi';
import storage from '@/utils/storage';
import { fetchNonce, performLogin } from '@/services/auth';

const expires = 60 * 60 * 24 * 1000;
const Login = (props) => {
  const { openConnectModal } = useConnectModal();
  const { data, signMessageAsync } = useSignMessage();
  const { initialState, setInitialState } = useModel('@@initialState');

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
                history.push(from);
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
