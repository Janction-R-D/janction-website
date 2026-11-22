import { Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { ethers } from 'ethers';
import numeral from 'numeral';
import styles from './index.less';
import airdropHero from '@/assets/images/genesis/jct_airdrop_hero.png';
import { fetchJctSign } from '@/services/genesis';
import { useEthersSigner } from '@/hooks/useEthersSigner';
import contract from '@/utils/contracts';
import { getJctAirdropErrorMessage } from './jctAirdropError';
import { useIntl } from 'umi';

const DEFAULT_TAX_RATE = 1500;

const formatAmount = (value) => {
  const num = Number(value);
  if (isNaN(num)) return '0';
  return numeral(num).format('0,0.[00]');
};

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="1.5"
      y="2.75"
      width="13"
      height="11.25"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M1.5 6.25H14.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M5 1.5V4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M11 1.5V4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="4.75" cy="9" r="0.7" fill="currentColor" />
    <circle cx="7.25" cy="9" r="0.7" fill="currentColor" />
    <circle cx="9.75" cy="9" r="0.7" fill="currentColor" />
    <circle cx="4.75" cy="11.5" r="0.7" fill="currentColor" />
    <circle cx="7.25" cy="11.5" r="0.7" fill="currentColor" />
    <circle cx="9.75" cy="11.5" r="0.7" fill="currentColor" />
  </svg>
);

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
      width={420}
      className={styles['airdrop-modal']}
      destroyOnClose
    >
      <div className={styles['airdrop-content']}>
        <button
          type="button"
          className={styles['close-btn']}
          onClick={onClose}
          aria-label="Close"
        >
          <i className="iconfont icon-close" />
        </button>

        <div className={styles['airdrop-header']}>
          <h2 className={styles['airdrop-title']}>
            {intl.formatMessage({ id: 'airdrop.claim.title' })}
          </h2>
          <img
            src={airdropHero}
            alt="airdrop"
            className={styles['airdrop-header-img']}
          />
          <p className={styles['airdrop-congrats']}>
            {intl.formatMessage({ id: 'airdrop.claim.congratulations' })}
          </p>
        </div>

        <div className={styles['claim-period-card']}>
          <div className={styles['claim-period-label']}>
            <CalendarIcon />
            <span>{intl.formatMessage({ id: 'airdrop.claim.period' })}</span>
          </div>
          <div className={styles['claim-period-date']}>
            {intl.formatMessage({ id: 'airdrop.claim.periodDate' })}
          </div>
          <div className={styles['claim-period-hint']}>
            {intl.formatMessage({ id: 'airdrop.claim.periodHint' })}
          </div>
        </div>

        <div className={styles['airdrop-info-row']}>
          <span className={styles['info-label']}>
            {intl.formatMessage({ id: 'airdrop.claim.total' })}
          </span>
          <span className={styles['info-value']}>
            {formatAmount(fromAmount)} JCT
          </span>
        </div>

        <div
          className={`${styles['airdrop-info-row']} ${styles['claimable-row']}`}
        >
          <span className={styles['info-label']}>
            {intl.formatMessage({ id: 'airdrop.claim.claimable' })}
          </span>
          <div className={styles['claimable-right']}>
            <span className={styles['claimable-value']}>
              {formatAmount(toAmount)} JCT
            </span>
            <span className={styles['fee-text']}>
              {feePercent > 0
                ? intl.formatMessage(
                    { id: 'airdrop.claim.fee' },
                    { percent: feePercent },
                  )
                : intl.formatMessage({ id: 'airdrop.claim.noFee' })}
            </span>
          </div>
        </div>

        <p className={styles['airdrop-notice']}>
          {intl.formatMessage({ id: 'airdrop.claim.notice' })}
        </p>

        <button
          type="button"
          className={`${styles['confirm-button']} ${
            loading ? styles['confirm-button-loading'] : ''
          }`}
          onClick={handleConfirm}
          disabled={loading}
        >
          <span>
            {loading
              ? intl.formatMessage({ id: 'airdrop.claim.signing' })
              : intl.formatMessage({ id: 'airdrop.claim.button' })}
          </span>
        </button>
      </div>
    </Modal>
  );
};

export default JctAirdropModal;
