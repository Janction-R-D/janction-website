import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useModel, history } from 'umi';
import { SiweMessage } from 'siwe';
import styles from './index.less';
import { useAccountEffect, useSignMessage } from 'wagmi';
import storage from '@/utils/storage';
import { fetchNonce, login } from '@/services/personal';
import { useState } from 'react';

const Login = (props) => {
  const { openConnectModal } = useConnectModal();
  const { data, signMessageAsync } = useSignMessage();
  const [token, setToken] = useState("");
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

      const signAndLogin = async () => {
        const nonce = await fetchNonce();
        console.log("nonce:", nonce);

        const siweMessage = new SiweMessage({
          domain: 'janction.com',
          address,
          statement: 'Sign in Janction with your wallet.',
          uri: 'https://janction.com',
          version: '1',
          chainId,
          nonce,
        });

        const message = siweMessage.prepareMessage();

        await signMessageAsync({
          message,
        }, {
          onSuccess: async (data) => {
            const param = {
              message,
              signature: data,
            };
    
            console.log({param})
    
            const token = await login(param);
            setToken(token);
            console.log("token:", token);
          }
        });
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
