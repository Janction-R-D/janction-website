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
import { WalletOutlined } from '@ant-design/icons';
import { expires } from '@/utils/lang';

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
        const dataStorage = {
          signature: sig,
          message: msg,
          address: address,
        };
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
        storage.set({
          name: 'SESSION_TYPE',
          value: 'wallet',
          expires,
        });

        onRedirect(address, dataStorage);
      };

      const signAndLogin = async () => {
        try {
          const { nonce } = (await fetchUserNonce()) || {};
          const expirationTime = new Date(Date.now() + expires).toISOString();

          const siweMessage = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in Janction with your wallet.',
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce,
            expirationTime,
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

  const onRedirect = async (address, dataStorage) => {
    const { is_old_user } = (await fetchUserConfig()) || {};
    const params = new URLSearchParams(location.search);
    const redirectUri = params.get('redirect_uri');
    const isElectron = redirectUri?.startsWith('janctionapp://');
    if (isElectron && redirectUri) {
      const params = new URLSearchParams({
        signature: dataStorage?.signature ?? '',
        message: dataStorage?.message ?? '',
        address: dataStorage?.address ?? '',
      });

      window.location.href = `${redirectUri}?${params.toString()}`;
      return;
    }
    if (!is_old_user) {
      return window.location.replace(`/genesis/rol`, { type: 'wallet' });
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
      <WalletOutlined />
    </a>
  );
};

export default RainbowConnect;
