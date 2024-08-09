import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { useModel } from 'umi';
import { showValue } from '../../utils/lang';
import styles from './index.less';

const CustomConnectButton = (props) => {
  const { afterClick } = props;
  const [userShow, setUserShow] = useState(false);
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            className={styles['wallet-connect-container']}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={styles['un-connect']}
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={styles['un-connect']}
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <>
                  <div className={styles['wallet-data']}>
                    <div
                      onClick={openChainModal}
                      className={styles['chain-name']}
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                          }}
                          className={styles['icon']}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                      <i className="iconfont icon-down"></i>
                    </div>
                    <div className={styles['balance']}>
                      <span>{showValue(account.balanceFormatted, 2)}</span>
                      <span>{account.balanceSymbol || 'ETH'}</span>
                    </div>
                    <div
                      className={styles['user-info']}
                      onClick={openAccountModal}
                    >
                      <img src={require('@/assets/images/icons/avatar.png')} />
                      <span>{account.displayName}</span>
                      <i className="iconfont icon-down"></i>
                    </div>
                  </div>
                  <div className={styles['android-wallet-data']}>
                    <img
                      src={require('@/assets/images/icons/avatar.png')}
                      className={styles['avatar']}
                      onClick={() => {
                        setUserShow(!userShow);
                        afterClick && afterClick();
                      }}
                    />
                    <div
                      className={styles['wallet-data-pop']}
                      style={{ display: userShow ? 'flex' : 'none' }}
                    >
                      <div className={styles['balance']}>
                        <span>{showValue(account.balanceFormatted, 2)}</span>
                        <span>{account.balanceSymbol || 'ETH'}</span>
                      </div>
                      <div
                        className={styles['user-info']}
                        onClick={openAccountModal}
                      >
                        <img
                          src={require('@/assets/images/icons/avatar.png')}
                        />
                        <span>{account.displayName}</span>
                        <i className="iconfont icon-next"></i>
                      </div>
                      <div
                        className={styles['chain-name']}
                        onClick={openChainModal}
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                            }}
                            className={styles['icon']}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                              />
                            )}
                          </div>
                        )}
                        <span>{chain.name}</span>
                        <i className="iconfont icon-next"></i>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
