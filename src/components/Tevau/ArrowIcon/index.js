/**
 * 箭头图标组件
 * 可复用的向右箭头图标，用于按钮等场景
 */

import React from 'react';
import styles from './index.less';

const ArrowIcon = ({ size = 14, color = '#FF9617', className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 13L13 1M13 1H7M13 1V7"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
