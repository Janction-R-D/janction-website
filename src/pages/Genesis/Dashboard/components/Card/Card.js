import React from 'react';
import styles from './index.less';
import { Button, Card } from 'antd';
import { BarChartOutlined, RightOutlined } from '@ant-design/icons';
export default function Web3Card({ card }) {
  const handleClick = () => {};
  return (
    <Card className={styles['card']} bordered={false}>
      <Button
        icon={<RightOutlined className={styles['icon-card']} rounded />}
        className={styles['arrow-btn']}
        onClick={handleClick}
      />
      <section>
        <BarChartOutlined className={styles['icon-card__2']} size={'2rem'} />
        <p>3 Must-Do Tasks to Boost Node Earnings</p>
      </section>
    </Card>
  );
}
