import { useEffect, useState } from 'react';
import { WalletOutlined } from '@ant-design/icons';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import storage from '@/utils/storage';
import { fetchInviteAccept, fetchUserConfig } from '@/services/genesis';
import { fetchUserNonce, fetchUserVerify } from '@/services/login';
import { message } from 'antd';
import { useLocation, history } from 'umi';
import { expires } from '@/utils/lang';
import styles from './index.less';

const DesktopConnect = ({
  setLoading,
  openConnectModal,
  openAccountModal,
  mounted,
}) => {
  const location = useLocation();
  const { inviterCode } = location.query || {};
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const [loadingLogin, setLoadingLogin] = useState(false);

  const onRedirect = async (address, dataStorage) => {
    const { is_old_user } = (await fetchUserConfig()) || {};
    const params = new URLSearchParams(location.search);
    const redirectUri = params.get('redirect_uri');
    const isElectron = redirectUri?.startsWith('janctionapp://');

    if (isElectron && redirectUri) {
      const paramsRedirect = new URLSearchParams({
        signature: dataStorage?.signature ?? '',
        message: dataStorage?.message ?? '',
        address: dataStorage?.address ?? '',
      });
      window.location.href = `${redirectUri}?${paramsRedirect.toString()}`;
      return;
    }

    if (!is_old_user) {
      return window.location.replace(`/genesis/rol`, { type: 'wallet' });
    }

    const from = history.location.query?.from || '/genesis/dashboard';

    if (inviterCode) {
      try {
        await fetchInviteAccept({
          receive_address: address,
          code: inviterCode,
        });
      } catch (err) {
        console.error('Invite accept error:', err);
      }
      return window.location.replace(
        `/genesis/deployNodes?inviterCode=${inviterCode}&root='lessor'`,
      );
    }

    window.location.replace(from);
  };

  const loginWithSIWE = async () => {
    if (!address || !chainId) return;

    setLoadingLogin(true);
    setLoading?.(true);
    message.loading({ content: 'Signing in...', key: 'login', duration: 0 });

    try {
      const { nonce } = (await fetchUserNonce()) || {};
      if (!nonce) throw new Error('Nonce is missing');

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

      const messageToSign = siweMessage.prepareMessage();
      const signature = await signMessageAsync({ message: messageToSign });

      const resVerify = await fetchUserVerify({
        message: messageToSign,
        signature,
      });
      if (resVerify?.message !== 'success') {
        throw new Error('Signature verification failed');
      }

      const msgEncoded = btoa(messageToSign);
      const userAccount = { address, chainId };
      const dataStorage = { signature, message: msgEncoded, address };

      storage.set({ name: 'userAccount', value: userAccount, expires });
      storage.set({
        name: 'AUTH_HEADERS',
        value: { 'x-siwe-sig': signature, 'x-siwe-msg': msgEncoded },
        expires,
      });
      storage.set({ name: 'SESSION_TYPE', value: 'wallet', expires });

      await onRedirect(address, dataStorage);
      message.success({ content: 'Login successful!', key: 'login' });
    } catch (error) {
      console.error('Login error:', error);
      message.error({ content: error.message || 'Login failed', key: 'login' });
      await disconnect();
    } finally {
      setLoadingLogin(false);
      setLoading?.(false);
      message.destroy('login');
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      loginWithSIWE();
    }
  }, [isConnected, address]);

  return (
    <a
      className={styles['login-btn']}
      onClick={() => {
        if (address) {
          disconnect();
          storage.set({ name: 'refresh', value: true });
          window.location.reload();
        } else {
          openConnectModal();
        }
      }}
    >
      <WalletOutlined />
      Sign in to the Desktop App
    </a>
  );
};

export default DesktopConnect;
