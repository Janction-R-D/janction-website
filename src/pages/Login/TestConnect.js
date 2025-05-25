import { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { message } from 'antd';
import { SiweMessage } from 'siwe';
import {
  useConnectModal,
  useActiveWallet,
  useActiveAccount,
} from 'thirdweb/react';
import { signMessage } from 'thirdweb/utils';
import { client } from '@/components/ThirdClient';
import styles from './index.less';
import { inAppWallet, createWallet } from 'thirdweb/wallets';
import { fetchInviteAccept, fetchUserConfig } from '@/services/genesis';
import { fetchUserNonce, fetchUserVerify } from '@/services/login';
import storage from '@/utils/storage';

// Intenta importar ethers si está disponible
let ethers;
try {
  ethers = require('ethers');
} catch (e) {
  console.log('ethers no está disponible, usando métodos alternativos');
}

const isProduction = process.env.JANCTION_ENV === 'production';
const expires = 60 * 60 * 10 * 1000;

export default function TestConnect(props) {
  const { setLoading } = props;
  const location = useLocation();
  const { inviterCode } = location.query || {};

  // thirdweb hooks for wallet and connection

  const { connect, isConnecting } = useConnectModal();
  const activeWallet = useActiveWallet();
  const activeAccount = useActiveAccount();

  // Configuración de wallets disponibles
  const walletOptions = {
    wallets: [
      inAppWallet({
        auth: {
          options: [
            'google',
            'apple',
            'discord',
            'telegram',
            'coinbase',
            'github',
            'email',
            'phone',
          ],
        },
      }),
      createWallet('io.metamask'),
    ],
  };

  // Verificar si el usuario está logueado
  const isLoggedIn = async () => {
    return !!storage.get('AUTH_HEADERS');
  };
  // Detectar si es una wallet social
  const isSocialWallet = (wallet) => {
    if (!wallet) return false;

    // Verificar por ID si está disponible
    if (wallet.id) {
      return (
        wallet.id.includes('inAppWallet') ||
        wallet.id.includes('inApp') ||
        wallet.id.includes('google') ||
        wallet.id.includes('email') ||
        wallet.id.includes('phone') ||
        wallet.id.includes('social')
      );
    }

    // Verificar por tipo o nombre si está disponible
    if (wallet.type || wallet.name) {
      const typeOrName = wallet.type || wallet.name;
      return (
        typeOrName.includes('social') ||
        typeOrName.includes('google') ||
        typeOrName.includes('email')
      );
    }

    return false;
  };

  // Manejar el proceso de conexión y firma
  const handleConnect = async () => {
    try {
      setLoading(true);
      message.info({
        content: 'Connecting wallet...',
        key: 'loading',
        duration: 0,
      });

      // Conectar la wallet usando el modal
      const wallet = await connect({
        client,
        ...walletOptions,
      });

      if (!wallet) {
        message.error('Connection failed or cancelled');
        setLoading(false);
        message.destroy('loading');
        return;
      }

      console.log('Wallet conectada:', wallet);

      // Determinar si es una wallet social o EOA
      const isSocial = isSocialWallet(wallet);
      console.log('¿Es wallet social?', isSocial);

      // Obtener la dirección de la wallet
      let address;

      if (wallet.getAccount) {
        const account = wallet.getAccount();
        address = account?.address;
      } else if (activeAccount) {
        address = activeAccount.address;
      } else if (wallet.address) {
        address = wallet.address;
      }

      if (!address) {
        throw new Error('No se pudo obtener la dirección de la wallet');
      }

      console.log('Dirección de la wallet:', address);

      message.info({
        content: 'Signing in, please wait...',
        key: 'loading',
        duration: 0,
      });

      // Obtener nonce del backend
      const { nonce } = (await fetchUserNonce()) || {};
      if (!nonce) {
        throw new Error('Failed to get nonce from server');
      }

      // Crear mensaje SIWE con todos los campos requeridos
      const now = new Date();
      const issuedAt = now.toISOString();
      const chainId = isProduction ? 11155111 : 11155420;
      const expirationTime = new Date(now.getTime() + expires).toISOString();

      const siweMessage = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in Janction with your wallet.',
        uri: 'https://janction.ai',
        version: '1',
        chainId: chainId,
        nonce: nonce,
        issuedAt: issuedAt,
        expirationTime: expirationTime,
      });

      // Preparar el mensaje para firmar
      const messageToSign = siweMessage.prepareMessage();
      console.log('SIWE message to sign:', messageToSign);

      let signature;

      // Usar diferentes enfoques según el tipo de wallet
      if (isSocial) {
        // Para wallets sociales, intentar obtener un token de autenticación
        console.log('Usando flujo de autenticación para wallet social');
        try {
          // Intentar obtener un token de autenticación si está disponible
          console.log(wallet);
          signature = await wallet.signMessage(messageToSign);
          // signature = signMessage({
          //   message: messageToSign,
          //   wallet, // La wallet ya conectada
          // });
        } catch (authError) {
          console.error('Error en autenticación social:', authError);
          throw new Error('No se pudo autenticar con wallet social');
        }
      } else {
        // Para wallets EOA (como Metamask), usar firma estándar
        console.log('Usando flujo de firma estándar para wallet EOA');
        try {
          // 1. Intentar con ethers.js si está disponible
          if (ethers && window.ethereum) {
            console.log('Intentando firmar con ethers.js');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            signature = await signer.signMessage(messageToSign);
          }
        } catch (signError) {
          console.error('Error al firmar mensaje:', signError);
        }
      }

      // Verificar en el backend
      const param = {
        signature: signature,
        message: messageToSign,
      };

      // Aquí deberías adaptar tu backend para manejar tanto firmas como tokens de autenticación
      await fetchUserVerify(param);

      // Guardar en storage
      const msg = btoa(messageToSign);
      storage.set({
        name: 'userAccount',
        value: { address, chainId },
        expires,
      });

      storage.set({
        name: 'AUTH_HEADERS',
        value: {
          'x-siwe-sig': signature,
          'x-siwe-msg': msg,
        },
        expires,
      });

      message.success('Logged in successfully!');

      // Redirigir si es necesario
      onRedirect(address);
    } catch (err) {
      console.error('Login error:', err);
      message.error('Login failed: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
      message.destroy('loading');
    }
  };

  const doLogout = async () => {
    try {
      // Desconectar la wallet si está disponible
      if (activeWallet) {
        await activeWallet.disconnect();
      }

      // Limpiar el storage
      storage.remove('userAccount');
      storage.remove('AUTH_HEADERS');
      storage.set({ name: 'refresh', value: true });

      message.info('Logged out');
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
      message.error('Logout failed');
    }
  };

  const onRedirect = async (address) => {
    const { is_old_user } = (await fetchUserConfig()) || {};
    if (!is_old_user) {
      return window.location.replace(`/genesis/rol`);
    }
    const from = history.location?.query?.from || '/genesis/dashboard';
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

  // Verificar si el usuario ya está conectado
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isUserLoggedIn = await isLoggedIn();
      if (isUserLoggedIn && activeAccount) {
        console.log(
          'User already logged in with address:',
          activeAccount.address,
        );
      }
    };

    checkLoginStatus();
  }, [activeAccount]);

  return (
    <>
      {activeWallet ? (
        // Si el usuario está conectado, mostrar botón de logout
        <button
          onClick={doLogout}
          className={styles['login-btn']}
          style={{ width: '300px', cursor: 'pointer' }}
        >
          Sign out
        </button>
      ) : (
        // Si el usuario no está conectado, mostrar botón de login
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={styles['login-btn']}
          style={{ width: '300px', cursor: 'pointer' }}
        >
          {isConnecting ? 'Connecting...' : 'Sign in'}
        </button>
      )}
    </>
  );
}
