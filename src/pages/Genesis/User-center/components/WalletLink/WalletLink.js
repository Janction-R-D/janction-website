import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { Card, Button } from 'antd';
import metamaskImg from '@/assets/images/genesis/metamask.png';
import styles from './index.less';
import { handleIdentityChange } from '@/utils/metamaskLogin';
import { useModel } from 'umi';
import { useState } from 'react';

export default function WalletLink() {
  const [loading, setLoading] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const handleCancel = () => {};
  return (
    <Card className={styles['card']}>
      <section className={styles['card-header']}>
        <h3>Wallet</h3>
      </section>
      <section className={styles['social-tags']}>
        {isConnected ? (
          <BindedWallet address={address} />
        ) : (
          <NoWallet
            onBind={() =>
              handleIdentityChange({
                isLessee: initialState?.isLessee,
                setInitialState,
                initialState,
                handleCancel,
                setLoading,
                signMessageAsync,
                disconnect,
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
  return (
    <div className={styles['bin-group']}>
      <img src={metamaskImg} className={styles['img']} alt="MetaMask" />
      <div className={styles['unbin-container']}>
        <p className={styles['bin-title']}>MetaMask</p>
        <p className={styles['binded']}>
          Address: {address}
          <div className={styles['icon']}>
            <i className="iconfont icon-copy" />
          </div>
        </p>
      </div>
    </div>
  );
}

function NoWallet({ onBind, loading }) {
  return (
    <div className={styles['unbin-group']}>
      <div className={styles['unbin-left']}>
        <p className={styles['unbin-title']}>Unbound wallet address</p>
        <p className={styles['unbin-desc']}>
          After binding the wallet, you can enable rental permissions, rental
          nodes, etc.
        </p>
      </div>
      <Button
        className={styles['connect-btn']}
        onClick={onBind}
        loading={loading}
      >
        Binding{' '}
        <div className={styles['icon']}>
          <i className="iconfont icon-next" />
        </div>
      </Button>
    </div>
  );
}
