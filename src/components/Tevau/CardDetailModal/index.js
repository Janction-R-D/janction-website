/**
 * 卡片详情弹窗组件
 * 职责：展示卡片的详细信息
 */

import React from 'react';
import { Modal, Descriptions, Tag, Button, Space } from 'antd';
import {
  CARD_STATUS_TEXT,
  CARD_STATUS_COLOR,
  CARD_TYPE_TEXT,
} from '@/utils/tevau';
import styles from './index.less';

const CardDetailModal = ({ visible, card, onClose }) => {
  if (!card) return null;

  return (
    <Modal
      open={visible}
      title="Card Details"
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={700}
      className={styles.modal}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Card Number">
          **** **** **** {card.cardNumber?.slice(-4)}
        </Descriptions.Item>
        <Descriptions.Item label="Card Type">
          {CARD_TYPE_TEXT[card.cardType]}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={CARD_STATUS_COLOR[card.status]}>
            {CARD_STATUS_TEXT[card.status]}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Currency">{card.currency}</Descriptions.Item>
        <Descriptions.Item label="Balance">
          {card.balance || 0} {card.currency}
        </Descriptions.Item>
        <Descriptions.Item label="Cardholder">
          {card.holderName}
        </Descriptions.Item>
        <Descriptions.Item label="Created At" span={2}>
          {card.createdAt || 'N/A'}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default CardDetailModal;
