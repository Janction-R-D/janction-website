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
import { expires } from '@/utils/lang';
import { switchNetwork, switchNetworkJasmy } from '@/utils/contracts';
import { ethers } from 'ethers';
export function extractSubdomainFromLocation() {
  const parts = location.hostname.split('.');
  console.log(parts);
  console.log(location);
  return parts.length >= 3 ? parts[0] : null;
}
const DesktopConnect = (props) => {
  const { setLoading } = props;
  const location = useLocation();
  const { inviterCode } = location.query || {};
  const [isOldUser, setIsOldUser] = useState();
  const [mounted, setMounted] = useState(false);

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();

  const { disconnect } = useDisconnect();
  useEffect(() => {
    setMounted(true);
    disconnect();
  }, []);

  useEffect(() => {
    const refresh = storage.get('refresh');
    if (refresh) {
      setTimeout(() => {
        openConnectModal && openConnectModal();
        storage.remove(refresh);
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
        try {
          const param = {
            message,
            signature: sig,
          };

          const resVerify = await fetchUserVerify(param);

          if (resVerify?.message !== 'success') {
            throw new Error('Signature verification failed');
          }
          const pathToApp = extractSubdomainFromLocation();
          console.log(pathToApp);
          const msg = btoa(message);
          const dataStorage = {
            signature: sig,
            message: msg,
            address,
            envValue: pathToApp,
          };
          console.log(dataStorage);
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
        } catch (err) {
          console.error('Signature verification error:', err);
          message.error('Failed to verify signature. Please try again.');
          await disconnect();
        }
      };

      const signAndLogin = async () => {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            'any',
          );
          await provider.send('eth_requestAccounts', []);

          try {
            await switchNetworkJasmy(provider);
          } catch (e) {
            console.warn('Failed to switch network', e);
          }

          const networkAfterSwitch = await provider.getNetwork();
          const activeChainId = networkAfterSwitch.chainId;

          const { nonce } = (await fetchUserNonce()) || {};
          if (!nonce) throw new Error('Nonce is missing');

          const expirationTime = new Date(Date.now() + expires).toISOString();
          const siweMessage = new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in Janction with your wallet.',
            uri: window.location.origin,
            version: '1',
            chainId: activeChainId,
            nonce,
            expirationTime,
          });

          const message = siweMessage.prepareMessage();
          const signature = await signMessageAsync({ message: message });

          await onSuccess(signature, message);
        } catch (err) {
          console.error('Login error:', err);
          message.error('Login failed. Please try again.');
          await disconnect();
        } finally {
          setLoading(false);
          message.destroy('loading');
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
        address: dataStorage?.envBalue ?? '',
      });

      window.location.href = `${redirectUri}?${params.toString()}`;
      return;
    }
  };

  const onConnect = async () => {
    // if (!mounted || typeof openConnectModal !== 'function') return;
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

  // const onConnect = async () => {
  //   if (!mounted || typeof openConnectModal !== 'function') return;

  //   if (address) {
  //     await disconnect();
  //     openConnectModal();
  //   } else {
  //     openConnectModal();
  //   }
  // };
  if (!mounted) return null;
  return (
    <a className={styles['login-btn']} onClick={onConnect}>
      Sign in to the Desktop App
    </a>
  );
};

export default DesktopConnect;
