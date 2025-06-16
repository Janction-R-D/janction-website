import React from 'react';
import styles from './index.less';
import { Card, Tag, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const QuickCard = ({ card }) => {
  return (
    <Card className={styles['gpu-card']} bordered={false}>
      <div className={styles['gpu-header']}>
        <i className="iconfont icon-nvidia gpu-logo green" />
        <div>
          <h3 className={styles['gpu-title']}>{card.title}</h3>
          <p className={styles['gpu-location']}>{card.location}</p>
        </div>
      </div>

      <section className={styles['gpu-desc']}>
        <div className={styles['gpu-specs']}>
          <span>{card.cores}</span>
          <span>|</span>
          <span>{card.memory}</span>
        </div>

        <p className={styles['gpu-bandwidth']}>
          Bandwidth: <strong>{card.bandwidth}</strong>
        </p>
        <p className={styles['gpu-duration']}>
          Duration: <strong>{card.duration}</strong>
        </p>

        <div className={styles['gpu-price']}>
          <span className={styles['price-now']}>{card.price} USDT</span>
          <Tag color="#faad14" className={styles['discount-tag']}>
            {card.discount} off
          </Tag>
        </div>

        <div className={styles['gpu-original-price']}>
          {card.originalPrice} USDT
        </div>

        <Button className={styles['buy-button']} block>
          <p>BUY</p>
          <ShoppingCartOutlined />
        </Button>
      </section>
    </Card>
  );
};
export default QuickCard;
