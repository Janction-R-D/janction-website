import React from 'react';
import styles from './index.less';
import { onNavigate } from '../../utils';

export default function AgentCardThumb({ title, score, image, tags, path }) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} alt="FinChat AI" />
      <div className={styles.overlay}>
        <div className={styles.description}>
          <div className={styles.description_left}>
            <div className={styles.title}>{title}</div>
            <div className={styles.score}>Score : {score}</div>
          </div>
          <div
            className={styles.try}
            onClick={() => onNavigate(path, location.pathname)}
          ></div>
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
