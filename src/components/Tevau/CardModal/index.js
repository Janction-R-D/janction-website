/**
 * 信用卡弹窗组件
 * 根据 Figma 设计实现
 */

import React from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './index.less';
import '@/styles/common/button.less';

const CardModal = ({ visible, onCancel, onGetCard, onRegister }) => {
  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    } else {
      history.push('/tevau/register');
    }
  };
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      closable={false}
      maskClosable={true}
      wrapClassName={styles['card-modal-wrap']}
      className={styles['card-modal']}
      centered
      destroyOnClose
    >
      <div className={styles['card-content']}>
        {/* 关闭按钮 */}
        <Button className={styles['close-btn']} type="link" onClick={onCancel}>
          <CloseOutlined style={{ fontSize: '20px' }} />
        </Button>
        {/* 信用卡图片 */}
        <div className={styles['card-image-wrapper']}>
          <img
            src={require('@/assets/images/tevau/tevauModalBg.png')}
            alt="JCT Card"
            className={styles['card-image']}
          />
        </div>

        <div className={styles['card-info']}>
          <h2 className={styles['card-title']}>JCT Card</h2>
          <p className={styles['card-description']}>
            The janction virtual card is an intelligent payment tool for the
            digital age, dedicated to providing secure and efficient solutions
            for your online transactions. In terms of security, it utilizes
            virtual card numbers and dynamic CVV technology to effectively
            isolate your actual banking information
          </p>
          <div className={styles['card-buttons']}>
            <button
              className="tevau-btn"
              onClick={onGetCard}
              style={{ width: '190px', height: '60px' }}
            >
              <span>Get Your Card</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7H13M13 7L7 1M13 7L7 13"
                  stroke="#FF9617"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="rotate(0)"
                />
              </svg>
            </button>
            <button
              className="tevau-btn"
              onClick={handleRegister}
              style={{ width: '190px', height: '60px', padding: '0 35.26px' }}
            >
              <span>Register</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15M1 8H15"
                  stroke="#FF9617"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
