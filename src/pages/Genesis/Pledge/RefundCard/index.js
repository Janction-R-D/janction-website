import React, { useState } from 'react';
import styles from './index.less';
import ModalStake from '../InstanceComponents/ModalStake';
import ModalRefound from '../InstanceComponents/ModalRefound';

const FIELD_LABELS = {
  id: 'ID',
  gpu: 'CHP / GPUS',
  cooling: 'Stake in cooling',
  status: 'status',
  withdrawable: 'Withdrawable',
  undercarriage: 'Will undercarriage',
};

export default function RefundCard({ data }) {
  const [isModalOpenRefound, setIsModalOpenRefound] = useState(false);
  const [isModalOpenStake, setIsModalOpenStake] = useState(false);
  const showModalRefound = () => {
    setIsModalOpenRefound(true);
  };
  const handleOkRefound = () => {
    setIsModalOpenRefound(false);
  };
  const handleCancelRefound = () => {
    setIsModalOpenRefound(false);
  };

  const showModalStake = () => {
    setIsModalOpenStake(true);
  };
  const handleOkStake = () => {
    setIsModalOpenStake(false);
  };
  const handleCancelStake = () => {
    setIsModalOpenStake(false);
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
          Stake
        </span>
        <ModalStake
          isModalOpen={isModalOpenStake}
          handleOk={handleOkStake}
          handleCancel={handleCancelStake}
        />
        <span className={styles.refund} onClick={showModalRefound}>
          Refund
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
