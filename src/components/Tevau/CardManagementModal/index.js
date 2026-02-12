/**
 * 卡片管理弹窗组件
 * 职责：展示卡片管理相关信息和管理操作
 */

import React, { useEffect, useState } from 'react';
import { Modal, Button, Spin } from 'antd';
import {
  CloseOutlined,
  RightOutlined,
  InboxOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import CircleArrowIcon from '@/components/Tevau/CircleArrowIcon';
import ArrowIcon from '@/components/Tevau/ArrowIcon';
import CardDetailModal from '@/components/Tevau/CardDetailModal';
import AddressManagementModal from '@/components/Tevau/AddressManagementModal';
import styles from './index.less';

const CardManagementModal = ({ visible, onCancel }) => {
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [closeConfirmVisible, setCloseConfirmVisible] = useState(false);
  const [isCardClosed, setIsCardClosed] = useState(false);

  useEffect(() => {
    if (!visible) {
      setDetailsDrawerVisible(false);
      setAddressModalVisible(false);
      setCloseConfirmVisible(false);
    }
  }, [visible]);

  const handlePhysicalCardApplication = () => {
    if (onCancel) {
      onCancel();
    }
    history.push('/tevau/PhysicalCardApplication');
  };

  const handleOpenDetailsDrawer = () => {
    setDetailsDrawerVisible(true);
  };

  const handleCloseDetailsDrawer = () => {
    setDetailsDrawerVisible(false);
  };

  const handleOpenAddressModal = () => {
    setAddressModalVisible(true);
  };

  const handleCloseAddressModal = () => {
    setAddressModalVisible(false);
  };

  const handleOpenCloseConfirm = () => {
    setCloseConfirmVisible(true);
  };

  const handleCancelCloseAccount = () => {
    setCloseConfirmVisible(false);
  };

  const handleConfirmCloseAccount = () => {
    setIsCardClosed(true);
    setCloseConfirmVisible(false);
  };

  return (
    <>
      <Modal
        open={visible && !detailsDrawerVisible && !addressModalVisible}
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
          <Button
            className={styles['close-btn']}
            type="link"
            onClick={onCancel}
          >
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
                  className={[
                    styles['modal-image'],
                    isCardClosed ? styles['closed-card-image'] : '',
                  ].join(' ')}
                />
                <div
                  className={[
                    styles['card-status-tag'],
                    isCardClosed ? styles['card-status-closed'] : '',
                  ].join(' ')}
                >
                  {isCardClosed ? 'Closed' : 'Active'}
                </div>
                {/* 卡号显示 */}
                <div
                  className={[
                    styles['card-number'],
                    isCardClosed ? styles['closed-card-number'] : '',
                  ].join(' ')}
                >
                  5834 3456 8996 9666
                </div>
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
                  <div
                    className={styles['action-item']}
                    onClick={handleOpenDetailsDrawer}
                  >
                    <div className={styles['action-left']}>
                      <img
                        src={require('@/assets/images/tevau/cardDetailIcon.png')}
                        alt="Card Details"
                        className={styles['action-icon']}
                      />
                      <span className={styles['action-text']}>
                        Card Details
                      </span>
                    </div>
                    <div className={styles['action-arrow']}>
                      <RightOutlined
                        style={{ color: '#FFFFFF', fontSize: '10px' }}
                      />
                    </div>
                  </div>

                  {/* Address Management */}
                  <div
                    className={styles['action-item']}
                    onClick={handleOpenAddressModal}
                  >
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
                  <div
                    className={styles['action-item']}
                    onClick={handleOpenCloseConfirm}
                  >
                    <div className={styles['action-left']}>
                      <img
                        src={require('@/assets/images/tevau/cardDeleteIcon.png')}
                        alt="Close Account"
                        className={styles['action-icon']}
                      />
                      <span className={styles['action-text']}>
                        Close Account
                      </span>
                    </div>
                    <div className={styles['action-arrow']}>
                      <RightOutlined
                        style={{ color: '#FFFFFF', fontSize: '10px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 实体卡制作状态 */}
                <div className={styles['production-status']}>
                  <div className={styles['status-left']}>
                    <InboxOutlined className={styles['status-icon']} />
                    <span className={styles['status-text']}>
                      Your card is being produced.
                    </span>
                  </div>
                  <Spin
                    className={styles['status-refresh']}
                    indicator={<ReloadOutlined spin />}
                  />
                </div>

                {/* Physical Card Application 按钮 */}
                <Button
                  type="primary"
                  className={styles['physical-card-btn']}
                  onClick={handlePhysicalCardApplication}
                >
                  <span>Physical Card Application</span>
                  <CircleArrowIcon size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <CardDetailModal
        visible={detailsDrawerVisible}
        onBack={handleCloseDetailsDrawer}
      />
      <AddressManagementModal
        visible={addressModalVisible}
        onCancel={handleCloseAddressModal}
      />

      <Modal
        open={closeConfirmVisible}
        onCancel={handleCancelCloseAccount}
        footer={null}
        closable={false}
        centered
        width={667}
        wrapClassName={styles['close-confirm-wrap']}
      >
        <div className={styles['close-confirm-content']}>
          <Button
            type="link"
            className={styles['close-confirm-x']}
            onClick={handleCancelCloseAccount}
          >
            <CloseOutlined style={{ fontSize: '18px' }} />
          </Button>

          <h3 className={styles['close-confirm-title']}>Risk warning</h3>
          <p className={styles['close-confirm-text']}>
            Confirm Account Closure
            <br />
            This action is permanent and cannot be undone.
          </p>

          <div className={styles['close-confirm-actions']}>
            <Button
              className={styles['close-confirm-btn']}
              onClick={handleCancelCloseAccount}
            >
              <span>Cancel</span>
              <span className={styles['cancel-x-icon']}>×</span>
            </Button>
            <Button
              className={styles['close-confirm-btn']}
              onClick={handleConfirmCloseAccount}
            >
              <span>Confirm</span>
              <ArrowIcon size={12} />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CardManagementModal;
