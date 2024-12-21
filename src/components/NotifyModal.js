import React, { useEffect, useState } from 'react';
import styles from './notify.less';
import { Button, Modal } from 'antd';
import News from './News';
import { history } from 'umi';
// const notifications = [
//   {
//     type: 'transaction',
//     message: 'Switch to Landlord Role',
//     timestamp: '2024-12-02T17:41:23',
//   },
//   {
//     type: 'activity',
//     message: "There's a node whose lease expired",
//     timestamp: '2024-12-02T17:41:23',
//   },
//   {
//     type: 'product',
//     message: 'New product update available',
//     timestamp: '2024-12-01T14:22:30',
//   },
//   {
//     type: 'transaction',
//     message: 'One of your nodes was canceled',
//     timestamp: '2024-12-02T17:41:23',
//   },
//   {
//     type: 'transaction',
//     message:
//       'You have an instance that is about to expire，You have an instance that is about to expire',
//     timestamp: '2024-12-02T16:25:43',
//   },

//   {
//     type: 'activity',
//     message: 'There is a 50% discount on renewal',
//     timestamp: '2024-12-02T17:41:23',
//   },
//   {
//     type: 'activity',
//     message: 'New feature added to your dashboard',
//     timestamp: '2024-12-02T15:14:10',
//   },
//   {
//     type: 'product',
//     message: 'You have an instance that is about to expire',
//     timestamp: '2024-12-02T17:41:23',
//   },

//   {
//     type: 'product',
//     message: 'Scheduled maintenance for your instance',
//     timestamp: '2024-12-01T10:05:50',
//   },
// ];

export default function NotifyModal({ setIsModalOpen, isModalOpen, handleOk }) {
  const [news, setNews] = useState([]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onNavigate = () => {
    setIsModalOpen(false);
    history.push('/genesis/message-center');
  };

  return (
    <Modal
      className={styles['card-modal']}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      header={false}
      width={450}
      closable={false}
    >
      <header className={styles['card-header']}>
        <h3 className={styles['card-title']}>New news ({news.length})</h3>
        {news.length > 0 && (
          <Button className={styles['create-btn']} onClick={onNavigate}>
            See All <i className="iconfont icon-next_page"></i>
          </Button>
        )}
      </header>
      <main className={styles['card-news']}>
        {news.length <= 0 ? (
          <div className={styles['news-img-container']}>
            <img src="/icon-messages.png" className={styles['news-img']} />
          </div>
        ) : (
          <News news={notifications} />
        )}
      </main>
    </Modal>
  );
}
