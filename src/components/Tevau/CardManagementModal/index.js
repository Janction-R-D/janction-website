/**
 * 卡片管理弹窗组件
 * 职责：展示卡片管理相关信息和管理操作
 */

import React from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import CircleArrowIcon from '@/components/Tevau/CircleArrowIcon';
import styles from './index.less';

const CardManagementModal = ({ visible, onCancel }) => {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      closable={false}
      mask={true}
      maskClosable={true}
      wrapClassName={styles['modal-wrap']}
      className={styles['modal']}
      width={1034}
      centered
      destroyOnClose
    >
      <div className={styles['modal-content']}>
        {/* 关闭按钮 */}
        <Button className={styles['close-btn']} type="link" onClick={onCancel}>
          <CloseOutlined style={{ fontSize: '20px' }} />
        </Button>

        {/* 内容区域 */}
        <div className={styles['content-body']}>
          {/* 左侧：图片 */}
          <div className={styles['left-section']}>
            <div className={styles['image-wrapper']}>
              <img
                src={require('@/assets/images/tevau/jctCard.png')}
                alt="JCT Card"
                className={styles['modal-image']}
              />
              {/* 卡号显示 */}
              <div className={styles['card-number']}>5834 3456 8996 9666</div>
            </div>
          </div>

          {/* 右侧：管理内容 */}
          <div className={styles['right-section']}>
            <h2 className={styles['modal-title']}>Card management</h2>

            <div className={styles['management-content']}>
              {/* Credit Limit 部分 */}
              <div className={styles['credit-limit-section']}>
                <div className={styles['credit-limit-header']}>
                  <span className={styles['credit-limit-label']}>
                    Credit Limit
                  </span>
                  <span className={styles['history-text']}>History &gt;</span>
                </div>
                <div className={styles['credit-limit-info']}>
                  <div className={styles['amount-wrapper']}>
                    <span className={styles['amount']}>2000.00</span>
                    <span className={styles['currency']}>JYP</span>
                  </div>
                  <button className={styles['history-btn']}>History</button>
                </div>
              </div>

              {/* 分隔线 */}
              <div className={styles['divider']}></div>

              {/* 操作列表 */}
              <div className={styles['action-list']}>
                {/* Card Details */}
                <div className={styles['action-item']}>
                  <div className={styles['action-left']}>
                    <img
                      src={require('@/assets/images/tevau/cardDetailIcon.png')}
                      alt="Card Details"
                      className={styles['action-icon']}
                    />
                    <span className={styles['action-text']}>Card Details</span>
                  </div>
                  <div className={styles['action-arrow']}>
                    <RightOutlined
                      style={{ color: '#FFFFFF', fontSize: '10px' }}
                    />
                  </div>
                </div>

                {/* Address Management */}
                <div className={styles['action-item']}>
                  <div className={styles['action-left']}>
                    <img
                      src={require('@/assets/images/tevau/cardAddressIcon.png')}
                      alt="Address Management"
                      className={styles['action-icon']}
                    />
                    <span className={styles['action-text']}>
                      Address Management
                    </span>
                  </div>
                  <div className={styles['action-arrow']}>
                    <RightOutlined
                      style={{ color: '#FFFFFF', fontSize: '10px' }}
                    />
                  </div>
                </div>

                {/* Close Account */}
                <div className={styles['action-item']}>
                  <div className={styles['action-left']}>
                    <img
                      src={require('@/assets/images/tevau/cardDeleteIcon.png')}
                      alt="Close Account"
                      className={styles['action-icon']}
                    />
                    <span className={styles['action-text']}>Close Account</span>
                  </div>
                  <div className={styles['action-arrow']}>
                    <RightOutlined
                      style={{ color: '#FFFFFF', fontSize: '10px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Physical Card Application 按钮 */}
              <Button type="primary" className={styles['physical-card-btn']}>
                <span>Physical Card Application</span>
                <CircleArrowIcon size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardManagementModal;
