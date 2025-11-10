import reward_banner from '@/assets/images/genesis/reward_banner.png';
import reward_title from '@/assets/images/genesis/reward_title.png';
import { fetchNTFClaimJasmy, fetchJctAirdrop } from '@/services/genesis';
import { renderBackgroudImg } from '@/utils/lang';
import { useEffect, useState } from 'react';
import { history, useIntl } from 'umi';
import { toFixed } from '../../lang';
import styles from './index.less';
import AirdropModal from './AirdropModal';
import { Button, Modal } from 'antd';

const ContributorReward = (props) => {
  const { nft } = props;
  const [rewardShow, setRewardShow] = useState(0);
  const [airdropModalOpen, setAirdropModalOpen] = useState(false);
  const [airdropData, setAirdropData] = useState(null);
  const [airdropNoticeOpen, setAirdropNoticeOpen] = useState(false);
  const intl = useIntl();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await fetchNTFClaimJasmy();
      setRewardShow(res.claim_available_show);
    } catch (error) {
      console.log('『error』', error);
    }
  };

  // 获取空投数据
  const getAirdropData = async () => {
    try {
      const res = await fetchJctAirdrop();
      setAirdropData(res);
      return res;
    } catch (error) {
      console.log('『error』', error);
      return null;
    }
  };

  // 打开弹窗时获取空投数据
  const handleOpenModal = () => {
    setAirdropNoticeOpen(true);
  };

  const handleProceedClaim = async () => {
    await getAirdropData();
    setAirdropNoticeOpen(false);
    setAirdropModalOpen(true);
  };

  return (
    <>
      <div
        className={[styles['contributor-reward']].join(' ')}
        style={renderBackgroudImg(reward_banner)}
      >
        <img src={reward_title} className={styles['title']}></img>
        <div className={styles['receive']}>
          <div className={styles['value']}>
            <i className={styles['icon']}></i>
            <span>{toFixed(rewardShow)}</span>
          </div>
          <div
            className={styles['btn']}
            onClick={() => {
              history.push('/genesis/rewards', { nft });
            }}
          >
            {intl.formatMessage({ id: 'receive.award' })}
          </div>
          <div
            className={`${styles['btn']} ${styles['btn-airdrop']}`}
            onClick={handleOpenModal}
          >
            Claim Your Airdrop
          </div>
        </div>
      </div>
      <AirdropModal
        open={airdropModalOpen}
        onClose={() => setAirdropModalOpen(false)}
        airdropData={airdropData}
      />
      <Modal
        className={styles['airdrop-notice-modal']}
        open={airdropNoticeOpen}
        onCancel={() => setAirdropNoticeOpen(false)}
        centered
        footer={[
          <Button key="cancel" onClick={() => setAirdropNoticeOpen(false)}>
            Got it
          </Button>,
          <Button key="claim" type="primary" onClick={handleProceedClaim}>
            Continue to Claim
          </Button>,
        ]}
        width={760}
        title="Janction Node Airdrop"
      >
        <div className={styles['notice-timeline']}>
          <h3>Snapshot &amp; Claim Timeline</h3>
          <div className={styles['timeline-grid']}>
            <div className={styles['timeline-item']}>
              <span className={styles['timeline-label']}>🕛 Snapshot Time</span>
              <span className={styles['timeline-date']}>
                November 8, 2025 — 16:00 UTC
              </span>
            </div>
            <div className={styles['timeline-item']}>
              <span className={styles['timeline-label']}>🪂 Claim Opens</span>
              <span className={styles['timeline-date']}>
                November 10, 2025 — 11:00 UTC
              </span>
            </div>
            <div className={styles['timeline-item']}>
              <span className={styles['timeline-label']}>
                ⏰ Claim Deadline
              </span>
              <span className={styles['timeline-date']}>
                November 17, 2025 — 11:00 UTC
              </span>
            </div>
          </div>
        </div>
        <div className={styles['notice-section']}>
          <p className={styles['notice-highlight']}>
            Total allocation (node cohort): 3% = 1.5B JCT
          </p>
          <p>
            To align utility with mainnet readiness, 50% of your current points
            convert to JCT now, while the other 50% remain as points and are
            expected to convert into veJCT in ~6 months (a non-transferable
            participation/governance credential), subject to governance and
            technical readiness.
          </p>
        </div>
        <div className={styles['notice-section']}>
          <h3>Claim Ratio &amp; Operations Fee</h3>
          <ul>
            <li>Claim now: JCT equivalent to 50% of your points (one-time).</li>
            <li>
              Operations fee: 15% of the JCT you claim is auto-routed to the
              official operations address (publicly viewable).
            </li>
            <li>
              Remainder: 50% of points stay as points (not burned) and are
              expected to convert to veJCT in ~6 months to enable
              governance/participation rights and node-priority features.
            </li>
          </ul>
        </div>
        <div className={styles['notice-section']}>
          <h3>Calculation Example</h3>
          <p>Your points: 10,000</p>
          <p>
            JCT claimable: 50% × 10,000 → X JCT (per posted conversion rate)
          </p>
          <p>Net received: X × (1 – 15%) = 0.85X JCT</p>
          <p>Points retained: 5,000 → veJCT (~6 months)</p>
        </div>
        <div className={styles['notice-section']}>
          <h3>Why This Design?</h3>
          <ul>
            <li>
              <strong>Mainnet alignment (~6 months):</strong> Claim timing
              matches mainnet deployment, parameter finalization, audits, and
              production readiness. veJCT becomes fully useful once GPU pool
              routing, settlement module, and governance contracts are live.
            </li>
            <li>
              <strong>Path to Validators/Operators:</strong> Early node
              contributors form the initial validator/operator candidate set for
              the GPU Pool / Janction chain (consensus/security, SLA
              enforcement, metering verification). Points → veJCT maps real
              contribution to qualification/weighting (e.g., minimum lock,
              uptime, performance).
            </li>
            <li>
              <strong>Tech × Governance closure:</strong> GPU pool & settlement
              performance validation (incl. technical stablecoin→JCT conversion
              at settlement), on-chain reputation/SLA & dispute flows, veJCT
              proposal→vote→activation loop (productized & audited),
              multi-region supply + developer/model-provider programs.
            </li>
            <li>
              <strong>Operational stability (15% fee):</strong> Funds
              governance/security audits, routing/liquidity upkeep, anti-abuse &
              risk controls, node tooling/ops as a functional budget. Address is
              public; summaries provided periodically.
            </li>
            <li>
              <strong>Token utility fit:</strong> veJCT (governance/priority) +
              JCT (settlement/functional credits) create a practical loop
              between compute usage and participation—capability first,
              governance second.
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default ContributorReward;
