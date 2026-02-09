/**
 * 卡片Item组件
 * 职责：展示单张卡片的基本信息
 *
 * 艹，单张卡片的展示组件，纯UI无逻辑
 */

import React from 'react';
import { Card, Tag, Button, Space, Tooltip } from 'antd';
import {
  CreditCardOutlined,
  LockOutlined,
  UnlockOutlined,
  ArrowUpOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import {
  CARD_STATUS_TEXT,
  CARD_STATUS_COLOR,
  CARD_TYPE_TEXT,
} from '@/utils/tevau';
import styles from './index.less';

const CardItem = ({ card, onClick, onUpgrade, onFreeze }) => {
  if (!card) return null;

  const { id, cardNumber, cardType, status, currency, balance, holderName } =
    card;

  // 格式化卡号（只显示后4位）
  const formatCardNumber = (number) => {
    if (!number) return '****';
    return `**** **** **** ${number.slice(-4)}`;
  };

  // 是否可以升级
  const canUpgrade = cardType === 'virtual' && status === 'active';

  // 是否已冻结
  const isFrozen = status === 'frozen';

  return (
    <Card
      className={styles.cardItem}
      hoverable
      onClick={onClick}
      actions={[
        <Tooltip title="View Details" key="view">
          <EyeOutlined
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          />
        </Tooltip>,
        canUpgrade && (
          <Tooltip title="Upgrade to Physical" key="upgrade">
            <ArrowUpOutlined
              onClick={(e) => {
                e.stopPropagation();
                onUpgrade?.();
              }}
            />
          </Tooltip>
        ),
        <Tooltip title={isFrozen ? 'Unfreeze' : 'Freeze'} key="freeze">
          {isFrozen ? (
            <UnlockOutlined
              onClick={(e) => {
                e.stopPropagation();
                onFreeze?.(false);
              }}
            />
          ) : (
            <LockOutlined
              onClick={(e) => {
                e.stopPropagation();
                onFreeze?.(true);
              }}
            />
          )}
        </Tooltip>,
      ].filter(Boolean)}
    >
      <div className={styles.cardHeader}>
        <CreditCardOutlined className={styles.cardIcon} />
        <Tag color={CARD_STATUS_COLOR[status]}>{CARD_STATUS_TEXT[status]}</Tag>
      </div>

      <div className={styles.cardNumber}>{formatCardNumber(cardNumber)}</div>

      <div className={styles.cardInfo}>
        <div className={styles.cardType}>{CARD_TYPE_TEXT[cardType]}</div>
        <div className={styles.cardBalance}>
          {balance || 0} {currency || 'USD'}
        </div>
      </div>

      <div className={styles.cardHolder}>{holderName || 'N/A'}</div>
    </Card>
  );
};

export default CardItem;
