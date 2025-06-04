import { Modal } from 'antd';
import React from 'react';
import styles from './index.less';
import { mockIncome } from '../../mock';

export default function IconmeModal({ onOpen, isOpen, setIsOpen }) {
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onOk={handleCancel}
      onCancel={handleCancel}
      title={<p className={styles['title']}>Income</p>}
      closable={false}
      className={styles['backdrop-modal']}
      footer={false}
      //   width={600}
    >
      <div className={styles['icon']} onClick={handleCancel}>
        <i className="iconfont icon-close " />
      </div>
      <ul className={styles['income__list']}>
        {mockIncome.map((item, index) => {
          return (
            <li key={index} className={styles['income__item']}>
              <div className={styles['income__detail']}>
                <span>
                  {item.user} : {item.action}
                </span>
                <span className={styles['income__time']}>{item.datetime}</span>
              </div>
              <span className={styles['income__amount']}>{item.amount}</span>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
