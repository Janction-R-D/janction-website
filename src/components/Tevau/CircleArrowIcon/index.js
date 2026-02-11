/**
 * 带圆形边框的箭头图标
 * 职责：在按钮中显示向右箭头，带圆形边框
 */

import React from 'react';
import styles from './index.less';

const CircleArrowIcon = ({ size = 14, color = '#FF9617' }) => {
  return (
    <div
      className={styles['circle-arrow']}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 圆形边框 */}
        <circle
          cx="7"
          cy="7"
          r="6"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        {/* 箭头 */}
        <path
          d="M4.5 7H9.5M9.5 7L7.5 5M9.5 7L7.5 9"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CircleArrowIcon;
