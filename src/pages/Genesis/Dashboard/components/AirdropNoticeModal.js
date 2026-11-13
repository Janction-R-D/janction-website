import { Button, Modal } from 'antd';
import { useIntl } from 'umi';
import styles from './index.less';

const AirdropNoticeModal = ({ open, onCancel, onProceed, isClaimOpen }) => {
  const intl = useIntl();
  return (
    <Modal
      className={styles['airdrop-notice-modal']}
      open={open}
      onCancel={onCancel}
      centered
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {intl.formatMessage({ id: 'airdrop.modal.gotIt' })}
        </Button>,
        <Button
          key="claim"
          type="primary"
          onClick={onProceed}
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
              {intl.formatMessage({ id: 'airdrop.new.timeline.snapshotDate' })}
            </span>
          </div>
          <div className={styles['timeline-item']}>
            <span className={styles['timeline-label']}>
              {intl.formatMessage({ id: 'airdrop.timeline.claimOpens' })}
            </span>
            <span className={styles['timeline-date']}>
              {intl.formatMessage({
                id: 'airdrop.new.timeline.claimOpensDate',
              })}
            </span>
          </div>
          <div className={styles['timeline-item']}>
            <span className={styles['timeline-label']}>
              {intl.formatMessage({ id: 'airdrop.timeline.claimDeadline' })}
            </span>
            <span className={styles['timeline-date']}>
              {intl.formatMessage({
                id: 'airdrop.new.timeline.claimDeadlineDate',
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
            {intl.formatMessage({ id: 'airdrop.design.validators.content' })}
          </li>
          <li>
            <strong>
              {intl.formatMessage({ id: 'airdrop.design.governance.title' })}
            </strong>{' '}
            {intl.formatMessage({ id: 'airdrop.design.governance.content' })}
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
  );
};

export default AirdropNoticeModal;
