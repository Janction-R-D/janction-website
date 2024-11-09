import React from 'react';
import styles from './loader.less';
export default function Loading({ loading }) {
  return (
    <>
      {loading ? (
        <div className={styles['loader-box']}>
          <div className={styles['loader']}></div>
          <p>Loading, please wait.</p>
        </div>
      ) : (
        <p style={{ marginTop: '24px', marginBottom: '8px' }}>
          No information available at the moment, please enter the device
          identification number.
        </p>
      )}
    </>
  );
}
