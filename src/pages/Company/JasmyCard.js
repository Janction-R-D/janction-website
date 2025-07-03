import { Card } from 'antd';
import styles from './index.less';

export default function JasmyCard() {
  return (
    <div className={styles.container_jasmycard}>
      <div className={styles.card} bordered={false}>
        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>LEGAL NAME</span>
            <span className={styles.value}>Jasmy Lab</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>ADDRESS</span>
            <span className={styles.value}>
              Kitaoyama, Minato ward, Tokyo 107-0061 F
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>PHONE NUMBER</span>
            <span className={styles.value}>
              If necessary, we will disclose it promptly.
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>E-MAIL</span>
            <span className={styles.value}>Contact@jasmylab.com</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>OPERATION SUPERVISOR</span>
            <span className={styles.value}>Harada Hiroshi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
