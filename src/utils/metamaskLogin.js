import storage from '@/utils/storage';
import { fetchUserNonce, fetchUserVerify } from '@/services/login';
import { SiweMessage } from 'siwe';
import { message } from 'antd';
import { getAddress } from 'ethers/lib/utils';

const expires = 60 * 60 * 10 * 1000;

export async function handleIdentityChange({
  isLessee,
  setInitialState,
  initialState,
  handleCancel,
  setLoading,
  signMessageAsync,
  disconnect,
}) {
  const sessionType = storage.get('SESSION_TYPE');

  if (sessionType === 'google') {
    if (!window.ethereum) {
      message.error('MetaMask no está disponible');
      return;
    }

    setLoading?.(true);
    message.loading({
      content: 'Conectando con MetaMask...',
      key: 'login',
      duration: 0,
    });

    try {
      // Solicitar cuentas a MetaMask
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = getAddress(accounts[0]);

      // Obtener chainId
      const chainIdHex = await window.ethereum.request({
        method: 'eth_chainId',
      });
      const chainId = parseInt(chainIdHex, 16);

      const { nonce } = await fetchUserNonce();

      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address: account,
        statement: 'Sign in Janction with your wallet.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
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
      storage.set({
        name: 'SESSION_TYPE',
        value: 'wallet',
        expires,
      });
      message.success({ content: 'Inicio de sesión exitoso', key: 'login' });

      // Cambiar identidad
      storage.set({ name: 'isLessee', value: !isLessee });
      setInitialState({
        ...initialState,
        isLessee: !isLessee,
      });
      handleCancel();
      window.location.reload();
    } catch (error) {
      if (disconnect) {
        disconnect();
      }

      console.error('Error en login con MetaMask:', error);
      message.error({
        content: 'Falló el inicio de sesión con MetaMask',
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
      isLessee: !isLessee,
    });
    handleCancel();
  }
}
