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

  const claimOpenTime = new Date('2025-11-10T11:00:00Z');
  const claimDeadline = new Date('2025-11-20T11:00:00Z');
  const now = new Date();
  const isClaimOpen = now >= claimOpenTime && now <= claimDeadline;

  // 打开弹窗时获取空投数据
  const handleOpenModal = () => {
    setAirdropNoticeOpen(true);
  };

  const handleProceedClaim = async () => {
    if (!isClaimOpen) return;
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
            {intl.formatMessage({ id: 'airdrop.claimButton' })}
          </div>
        </div>
      </div>
      <AirdropModal
        open={airdropModalOpen && isClaimOpen}
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
            {intl.formatMessage({ id: 'airdrop.modal.gotIt' })}
          </Button>,
          <Button
            key="claim"
            type="primary"
            onClick={handleProceedClaim}
            disabled={!isClaimOpen}
          >
            {isClaimOpen
              ? intl.formatMessage({ id: 'airdrop.modal.continueClaim' })
              : intl.formatMessage({ id: 'airdrop.modal.comingSoon' })}
          </Button>,
        ]}
        width={760}
        title={intl.formatMessage({ id: 'airdrop.modal.title' })}
      >
        <div className={styles['notice-timeline']}>
          <h3>{intl.formatMessage({ id: 'airdrop.timeline.title' })}</h3>
          <div className={styles['timeline-grid']}>
            <div className={styles['timeline-item']}>
              <span className={styles['timeline-label']}>
                {intl.formatMessage({ id: 'airdrop.timeline.snapshotTime' })}
              </span>
              <span className={styles['timeline-date']}>
                {intl.formatMessage({ id: 'airdrop.timeline.snapshotDate' })}
              </span>
            </div>
            <div className={styles['timeline-item']}>
              <span className={styles['timeline-label']}>
                {intl.formatMessage({ id: 'airdrop.timeline.claimOpens' })}
              </span>
              <span className={styles['timeline-date']}>
                {intl.formatMessage({ id: 'airdrop.timeline.claimOpensDate' })}
              </span>
            </div>
            <div className={styles['timeline-item']}>
              <span className={styles['timeline-label']}>
                {intl.formatMessage({ id: 'airdrop.timeline.claimDeadline' })}
              </span>
              <span className={styles['timeline-date']}>
                {intl.formatMessage({
                  id: 'airdrop.timeline.claimDeadlineDate',
                })}
              </span>
            </div>
          </div>
        </div>
        <div className={styles['notice-section']}>
          <p className={styles['notice-highlight']}>
            {intl.formatMessage({ id: 'airdrop.allocation.title' })}
          </p>
          <p>{intl.formatMessage({ id: 'airdrop.allocation.description' })}</p>
        </div>
        <div className={styles['notice-section']}>
          <h3>{intl.formatMessage({ id: 'airdrop.ratio.title' })}</h3>
          <ul>
            <li>{intl.formatMessage({ id: 'airdrop.ratio.claimNow' })}</li>
            <li>{intl.formatMessage({ id: 'airdrop.ratio.operationsFee' })}</li>
            <li>{intl.formatMessage({ id: 'airdrop.ratio.remainder' })}</li>
          </ul>
        </div>
        <div className={styles['notice-section']}>
          <h3>{intl.formatMessage({ id: 'airdrop.example.title' })}</h3>
          <p>{intl.formatMessage({ id: 'airdrop.example.points' })}</p>
          <p>{intl.formatMessage({ id: 'airdrop.example.claimable' })}</p>
          <p>{intl.formatMessage({ id: 'airdrop.example.netReceived' })}</p>
          <p>{intl.formatMessage({ id: 'airdrop.example.retained' })}</p>
        </div>
        <div className={styles['notice-section']}>
          <h3>{intl.formatMessage({ id: 'airdrop.design.title' })}</h3>
          <ul>
            <li>
              <strong>
                {intl.formatMessage({ id: 'airdrop.design.mainnet.title' })}
              </strong>{' '}
              {intl.formatMessage({ id: 'airdrop.design.mainnet.content' })}
            </li>
            <li>
              <strong>
                {intl.formatMessage({ id: 'airdrop.design.validators.title' })}
              </strong>{' '}
              {intl.formatMessage({
                id: 'airdrop.design.validators.content',
              })}
            </li>
            <li>
              <strong>
                {intl.formatMessage({
                  id: 'airdrop.design.governance.title',
                })}
              </strong>{' '}
              {intl.formatMessage({
                id: 'airdrop.design.governance.content',
              })}
            </li>
            <li>
              <strong>
                {intl.formatMessage({ id: 'airdrop.design.stability.title' })}
              </strong>{' '}
              {intl.formatMessage({ id: 'airdrop.design.stability.content' })}
            </li>
            <li>
              <strong>
                {intl.formatMessage({ id: 'airdrop.design.utility.title' })}
              </strong>{' '}
              {intl.formatMessage({ id: 'airdrop.design.utility.content' })}
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default ContributorReward;
