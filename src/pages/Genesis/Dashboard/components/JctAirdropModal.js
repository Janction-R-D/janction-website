import { Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { ethers } from 'ethers';
import styles from './index.less';
import airdropBg from '@/assets/images/airdrop/airdrop_bg.png';
import airdropArrow from '@/assets/images/airdrop/airdrop_arrow.png';
import airdropDown from '@/assets/images/airdrop/airdrop_down.png';
import { fetchJctSign } from '@/services/genesis';
import { useEthersSigner } from '@/hooks/useEthersSigner';
import contract from '@/utils/contracts';
import { getJctAirdropErrorMessage } from './jctAirdropError';
import { useIntl } from 'umi';

const DEFAULT_TAX_RATE = 1500;

const JctAirdropModal = ({
  open,
  onClose,
  onClaimSuccess,
  airdropData = { airdrop: 0, total_points: 0 },
}) => {
  const [fromAmount, setFromAmount] = useState('0.00');
  const [toAmount, setToAmount] = useState('0.00');
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner(chainId);
  const intl = useIntl();

  const taxRate = Number(airdropData?.tax_rate ?? DEFAULT_TAX_RATE);
  const feePercent = taxRate / 100;

  const addTokenToWallet = async (tokenAddress) => {
    if (typeof window === 'undefined' || !window?.ethereum) return;
    if (!tokenAddress) return;

    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        'any',
      );
      const token = new ethers.Contract(
        tokenAddress,
        ['function decimals() view returns (uint8)'],
        provider,
      );
      const decimals = await token.decimals();

      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: 'JCT',
            decimals,
            image: 'https://gpx.link/public/Logo.png',
          },
        },
      });
    } catch (error) {
      console.log('Add token to wallet failed:', error);
    }
  };

  useEffect(() => {
    if (open && airdropData) {
      const gross = Number(airdropData.airdrop || 0);
      const net =
        airdropData.net_amount ??
        airdropData.netAmount ??
        gross * (1 - taxRate / 10000);
      setFromAmount(gross);
      setToAmount(net);
    }
  }, [open, airdropData, taxRate]);

  const handleConfirm = async () => {
    if (!signer || !address) {
      message.error(intl.formatMessage({ id: 'airdrop.connectWallet' }));
      return;
    }

    const jctAmount = parseFloat(fromAmount);
    if (isNaN(jctAmount) || jctAmount <= 0) {
      message.error(intl.formatMessage({ id: 'airdrop.noAmount' }));
      return;
    }

    setLoading(true);
    try {
      const result = await fetchJctSign({ jct: jctAmount });

      const signPayload = result?.data ?? result;
      const signature = signPayload?.signature;
      const msg = signPayload?.message || {};

      if (!signature) {
        throw new Error(intl.formatMessage({ id: 'airdrop.retry' }));
      }

      const claimMessage = {
        chainId: msg.chainId,
        timestamp: msg.timestamp,
        taxRate: msg.taxRate,
        token: msg.token,
        contractAddress: msg.contractAddress,
        wallet: msg.wallet,
        amount: msg.amount,
        key: msg.key,
      };

      if (
        claimMessage.chainId === undefined ||
        claimMessage.timestamp === undefined ||
        claimMessage.amount === undefined ||
        !claimMessage.token ||
        !claimMessage.contractAddress ||
        !claimMessage.key
      ) {
        throw new Error(intl.formatMessage({ id: 'airdrop.contact' }));
      }

      const tx = await contract.claimJctAirdrop(
        signer,
        claimMessage,
        signature,
      );

      if (tx) {
        addTokenToWallet(claimMessage.token);
        onClose();
        onClaimSuccess?.();
      }
    } catch (error) {
      message.error(getJctAirdropErrorMessage(error, intl));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={540}
      className={styles['airdrop-modal']}
      destroyOnClose
    >
      <div className={styles['airdrop-content']}>
        <div className={styles['close-btn']} onClick={onClose}>
          <i className="iconfont icon-close" />
        </div>

        <div className={styles['airdrop-header']}>
          <h2 className={styles['airdrop-title']}>
            {intl.formatMessage({ id: 'airdrop.claimButton' })}
          </h2>
          <img
            src={airdropBg}
            alt="airdrop"
            className={styles['airdrop-header-img']}
          />
        </div>

        {/* From */}
        <div
          className={`${styles['airdrop-input-group']} ${styles['from-input']}`}
        >
          <div className={styles['input-label']}>From</div>
          <div className={styles['input-wrapper']}>
            <div className={styles['input-left']}>
              <span className={styles['currency-label']}>JCT</span>
            </div>
            <div className={styles['airdrop-input']}>
              <span>{fromAmount}</span>
            </div>
          </div>
        </div>

        <div className={styles['airdrop-down-btn']}>
          <img src={airdropDown} alt="down" className={styles['down-icon']} />
        </div>

        {/* To */}
        <div className={styles['airdrop-input-group']}>
          <div className={styles['input-label']}>To</div>
          <div className={styles['input-wrapper']}>
            <div className={styles['input-left']}>
              <span className={styles['currency-label']}>JCT</span>
            </div>
            <div className={styles['input-right-wrapper']}>
              <div className={styles['airdrop-input']}>
                <span>{toAmount}</span>
              </div>
              <span className={styles['fee-text']}>
                {feePercent > 0 ? `${feePercent}% fee` : 'No fee'}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`${styles['confirm-button']} ${
            loading ? styles['confirm-button-loading'] : ''
          }`}
          onClick={handleConfirm}
        >
          <span>{loading ? 'Signing...' : 'Comfirm'}</span>
          {!loading && (
            <img
              src={airdropArrow}
              alt="arrow"
              className={styles['confirm-arrow']}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default JctAirdropModal;
