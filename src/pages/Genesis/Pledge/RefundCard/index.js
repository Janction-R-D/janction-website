import React, { useState } from 'react';
import styles from './index.less';
import ModalStake from '../InstanceComponents/ModalStake';
import ModalRefound from '../InstanceComponents/ModalRefound';
import { useIntl } from 'umi';

export default function RefundCard({ data }) {
  const intl = useIntl();
  const [isModalOpenRefound, setIsModalOpenRefound] = useState(false);
  const [isModalOpenStake, setIsModalOpenStake] = useState(false);

  const showModalRefound = () => setIsModalOpenRefound(true);
  const handleOkRefound = () => setIsModalOpenRefound(false);
  const handleCancelRefound = () => setIsModalOpenRefound(false);

  const showModalStake = () => setIsModalOpenStake(true);
  const handleOkStake = () => setIsModalOpenStake(false);
  const handleCancelStake = () => setIsModalOpenStake(false);

  const FIELD_LABELS = {
    id: intl.formatMessage({ id: 'refundCard.field.id' }),
    gpu: intl.formatMessage({ id: 'refundCard.field.gpu' }),
    cooling: intl.formatMessage({ id: 'refundCard.field.cooling' }),
    status: intl.formatMessage({ id: 'refundCard.field.status' }),
    withdrawable: intl.formatMessage({ id: 'refundCard.field.withdrawable' }),
    undercarriage: intl.formatMessage({ id: 'refundCard.field.undercarriage' }),
  };

  return (
    <div className={styles.card}>
      <div className={styles.line}>ID-{data.id}</div>

      {Object.entries(FIELD_LABELS).map(([key, label]) => {
        if (key === 'id') return null;

        return (
          <div className={styles.line} key={key}>
            {label} : {data[key] || '-'}
            {key === 'withdrawable' && ' JCT'}
          </div>
        );
      })}

      <div className={styles.footer}>
        <span className={styles.stake} onClick={showModalStake}>
          {intl.formatMessage({ id: 'refundCard.stake' })}
        </span>
        <ModalStake
          isModalOpen={isModalOpenStake}
          handleOk={handleOkStake}
          handleCancel={handleCancelStake}
        />
        <span className={styles.refund} onClick={showModalRefound}>
          {intl.formatMessage({ id: 'refundCard.refund' })}
        </span>
        <ModalRefound
          isModalOpen={isModalOpenRefound}
          handleOk={handleOkRefound}
          handleCancel={handleCancelRefound}
        />
      </div>
    </div>
  );
}
