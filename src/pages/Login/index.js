import { fetchInviteAccept } from '@/services/genesis';
import { fetchUserNonce, fetchUserVerify } from '@/services/login';
import storage from '@/utils/storage';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { message } from 'antd';
import { useEffect } from 'react';
import { SiweMessage } from 'siwe';
import { history, useLocation } from 'umi';
import {
  useAccount,
  useAccountEffect,
  useDisconnect,
  useSignMessage,
} from 'wagmi';
import styles from './index.less';

const expires = 60 * 60 * 10 * 1000;
const Login = (props) => {
  const location = useLocation();
  const { inviterCode } = location.query || {};

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();

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

        onRedirect(address);
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
          await disconnect();
          console.log('『err』', err);
        }
      };

      await signAndLogin();
      message.destroy('loading');
    },
  });

  const onRedirect = async (address) => {
    const from = history.location.query?.from || '/genesis/dashboard';
    if (inviterCode) {
      await bindCode(address);
      return window.location.replace(
        `/genesis/deployNodes?inviterCode=${inviterCode}&root='lessor'`,
      );
    }
    window.location.replace(from);
  };
  const bindCode = async (address) => {
    try {
      const data = {
        receive_address: address,
        code: inviterCode,
      };
      await fetchInviteAccept(data);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const onConnect = async () => {
    if (address) {
      await disconnect();
      // Triggered when the user clears local data
      storage.set({ name: 'refresh', value: true });
      window.location.reload();
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
        Sign in
      </a>
    </div>
  );
};

export default Login;
