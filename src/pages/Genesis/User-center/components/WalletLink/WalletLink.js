import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { Card, Button } from 'antd';
import metamaskImg from '@/assets/images/genesis/metamask.png';
import styles from './index.less';
import { handleIdentityChange } from '@/utils/metamaskLogin';
import { useModel } from 'umi';
import { useState } from 'react';
import { copy } from '@/utils/lang';
import { useChainId } from 'wagmi';
import { useEthersSigner } from '@/hooks/useEthersSigner';

import { useIntl } from 'umi';

export default function WalletLink() {
  const [loading, setLoading] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const signer = useEthersSigner(chainId);
  const intl = useIntl();
  const handleCancel = () => {};
  return (
    <Card className={styles['card']}>
      <section className={styles['card-header']}>
        <h3>
          {intl.formatMessage({
            id: 'profile.wallet',
            defaultMessage: 'Wallet',
          })}
        </h3>
      </section>
      <section className={styles['social-tags']}>
        {isConnected ? (
          <BindedWallet address={address} />
        ) : (
          <NoWallet
            onBind={() =>
              handleIdentityChange({
                signer,
                isLessee: initialState?.isLessee,
                setInitialState,
                initialState,
                handleCancel,
                setLoading,
                signMessageAsync,
                disconnect,
                fromCenter: true,
              })
            }
            loading={loading}
          />
        )}
      </section>
    </Card>
  );
}

function BindedWallet({ address }) {
  const intl = useIntl();
  return (
    <div className={styles['bin-group']}>
      <img src={metamaskImg} className={styles['img']} alt="MetaMask" />
      <div className={styles['unbin-container']}>
        <p className={styles['bin-title']}>MetaMask</p>
        <p className={styles['binded']}>
          <span>
            {intl.formatMessage({
              id: 'profile.address',
              defaultMessage: 'Address:',
            })}{' '}
            {address}
          </span>
          <div className={styles['icon']} onClick={() => copy(address)}>
            <i className="iconfont icon-copy" />
          </div>
        </p>
      </div>
    </div>
  );
}

function NoWallet({ onBind, loading }) {
  const intl = useIntl();

  return (
    <div className={styles['unbin-group']}>
      <div className={styles['unbin-left']}>
        <p className={styles['unbin-title']}>
          {intl.formatMessage({
            id: 'wallet.unboundTitle',
            defaultMessage: 'Unbound wallet address',
          })}
        </p>
        <p className={styles['unbin-desc']}>
          {intl.formatMessage({
            id: 'wallet.unboundDesc',
            defaultMessage:
              'After binding the wallet, you can enable rental permissions, rental nodes, etc.',
          })}
        </p>
      </div>
      <Button
        className={styles['connect-btn']}
        onClick={onBind}
        loading={loading}
      >
        {intl.formatMessage({
          id: 'wallet.bindButton',
          defaultMessage: 'Binding',
        })}
        <div className={styles['icon']}>
          <i className="iconfont icon-next" />
        </div>
      </Button>
    </div>
  );
}
