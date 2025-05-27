import { useState } from 'react';
import { useLocation } from 'umi';
import { message } from 'antd';
// import {SiweMessage} from 'siwe';
import { ConnectButton } from 'thirdweb/react';
import { createWallet, inAppWallet } from 'thirdweb/wallets';
import { useSignMessage } from 'wagmi';
import { client } from '@/components/ThirdClient';
import styles from './index.less';
import { fetchInviteAccept, fetchUserConfig } from '@/services/genesis';
import { fetchUserNonce, fetchUserVerify } from '@/services/login';
import storage from '@/utils/storage';
import { createSwMessage } from '@/utils/siwe/siwe';
import { signMessage } from 'thirdweb/utils';

const isProduction = process.env.JANCTION_ENV === 'production';
const expires = 60 * 60 * 10 * 1000;

export default function Connect(props) {
  const { setLoading } = props;
  const location = useLocation();
  const { inviterCode } = location.query || {};
  const [isOldUser, setIsOldUser] = useState();

  const { signMessageAsync } = useSignMessage();

  const wallets = [
    inAppWallet({
      auth: {
        options: [
          'google',
          // 'x',
          'apple',
          'discord',
          // 'facebook',
          // 'farcaster',
          'telegram',
          'coinbase',
          'github',
          // 'line',
          'email',
          'phone',
          // 'passkey',
          // 'guest',
        ],
      },
    }),
    createWallet('io.metamask'),
    // createWallet('com.coinbase.wallet'),
    // createWallet('me.rainbow'),
    // createWallet('io.rabby'),
    // createWallet('io.zerion.wallet'),
  ];

  const isLoggedIn = async () => {
    return !!storage.get('AUTH_HEADERS');
  };

  const getLoginPayload = async ({ address, chainId }) => {
    const { nonce } = (await fetchUserNonce()) || {};
    const now = new Date();
    const issuedAt = now.toISOString();
    const chain = isProduction ? 11155111 : 11155420;
    const expirationTime = new Date(now.getTime() + expires).toISOString();
    const payload = {
      domain: window.location.host,
      address,
      statement: 'Sign in Janction with your wallet.',
      uri: 'https://janction.ai',
      version: '1',
      chainId,
      nonce,
    };

    // todo: message
    const swm = createSwMessage({
      domain: 'localhost:8000',
      address: address,
      chainId: 1,
      statement: 'Sign in with Ethereum to the app.',
      uri: window.location.host,
      version: '1',
      nonce: '9f8d3a5e29b34a1f',
      issuedAt: new Date().toISOString(),
    });

    // todo: 签名
    const signature = signMessage({
      message: swm,
    });

    return {
      ...payload,
      sms: message,
      signature: signature,
      issued_at: issuedAt,
      expiration_time: expirationTime,
    };
  };

  const doLogin = async ({ payload, signature }) => {
    const { address, chainId, sms } = payload || {};

    setLoading(true);
    message.info({
      content: 'Signing in, please wait...',
      key: 'loading',
      duration: 0,
    });
    console.log(payload);
    // Signature
    try {
      const signedMessage = await signMessageAsync({ message: sms });
      // console.log('wagmi signature', signedMessage);
      // console.log('thirdweb signature', signature);
      // console.log('is equal : ', signature === signedMessage);
      const param = {
        signature: signedMessage,
        message: sms,
      };
      console.log(param);
      await fetchUserVerify(param);
      const msg = btoa(sms);
      storage.set({
        name: 'userAccount',
        value: { address, chainId },
        expires,
      });
      storage.set({
        name: 'AUTH_HEADERS',
        value: { 'x-siwe-sig': signedMessage, 'x-siwe-msg': msg },
        expires,
      });
      onRedirect(address);
    } catch (err) {
      console.error('Login error:', err);
      message.error('Login failed.');
    } finally {
      setLoading(false);
      message.destroy('loading');
    }
  };

  const doLogout = async () => {
    storage.remove('userAccount');
    storage.remove('AUTH_HEADERS');
    storage.set({ name: 'refresh', value: true });
    window.location.reload();
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
  const checkIsOld = async () => {
    try {
      const res = await fetchUserConfig();
      const data = res?.is_old_user || false;
      setIsOldUser(data);
    } catch (err) {
      console.log(err);
    }
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

  return (
    <>
      {/* {loading && (
        <div className={styles['loader-overlay']}>
          <div className={styles['loader']}>Loading...</div>
        </div>
      )} */}
      <ConnectButton
        client={client}
        connectModal={{ size: 'compact' }}
        connectButton={{
          label: 'Sign in',
          className: styles['login-btn'],
          style: { width: '300px' },
        }}
        wallets={wallets}
        auth={{
          doLogin,
          doLogout,
          getLoginPayload,
          isLoggedIn,
          onLogin: () => message.success('Logged in successfully!'),
          onLogout: () => message.info('Logged out'),
        }}
      />
    </>
  );
}
