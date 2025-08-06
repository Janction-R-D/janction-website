import React, { useState } from 'react';
import { Pagination } from 'antd';
import styles from './notify.less';
import { Tooltip } from 'antd';
import { formatISODate } from '@/utils/datetime';

function News({ news }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Número de items por página
  const itemsPerPage = 5;

  // Calcula las notificaciones que se deben mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = news.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Maneja el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles['notifications-list']}>
      {currentNotifications.map((notification, index) => (
        <NotificationItem
          key={index}
          type={notification.type}
          message={notification?.message}
          notification={notification}
          timestamp={notification.timestamp}
        />
      ))}

      {/* Paginación */}
      <Pagination
        current={currentPage}
        total={news.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        showSizeChanger={false}
        className={styles['notifications-pagination']}
      />
    </div>
  );
}

const NotificationItem = ({ type, message, timestamp, notification }) => (
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
      <div className={styles['time']}>
        {formatISODate(notification.createdAt)}
      </div>
    </header>
    <Tooltip
      title={message}
      overlayClassName={styles['janction-tooltip']}
      placement="bottomRight"
      color="black"
    >
      <p className={styles['message']}>{message}</p>
      <p className={styles['message']}>{notification.id}</p>
      <p className={styles['message']}>{notification.handler}</p>
    </Tooltip>
  </div>
);

export default News;
