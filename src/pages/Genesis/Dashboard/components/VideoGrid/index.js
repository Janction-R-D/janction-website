import { PlayCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import img from '@/assets/images/genesis/janction-thumbnail.png';
import videoImg from '@/assets/images/genesis/video-thumbnail.png';
const videos = [
  { id: 1, title: '3 Must-Do Tasks to Boost Node Earnings' },
  { id: 2, title: '3 Must-Do Tasks to Boost Node Earnings' },
  { id: 3, title: '3 Must-Do Tasks to Boost Node Earnings' },
  { id: 4, title: '3 Must-Do Tasks to Boost Node Earnings' },
];

export default function VideoGrid() {
  return (
    <div className={styles.main_container}>
      <p className={styles.fakeBullet}>Web3 Starter Hub</p>
      <div className={styles.container}>
        <div className={styles.featured}>
          <div className={styles.featuredImage}>
            <img src={img} alt="Junction video" />
            <div className={styles.overlay}>
              <div className={styles.videoName}>Video name</div>
              <PlayCircleOutlined className={styles.playIcon} />
            </div>
          </div>
        </div>
        <div className={styles.grid}>
          {videos.map((video) => (
            <div key={video.id} className={styles.videoCard}>
              <img src={videoImg} />
              <div className={styles.overlay}>
                <span>{video.title}</span>
                <PlayCircleOutlined className={styles.cardIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
