import { Button, Modal } from 'antd';
import { useState } from 'react';
import { history } from 'umi';
import News from './News';
import styles from './notify.less';

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
      width={430}
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
      <main className={styles['card-news']} id="notifications-modal">
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
