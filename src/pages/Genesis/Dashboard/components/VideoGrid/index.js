import { PlayCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import styles from './index.less';
import img from '@/assets/images/genesis/janction-thumbnail.png';
import { useState } from 'react';
import TailscaleSetupModal from '../TailscaleDoc';
import GuideDoc from '../GuideDoc';

const videos = [
  {
    id: 1,
    title: 'How to Deploy and List a Node',
    video: '/videos/DeployNodeWeb.mp4',
  },
  {
    id: 2,
    title: 'How to Purchase a Machine and Connect Remotely',
    video: '/videos/purchase.mp4',
  },
  {
    id: 3,
    title: 'How to Deploy using Janction Deploy Application',
    video: '/videos/DeployApp.mp4',
  },
  {
    id: 4,
    title: 'How to Connect Remotely using Janction Deploy Application',
    video: '/videos/janctionAppRemote.m4v',
  },
];

export default function VideoGrid() {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <div className={styles.main_container}>
      <p className={styles.fakeBullet}>Web3 Starter Hub</p>
      <div className={styles.container}>
        <div className={styles.featured}>
          <div className={styles.featuredImage}>
            <img src={img} alt="Junction video" />
            <div className={styles.overlay}>
              <div className={styles.videoName}>Janction Tutorial</div>
              <PlayCircleOutlined
                onClick={() => setModalVisible(true)}
                className={styles.playIcon}
              />
              <GuideDoc
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
              />
              {/* <TailscaleSetupModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
              /> */}
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          {videos.map((video) => (
            <VideoCard video={video} key={video.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpen = () => {
    if (video.video === '/videos/login.mp4') return;
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={styles.videoCard}>
        <div className={styles.videoWrapper}>
          <video
            src={video.video}
            muted
            playsInline
            className={styles.video}
            style={{ pointerEvents: 'none' }}
          />
        </div>
        <div className={styles.overlay}>
          <span className={styles.overlay_text}>{video.title}</span>
          <PlayCircleOutlined
            className={styles.cardIcon}
            onClick={handleOpen}
          />
        </div>
      </div>

      <Modal
        title={video.title}
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}
        centered
        destroyOnClose
        width={800}
        className={styles['customModal']}
      >
        <video src={video.video} controls autoPlay style={{ width: '100%' }} />
      </Modal>
    </>
  );
}
