import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useModel, history, useAccess } from 'umi';
import { SiweMessage } from 'siwe';
import styles from './index.less';
import { useAccount, useAccountEffect, useSignMessage } from 'wagmi';
import storage from '@/utils/storage';
import { fetchNonce, performLogin } from '@/services/auth';
import { useEffect, useState } from 'react';

const expires = 60 * 60 * 24 * 1000;
const Login = (props) => {
  const { isLogin } = useAccess();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { address, chainId } = useAccount();
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (address) {
      setButtonText('Sign in with Ethereum');
    } else {
      setButtonText('Connect Wallet');
    }
  }, [address]);

  useEffect(() => {
    if (isLogin) {
      const from = history.location.query?.from || '/';
      history.push(from);
    }
  }, [isLogin]);

  const handleClickButton = () => {
    if (address) {
      signAndLogin({ address, chainId });
    } else {
      openConnectModal();
    }
  };

  const signAndLogin = async (userAccount) => {
    const nonce = await fetchNonce();

    console.log('nonce getted:', nonce);

    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address: userAccount.address,
      statement: 'Sign in Janction with your wallet.',
      uri: 'https://janction.com',
      version: '1',
      chainId: userAccount.chainId,
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
        },
      },
    );
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
      <a className={styles['login-btn']} onClick={handleClickButton}>
        {buttonText}
      </a>
    </div>
  );
};

export default Login;
