import React, { useState } from 'react';
import { Space } from 'antd';
import styles from '../index.less';
import DeleteModal from './DeleteModal';
import is from '@/utils/is';

export default function OperationModal({ record }) {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  return (
    <Space
      size="middle"
      style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
      {record.deployed == false && (
        <div className={styles['deploy-section']}>
          <i className="iconfont icon-add  "></i>
          <p>Deploy nodes</p>
        </div>
      )}
      <div
        className={styles['delete-section']}
        onClick={() => setIsDeleteModal(true)}
      >
        <p>Delete</p>
        <i className="iconfont icon-delete icon-red"></i>
      </div>
      <DeleteModal
        setIsDeleteModal={setIsDeleteModal}
        isDeleteModal={isDeleteModal}
      />
    </Space>
  );
}
