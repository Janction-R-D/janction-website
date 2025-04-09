import React from 'react';
import { Card, Button, Divider } from 'antd';
import styles from './index.less';
import { RightOutlined } from '@ant-design/icons';
import { history } from 'umi';

const IdentityCard = ({ card }) => {
  const handleClick = () => {
    history.push(card.path);
  };
  return (
    <Card className={styles['rent-node-card']} bordered={false}>
      <div className={styles['header-text']}>{card.name}</div>
      <div className={styles['label']}>
        <p className={styles['label-text']}>{card.type}</p>
        <Divider />
      </div>
      <div className={styles['illustration-container']}>
        <img
          src={card.img}
          alt={`${card.type} icon`}
          className={styles['illustration']}
        />
      </div>
      <div className={styles['arrow-container']}>
        <Button
          shape="circle"
          icon={<RightOutlined />}
          className={styles['arrow-btn']}
          onClick={handleClick}
        />
      </div>
    </Card>
  );
};

export default IdentityCard;
