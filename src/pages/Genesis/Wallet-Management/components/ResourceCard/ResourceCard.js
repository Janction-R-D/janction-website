import React from 'react';
import { Card, Divider } from 'antd';
import styles from './index.less';
export default function ResourceCard({ card }) {
  return (
    <Card className={styles['card']}>
      <div className={styles['col-left']}>
        <div className={styles['icon-box']}>
          <i className="iconfont icon-deploy-node icon" />
        </div>
        <div className={styles['description-box']}>
          <p className={styles['type']}>{card.type}</p>
          <div className={styles['date']}>
            {card.date}
            <Divider type="vertical" />
            <span
              className={`${styles['status']} ${
                styles[`status-${card.status.toLowerCase()}`]
              }`}
            >
              {card.status}
            </span>
          </div>
        </div>
      </div>
      <div className={styles['col-right']}>
        <p className={styles['value']}> {card.quantity}</p>
        <span className={styles['currency']}>{card.curency}</span>
      </div>
    </Card>
  );
}
