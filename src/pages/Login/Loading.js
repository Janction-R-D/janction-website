import React from 'react';
import styles from './loader.less';

const Loader = () => {
  return (
    <section className={styles['loader-container']}>
      <div className={styles['loader']}></div>
      <p className={styles['loading-text']}>
        Loading<span className={styles['dots']}></span>
      </p>
    </section>
  );
};

export default Loader;
