import React from 'react';
import styles from './index.less';

const ToggleSwitch = ({ isGrid, setIsGrid }) => {
  return (
    <label className={styles['toggle-switch']}>
      <input
        type="checkbox"
        checked={isGrid}
        onChange={() => setIsGrid(!isGrid)}
      />
      <div className={styles['switch']}>
        <span
          className={`${styles['icon']} ${!isGrid ? styles['selected'] : ''}`}
          onClick={() => setIsGrid(false)}
        >
          &#9776;
        </span>
        <span
          className={`${styles['icon']} ${isGrid ? styles['selected'] : ''}`}
          onClick={() => setIsGrid(true)}
        >
          &#9638;
        </span>
      </div>
    </label>
  );
};

export default ToggleSwitch;
