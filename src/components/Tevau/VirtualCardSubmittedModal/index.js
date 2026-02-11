/**
 * 虚拟卡提交成功弹窗组件
 * 职责：展示虚拟卡申请已提交的确认信息
 */

import React from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CircleArrowIcon from '@/components/Tevau/CircleArrowIcon';
import styles from './index.less';

const VirtualCardSubmittedModal = ({ visible, onCancel, onConfirm }) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else if (onCancel) {
      onCancel();
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      closable={false}
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
                src={require('@/assets/images/tevau/virtualSubmittedModalBg.png')}
                alt="Virtual Card Submitted"
                className={styles['modal-image']}
              />
            </div>
          </div>

          {/* 右侧：文字和按钮 */}
          <div className={styles['right-section']}>
            <h2 className={styles['modal-title']}>
              Application has been submitted
            </h2>

            <div className={styles['info-section']}>
              <div className={styles['info-list']}>
                <p className={styles['info-item']}>
                  · We have received your request and it is now being reviewed.
                </p>
                <p className={styles['info-item']}>
                  · You can click the card icon to check the card application
                  progress.
                </p>
              </div>

              <Button
                type="primary"
                onClick={handleConfirm}
                className={styles['confirm-btn']}
              >
                <span>Confirm</span>
                <CircleArrowIcon size={13.54} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default VirtualCardSubmittedModal;
