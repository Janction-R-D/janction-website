import React, { useState } from 'react';
import { Space } from 'antd';
import ModalDelist from './ModalDelist';
import { history } from 'umi';
import { getNodeStatusMatch } from './extra';
export default function OperationDelis({ record, error, getList }) {
  const [isModalOpenStake, setIsModalOpenStake] = useState(false);
  const { isRunning, isListed } = getNodeStatusMatch(record);

  const showModalStake = () => {
    if (!isListed) return;
    setIsModalOpenStake(true);
  };
  const handleNavigate = () => {
    if (!isRunning) return;
    history.push('/genesis/mount', {
      node: record,
    });
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
      <a
        className={`${'operation-action'}  ${!isRunning ? 'disabled' : ''}`}
        onClick={handleNavigate}
      >
        <p>List</p>
      </a>
      <a className={`${'operation-action'}  ${!isListed ? 'disabled' : ''}`}>
        <p onClick={showModalStake}>Delist</p>
        <ModalDelist
          record={record}
          isModalOpen={isModalOpenStake}
          handleOk={handleOkStake}
          handleSuccess={getList}
          handleCancel={handleCancelStake}
        />
      </a>
    </Space>
  );
}
