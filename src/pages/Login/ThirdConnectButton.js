import { ConnectButton, useDisconnect } from 'thirdweb/react';
import { client } from '@/components/ThirdClient';
import styles from './index.less';
import { inAppWallet, createWallet } from 'thirdweb/wallets';

export default function ThirdConnectButton() {
  const { disconnect } = useDisconnect();
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

  return (
    <ConnectButton
      client={client}
      connectModal={{ size: 'compact' }}
      connectButton={{
        label: 'Sign in',
        className: styles['login-btn'],
        style: { width: '300px' },
      }}
      wallets={wallets}
      auth={{}}
    />
  );
}
