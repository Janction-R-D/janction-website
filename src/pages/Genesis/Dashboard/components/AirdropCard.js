import airdrop_banner from '@/assets/images/genesis/airdrop_banner.png';
import airdrop_title from '@/assets/images/genesis/aridrop_reward_title.png';
import { renderBackgroudImg } from '@/utils/lang';
import { useState } from 'react';
import { useIntl } from 'umi';
import { toFixed } from '../../lang';
import styles from './index.less';
import JctAirdropModal from './JctAirdropModal';
import AirdropNoticeModal from './AirdropNoticeModal';

/**
 * JCT AriDrop Card
 */
const AirdropCard = ({ airdropData, onClaimSuccess }) => {
  const [airdropModalOpen, setAirdropModalOpen] = useState(false);
  const [airdropNoticeOpen, setAirdropNoticeOpen] = useState(false);
  const intl = useIntl();
  // todo
  const claimOpenTime = new Date('2025-11-10T11:00:00Z');
  const claimDeadline = new Date('2026-12-15T11:00:00Z');
  const now = new Date();
  const isClaimOpen = now >= claimOpenTime && now <= claimDeadline;
  const isClaimUnavailable = airdropData?.is_get === true;

  const handleOpenNotice = () => {
    if (isClaimUnavailable) return;
    setAirdropNoticeOpen(true);
  };

  const handleProceedClaim = () => {
    if (!isClaimOpen || isClaimUnavailable) return;
    setAirdropNoticeOpen(false);
    setAirdropModalOpen(true);
  };

  return (
    <>
      <div
        className={[styles['contributor-reward'], styles['airdrop-card']].join(
          ' ',
        )}
        style={renderBackgroudImg(airdrop_banner)}
      >
        <img
          src={airdrop_title}
          alt={intl.formatMessage({ id: 'airdrop.claimButton' })}
        />
        <div className={styles['receive']}>
          <div className={styles['value']}>
            <i className={[styles['icon'], styles['icon-jct']].join(' ')}></i>
            <span>{toFixed(airdropData?.airdrop)}</span>
          </div>
          <div
            className={`${styles['btn']} ${styles['btn-airdrop']} ${
              isClaimUnavailable ? styles['btn-disabled'] : ''
            }`}
            role="button"
            aria-disabled={isClaimUnavailable}
            tabIndex={isClaimUnavailable ? -1 : 0}
            onClick={handleOpenNotice}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenNotice();
              }
            }}
          >
            {intl.formatMessage({
              id: isClaimUnavailable
                ? 'airdrop.new.claimedButton'
                : 'airdrop.claimButton',
            })}
          </div>
        </div>
      </div>
      <AirdropNoticeModal
        open={airdropNoticeOpen && !isClaimUnavailable}
        onCancel={() => setAirdropNoticeOpen(false)}
        onProceed={handleProceedClaim}
        isClaimOpen={isClaimOpen && !isClaimUnavailable}
      />
      <JctAirdropModal
        open={airdropModalOpen && isClaimOpen && !isClaimUnavailable}
        onClose={() => setAirdropModalOpen(false)}
        onClaimSuccess={onClaimSuccess}
        airdropData={airdropData}
      />
    </>
  );
};

export default AirdropCard;
