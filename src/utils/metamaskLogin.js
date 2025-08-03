import storage from '@/utils/storage';
import { fetchUserNonce, fetchUserVerify } from '@/services/login';
import { SiweMessage } from 'siwe';
import { message } from 'antd';
import { getAddress } from 'ethers/lib/utils';
import { expires } from './lang';

export async function handleIdentityChange({
  signer,
  isLessee,
  setInitialState,
  initialState,
  handleCancel,
  setLoading,
  signMessageAsync,
  disconnect,
  fromCenter = false,
}) {
  const sessionType = storage.get('SESSION_TYPE');

  if (sessionType !== 'wallet') {
    if (!signer.provider) {
      message.error('MetaMask not available');
      return;
    }

    setLoading?.(true);
    message.loading({
      content: 'Connecting with MetaMask...',
      key: 'login',
      duration: 0,
    });

    try {
      // Solicitar cuentas a MetaMask
      const accounts = await signer.provider.request({
        method: 'eth_requestAccounts',
      });
      const account = getAddress(accounts[0]);

      // Obtener chainId
      const chainIdHex = await signer.provider.request({
        method: 'eth_chainId',
      });
      const chainId = parseInt(chainIdHex, 16);

      const { nonce } = await fetchUserNonce();
      const expirationTime = new Date(Date.now() + expires).toISOString();
      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address: account,
        statement: 'Sign in Janction with your wallet.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
        expirationTime,
      });

      const messageToSign = siweMessage.prepareMessage();

      const signature = await signMessageAsync({ message: messageToSign });

      await fetchUserVerify({ message: messageToSign, signature });

      //save in storage
      const msgEncoded = btoa(messageToSign);
      storage.set({
        name: 'userAccount',
        value: { address: account },
        expires,
      });
      storage.set({
        name: 'AUTH_HEADERS',
        value: { 'x-siwe-sig': signature, 'x-siwe-msg': msgEncoded },
        expires,
      });
      //after bind wallet --> session type have to change ?
      storage.set({
        name: 'SESSION_TYPE',
        value: 'wallet',
        expires,
      });

      message.success({ content: 'Login successfull', key: 'login' });

      // Cambiar identidad
      storage.set({ name: 'isLessee', value: !isLessee });
      setInitialState({
        ...initialState,
        isLessee: !isLessee,
        sessionType: 'wallet',
      });
      handleCancel();
      //refresh after login with metamask
      // window.location.reload();
    } catch (error) {
      if (disconnect) {
        disconnect();
      }

      console.error('Login with MetaMask failed:', error);
      message.error({
        content: 'Login with MetaMask failed',
        key: 'login',
      });
      return error;
    } finally {
      setLoading?.(false);
      message.destroy('login');
    }
  } else {
    storage.set({ name: 'isLessee', value: !isLessee });
    setInitialState({
      ...initialState,
      isLessee: fromCenter ? isLessee : !isLessee,
    });
    handleCancel();
  }
}
