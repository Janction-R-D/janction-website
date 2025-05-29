import { fetchInviteAccept, fetchUserConfig } from '@/services/genesis';
import { fetchUserNonce, fetchUserVerify } from '@/services/login';
import storage from '@/utils/storage';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { message } from 'antd';
import { useEffect, useState } from 'react';
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
const RainbowConnect = (props) => {
  const { setLoading } = props;
  const location = useLocation();
  const { inviterCode } = location.query || {};
  const [isOldUser, setIsOldUser] = useState();
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
      setLoading(true);
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
          const { nonce } = (await fetchUserNonce()) || {};

          const siweMessage = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in Janction with your wallet.',
            uri: 'https://janction.ai',
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
      setLoading(false);
      message.destroy('loading');
    },
  });

  const onRedirect = async (address) => {
    const { is_old_user } = (await fetchUserConfig()) || {};
    if (!is_old_user) {
      return window.location.replace(`/genesis/rol`);
    }
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
    <a className={styles['login-btn']} onClick={onConnect}>
      Sign in
    </a>
  );
};

export default RainbowConnect;
