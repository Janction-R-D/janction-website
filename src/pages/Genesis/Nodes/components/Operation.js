import React, { useState } from 'react';
import { Space } from 'antd';
import ModalDelist from './ModalDelist';
export default function OperationDelis({ record, error }) {
  const [isModalOpenStake, setIsModalOpenStake] = useState(false);

  const showModalStake = () => {
    setIsModalOpenStake(true);
  };
  const handleOkStake = () => {
    setIsModalOpenStake(false);
  };
  const handleCancelStake = () => {
    console.log('dcdcdcdcdc');
    setIsModalOpenStake(false);
  };
  return (
    <Space
      size="middle"
      style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
      <a
        className={`${'operation-action'}  ${
          record.status?.toLowerCase() === 'listed' ? 'recent-status' : ''
        }`}
        onClick={() => {
          //   handleOperation('stop', record?.activity?.resource_id, record?.id)
        }}
      >
        <p>List</p>
      </a>
      <a
        className={`${'operation-action'}  ${
          record.status?.toLowerCase() !== 'listed' ? 'recent-status' : ''
        }`}
      >
        <p onClick={showModalStake}>Delist</p>
        <ModalDelist
          record={record}
          isModalOpen={isModalOpenStake}
          handleOk={handleOkStake}
          handleCancel={handleCancelStake}
        />
      </a>
    </Space>
  );
}
