import React from 'react';
import styles from './index.less';
import img from '@/assets/images/Home_2/arrow.png';
export default function HowSection() {
  return (
    <div className={styles['how']}>
      <div className={styles['node']}></div>
      <div className={styles['running']}></div>
      <div className={styles['shadow_4']}></div>

      <div className={styles.how_left}>
        <h2>HOW IT WORKS</h2>
        <div className={styles.underline}>
          <img src={img} />
        </div>
      </div>
      <div className={styles.how_right}>
        <h2>Decoupling, Pipeline and Proof</h2>
        <span>
          Janction decouples data, computing power, and models within the AI
          system, allowing tasks and resources to run in isolated yet pipeline
          processes. The Janction Network provides decentralized AI services for
          contribution verification, revenue distribution, and data
          verifiability, using unique algorithms for node and route management.
        </span>
      </div>
    </div>
  );
}
