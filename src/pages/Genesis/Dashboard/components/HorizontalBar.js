import React from 'react';
import styles from './index.less';

const Bar = (props) => {
  const { data } = props;

  return (
    <div className={styles['sale-wrapper']}>
      {data.map((item, index) => (
        <div className={styles['sale-item']} key={index}>
          <div className={styles['icon']}>
            <i
              className={`iconfont icon-${item.icon}`}
              style={{ color: item.color }}
            ></i>
          </div>
          <span className={['ell', styles['name']].join(' ')}>{item.name}</span>
          <div className={styles['bar']}>
            <div
              className={styles['value-bar']}
              style={{ width: item.percent }}
            ></div>
          </div>
          <span>{`${item.price}`}m/h</span>
        </div>
      ))}
    </div>
  );
};

export default Bar;
