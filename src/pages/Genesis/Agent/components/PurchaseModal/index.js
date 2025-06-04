import { Modal } from 'antd';
import React from 'react';
import styles from './index.less';
import OrderCard from '../Purchase/OrderCard';
import PurchaseOrder from './PurchaseOrder';

export default function PurchaseModal({ onOpen, isOpen, setIsOpen }) {
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onOk={handleCancel}
      onCancel={handleCancel}
      title={<p className={styles['title']}>Purchase Details</p>}
      closable={false}
      className={styles['backdrop-modal']}
      footer={false}
    >
      <div className={styles['icon']} onClick={handleCancel}>
        <i className="iconfont icon-close " />
      </div>
      <ul className={styles['income__list']}>
        <PurchaseOrder />
      </ul>
    </Modal>
  );
}
