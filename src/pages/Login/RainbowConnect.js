import React, { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletOutlined } from '@ant-design/icons';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import storage from '@/utils/storage';
import { fetchInviteAccept, fetchUserConfig } from '@/services/genesis';
import { fetchUserNonce, fetchUserVerify } from '@/services/login';
import { switchNetworkJasmy } from '@/utils/contracts';
import { ethers } from 'ethers';
import { message } from 'antd';
import { useLocation, history } from 'umi';
import { expires } from '@/utils/lang';
import styles from './index.less'; // tu archivo de estilos

const RainbowConnect = ({ setLoading }) => {
  const location = useLocation();
  const { inviterCode } = location.query || {};
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const [loadingLogin, setLoadingLogin] = useState(false);

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
      try {
        await fetchInviteAccept({
          receive_address: address,
          code: inviterCode,
        });
      } catch (err) {
        console.log('『err』', err);
      }
      return window.location.replace(
        `/genesis/deployNodes?inviterCode=${inviterCode}&root='lessor'`,
      );
    }
    window.location.replace(from);
  };

  const loginWithSIWE = async () => {
    if (!address) return;
    setLoadingLogin(true);
    setLoading?.(true);
    message.loading({ content: 'Signing in...', key: 'login', duration: 0 });

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

      const userAccount = { address, chainId: activeChainId };

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

      const messageToSign = siweMessage.prepareMessage();
      const signature = await signMessageAsync({ message: messageToSign });

      const resVerify = await fetchUserVerify({
        message: messageToSign,
        signature,
      });
      if (resVerify?.message !== 'success')
        throw new Error('Signature verification failed');

      const msgEncoded = btoa(messageToSign);
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
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        if (!mounted) {
          return null;
        }

        if (!account || !chain) {
          return (
            <a
              className={styles['login-btn']}
              onClick={() => {
                openConnectModal();
              }}
            >
              <WalletOutlined />
            </a>
          );
        }

        // Wallet conectada y red OK
        return (
          <a
            className={styles['login-btn']}
            onClick={() => {
              openAccountModal();
            }}
            title={account.address}
          >
            <WalletOutlined /> {account.address.slice(0, 6)}...
            {account.address.slice(-4)}
          </a>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default RainbowConnect;
