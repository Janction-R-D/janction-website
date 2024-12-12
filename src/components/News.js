import React from 'react';
import styles from './notify.less';
import { Tooltip } from 'antd';
function News({ news }) {
  return (
    <div className={styles['notifications-list']}>
      {news.slice(0, 5).map((notification, index) => (
        <NotificationItem
          key={index}
          type={notification.type}
          message={notification.message}
          timestamp={notification.timestamp}
        />
      ))}
    </div>
  );
}

const NotificationItem = ({ type, message, timestamp }) => (
  <div className={styles['notification-item']}>
    <header className={styles['notification-header']}>
      <h1 className={styles['type']}>
        {type === 'transaction' ? (
          <i className="iconfont icon-list"></i>
        ) : type === 'activity' ? (
          <i className="iconfont icon-ticket"></i>
        ) : (
          <i className="iconfont icon-desktop"></i>
        )}
        {type}
      </h1>
      <div className={styles['time']}>{timestamp}</div>
    </header>
    <Tooltip
      title={message}
      overlayClassName={styles['janction-tooltip']}
      placement="bottomRight"
      color="black"
    >
      <p className={styles['message']}>{message}</p>
    </Tooltip>
  </div>
);
export default News;
