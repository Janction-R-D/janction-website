import { Col, Row, Statistic } from 'antd';
import React from 'react';
const { Countdown } = Statistic;
import styles from './index.less';

const JanctionCountDown = (props) => {
  const { deadline, format = 'HH:mm:ss', onFinish } = props;
  return (
    <Countdown
      value={deadline}
      format={format}
      onFinish={onFinish}
      className={styles['janction-count-down']}
    />
  );
};

export default JanctionCountDown;
