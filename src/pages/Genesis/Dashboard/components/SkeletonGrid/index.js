import React from 'react';
import { Skeleton } from 'antd';
import styles from './index.less';
const SkeletonGrid = () => {
  return (
    <>
      <section className={styles['container']}>
        <div className={styles['video-col']}>
          <Skeleton.Avatar className={styles['custom-skeleton-1']} active />
        </div>

        <div className={styles['cols']}>
          {[...Array(4)].map((_, index) => (
            <Skeleton.Avatar className={styles['custom-skeleton-2']} active />
          ))}
        </div>
      </section>
    </>
  );
};

export default SkeletonGrid;
