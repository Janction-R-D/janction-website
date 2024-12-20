import { fetchNonce, performLogin } from '@/services/auth';
import storage from '@/utils/storage';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';
import { history } from 'umi';
import {
  useAccount,
  useAccountEffect,
  useDisconnect,
  useSignMessage,
} from 'wagmi';
import styles from './index.less';
import { useEffect, useState } from 'react';
import { fetchUserNonce, fetchUserVerify } from '@/services/login';
import { message } from 'antd';

const expires = 60 * 60 * 10 * 1000;
const Login = (props) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();

  const { disconnect } = useDisconnect();
  const inviterCode = storage.get('inviterCode');

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
    async onConnect({ address, chainId }) {
      message.info({
        content: 'The operation is in progress, please wait...',
        key: 'loading',
        duration: 0,
      });
      const userAccount = {
        address,
        chainId,
      };

      const onSuccess = async (sig, message) => {
        const param = {
          message,
          signature: sig,
        };

        await fetchUserVerify(param);

        const msg = btoa(message);

        storage.set({
          name: 'userAccount',
          value: userAccount,
          expires,
        });
        storage.set({
          name: 'AUTH_HEADERS',
          value: { 'x-siwe-sig': sig, 'x-siwe-msg': msg },
          expires,
        });

        const from = history.location.query?.from || '/genesis/dashboard';
        if (inviterCode) {
          storage.set({ name: 'isLessee', value: false });
          return window.location.replace(
            `/genesis/deployNodes?inviterCode=${inviterCode}`,
          );
        }
        window.location.replace(from);
      };

      const signAndLogin = async () => {
        try {
          const nonce = await fetchUserNonce();

          const siweMessage = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in Janction with your wallet.',
            uri: 'https://janction.io',
            version: '1',
            chainId,
            nonce,
          });

          const message = siweMessage.prepareMessage();

          const signature = await signMessageAsync({
            message,
          });

          onSuccess(signature, message);
        } catch (err) {
          message.warning('Network timeout, please refresh and try again!', 1);
          await disconnect();
          console.log('『err』', err);
        }
      };

      await signAndLogin();
      message.destroy('loading');
    },
  });

  const onConnect = async () => {
    if (address) {
      await disconnect();
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
