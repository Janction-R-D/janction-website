import { Modal, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import styles from './index.less';
import airdropBg from '@/assets/images/airdrop/airdrop_bg.png';
import airdropArrow from '@/assets/images/airdrop/airdrop_arrow.png';
import airdropDown from '@/assets/images/airdrop/airdrop_down.png';
import { fetchJctSign, fetchJctAirdropSet } from '@/services/genesis';
import { useEthersSigner } from '@/hooks/useEthersSigner';
import contract from '@/utils/contracts';
import { useIntl } from 'umi';

const AirdropModal = ({
  open,
  onClose,
  airdropData = { airdrop: 0, total_points: 0 },
}) => {
  const [fromAmount, setFromAmount] = useState('0.00');
  const [toAmount, setToAmount] = useState('0.00');
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const chainId = useChainId();
  const signer = useEthersSigner(chainId);
  const intl = useIntl();

  const addTokenToWallet = async () => {
    if (typeof window === 'undefined' || !window?.ethereum) return;

    const tokenConfig = {
      type: 'ERC20',
      options: {
        address: '0xfd57b4ddbf88a4e07ff4e34c487b99af2fe82a05', // TODO: 填写代币合约地址
        symbol: 'JCT',
        decimals: 18,
        image: 'https://gpx.link/public/Logo.png',
      },
    };

    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: tokenConfig,
      });
    } catch (error) {
      console.log('Add token to wallet failed:', error);
    }
  };

  useEffect(() => {
    if (open && airdropData) {
      const airdropValue = airdropData.total_points || 0;
      const airdropValueTo = airdropData.airdrop || 0;
      setFromAmount(airdropValue);
      setToAmount(airdropValueTo);
    }
  }, [open, airdropData]);

  const handleConfirm = async () => {
    if (!signer || !address) {
      message.error(intl.formatMessage({ id: 'airdrop.connectWallet' }));

      return;
    }

    // 验证输入
    const jctAmount = parseFloat(toAmount);
    if (isNaN(jctAmount) || jctAmount <= 0) {
      message.error(intl.formatMessage({ id: 'airdrop.noAmount' }));
      return;
    }

    setLoading(true);
    try {
      // 调用签名接口
      const result = await fetchJctSign({ jct: jctAmount });

      const signPayload = result?.data ?? result;
      const signature = signPayload?.signature;
      const messagePayload = signPayload?.message || {
        wallet: signPayload?.wallet ?? signPayload?.address,
        timestamp: signPayload?.timestamp,
        amount:
          signPayload?.amount ?? signPayload?.jctAmount ?? signPayload?.jct,
        endTime: signPayload?.end_timestamp,
      };

      if (!signature || !messagePayload) {
        throw new Error(intl.formatMessage({ id: 'airdrop.retry' }));
      }

      const claimMessage = {
        wallet: messagePayload.wallet || address,
        timestamp: messagePayload.timestamp,
        amount: messagePayload.amount,
        endTime: messagePayload.endTime,
      };

      if (
        claimMessage.timestamp === undefined ||
        claimMessage.amount === undefined
      ) {
        throw new Error(intl.formatMessage({ id: 'airdrop.contact' }));
      }

      const tx = await contract.claimAirdrop(signer, claimMessage, signature);

      if (tx) {
        addTokenToWallet();
        fetchJctAirdropSet();
      }

      onClose();
    } catch (error) {
      console.error('error:', error);
      message.error(error?.message);
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
        {/* 关闭按钮 */}
        <div className={styles['close-btn']} onClick={onClose}>
          <i className="iconfont icon-close" />
        </div>

        {/* 顶部图片区域 */}
        <div className={styles['airdrop-header']}>
          <h2 className={styles['airdrop-title']}>Claim Your Airdrop</h2>
          <img
            src={airdropBg}
            alt="airdrop"
            className={styles['airdrop-header-img']}
          />
        </div>

        {/* From  */}
        <div
          className={`${styles['airdrop-input-group']} ${styles['from-input']}`}
        >
          <div className={styles['input-label']}>From</div>
          <div className={styles['input-wrapper']}>
            <div className={styles['input-left']}>
              <span className={styles['currency-label']}>veJCT</span>
            </div>
            <div className={styles['airdrop-input']}>
              <span>{fromAmount}</span>
            </div>
          </div>
        </div>

        {/* 中间按钮 */}
        <div className={styles['airdrop-down-btn']}>
          <img src={airdropDown} alt="down" className={styles['down-icon']} />
        </div>

        {/* To  */}
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
              <span className={styles['fee-text']}>15% fee</span>
            </div>
          </div>
        </div>

        {/* 确认按钮 */}
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

export default AirdropModal;
