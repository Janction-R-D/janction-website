/**
 * 卡片申请提交成功弹窗组件
 * 职责：展示提交确认信息，支持虚拟卡/实体卡文案复用
 */

import React from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CircleArrowIcon from '@/components/Tevau/CircleArrowIcon';
import styles from './index.less';

const defaultMessages = [
  '· We have received your request and it is now being reviewed.',
  '· You can click the card icon to check the card application progress.',
];

const CardApplicationSubmittedModal = ({
  visible,
  onCancel,
  onConfirm,
  title = 'Application has been submitted',
  messages = defaultMessages,
  image = require('@/assets/images/tevau/virtualSubmittedModalBg.png'),
  imageAlt = 'Card Application Submitted',
  confirmText = 'Confirm',
}) => {
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
      width={960}
      centered
      destroyOnClose
    >
      <div className={styles['modal-content']}>
        <Button className={styles['close-btn']} type="link" onClick={onCancel}>
          <CloseOutlined style={{ fontSize: '20px' }} />
        </Button>

        <div className={styles['content-body']}>
          <div className={styles['left-section']}>
            <div className={styles['image-wrapper']}>
              <img
                src={image}
                alt={imageAlt}
                className={styles['modal-image']}
              />
            </div>
          </div>

          <div className={styles['right-section']}>
            <h2 className={styles['modal-title']}>{title}</h2>

            <div className={styles['info-section']}>
              <div className={styles['info-list']}>
                {messages.map((item) => (
                  <p key={item} className={styles['info-item']}>
                    {item}
                  </p>
                ))}
              </div>

              <Button
                type="primary"
                onClick={handleConfirm}
                className={styles['confirm-btn']}
              >
                <span>{confirmText}</span>
                <CircleArrowIcon size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardApplicationSubmittedModal;
