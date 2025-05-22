import { useState } from 'react';
import { useLocation } from 'umi';
import { message } from 'antd';
import { SiweMessage } from 'siwe';
import { ConnectButton } from 'thirdweb/react';
import { useSignMessage, useAccount } from 'wagmi';
import { client } from '@/components/ThirdClient';
import styles from './index.less';
import { inAppWallet, createWallet } from 'thirdweb/wallets';
import { fetchInviteAccept, fetchUserConfig } from '@/services/genesis';
import { fetchUserNonce, fetchUserVerify } from '@/services/login';
import storage from '@/utils/storage';

const expires = 60 * 60 * 10 * 1000;

export default function ThirdConnectButton(props) {
  const { setLoading } = props;
  const location = useLocation();
  const { inviterCode } = location.query || {};
  const [isNewUser, setIsNewUser] = useState();

  const { signMessageAsync } = useSignMessage();
  const { address, chainId } = useAccount();

  const wallets = [
    inAppWallet({
      auth: {
        options: [
          'google',
          'discord',
          'telegram',
          'farcaster',
          'email',
          'x',
          'passkey',
          'phone',
          'github',
          'coinbase',
          'apple',
        ],
      },
    }),
    createWallet('io.metamask'),
    createWallet('com.coinbase.wallet'),
    createWallet('me.rainbow'),
    createWallet('io.rabby'),
    createWallet('io.zerion.wallet'),
  ];

  const isLoggedIn = async () => {
    return !!storage.get('AUTH_HEADERS');
  };

  const getLoginPayload = async () => {
    const { nonce } = (await fetchUserNonce()) || {};

    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in Janction with your wallet.',
      uri: 'https://janction.ai',
      version: '1',
      chainId,
      nonce,
      issuedAt: new Date().toISOString(),
    });

    const messageToSign = siweMessage.prepareMessage();
    const payload = { siweMessage, sms: messageToSign };
    return payload;
  };

  const doLogin = async ({ payload }) => {
    const { siweMessage, sms } = payload;
    setLoading(true);
    message.info({
      content: 'Signing in, please wait...',
      key: 'loading',
      duration: 0,
    });

    try {
      // Firma con la dirección activa
      const signature = await signMessageAsync({ message: sms });

      const param = {
        message: sms,
        signature,
      };

      await fetchUserVerify(param);

      const msg = btoa(sms);

      storage.set({
        name: 'userAccount',
        value: { address, chainId },
        expires,
      });
      storage.set({
        name: 'AUTH_HEADERS',
        value: { 'x-siwe-sig': signature, 'x-siwe-msg': msg },
        expires,
      });

      await checkIsNew();

      if (isNewUser) {
        return window.location.replace(`/genesis/rol`);
      }

      const from = location.query?.from || '/genesis/dashboard';

      if (inviterCode) {
        await bindCode(address);
        return window.location.replace(
          `/genesis/deployNodes?inviterCode=${inviterCode}&root='lessor'`,
        );
      }

      window.location.replace(from);
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

  const checkIsNew = async () => {
    try {
      const res = await fetchUserConfig();
      const check = res?.isNew_user;
      setIsNewUser(check);
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
