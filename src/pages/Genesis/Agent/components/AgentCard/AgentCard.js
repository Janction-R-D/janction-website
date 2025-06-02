import styles from './index.less';
import { onNavigate } from '../../utils';

export default function AgentCard({ title, score, icon, tags, path }) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={icon} alt="FinChat AI" />
      <div className={styles.overlay}>
        <div className={styles.description}>
          <div className={styles.description_left}>
            <div className={styles.title}>{title}</div>
            <div className={styles.score}> Score : {score}</div>
          </div>
          <div
            className={styles.try}
            onClick={() => onNavigate(path, location.pathname)}
          >
            Try{' '}
            <span className={styles.icon}>
              <i className="iconfont icon-next" style={{ fontSize: '12px' }} />
            </span>
          </div>
        </div>
        <div className={styles['buttons']}>
          {tags?.map((btn, i) => (
            <div key={i} className={styles.btn}>
              {btn}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
