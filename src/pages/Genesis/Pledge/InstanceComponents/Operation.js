import React, { useState } from 'react';
import { Space } from 'antd';
import ModalRefound from './ModalRefound';
import ModalStake from './ModalStake';
export default function Operation({ record }) {
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
    <Space
      size="middle"
      style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
      <a onClick={showModalStake}>
        <p>Stake</p>
      </a>
      <ModalStake
        isModalOpen={isModalOpenStake}
        handleOk={handleOkStake}
        handleCancel={handleCancelStake}
      />
      <a onClick={showModalRefound}>
        <p>Refund</p>
      </a>
      <ModalRefound
        isModalOpen={isModalOpenRefound}
        handleOk={handleOkRefound}
        handleCancel={handleCancelRefound}
      />
    </Space>
  );
}
