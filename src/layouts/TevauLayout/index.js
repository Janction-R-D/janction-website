/**
 * Tevau页面公共布局
 * 职责：左侧背景图片 + 右侧内容区域
 */

import React from 'react';
import { Grid } from 'antd';
import styles from './index.less';

const TevauLayout = ({ children, title, mobileTitle }) => {
  const screens = Grid.useBreakpoint();

  return (
    <div className={styles['tevau-layout']}>
      {/* Logo */}
      <a className={styles['logo']} href="/">
        <img
          src={require('@/assets/images/icons/janction-logo-text.png')}
          alt="logo"
          className={styles['logo-img']}
        />
      </a>

      {/* 左侧：背景图片 */}
      <div className={styles['left-section']}>
        <img
          src={
            screens.md
              ? require('@/assets/images/tevau/fingerBig.png')
              : require('@/assets/images/tevau/fingerSmall.png')
          }
          alt="background"
          className={styles['background-image']}
        />
        {!screens.md && (
          <h1 className={styles['page-title']}>{mobileTitle || title}</h1>
        )}
      </div>

      {/* 右侧：内容区域 */}
      <div className={styles['right-section']}>
        <div className={styles['content-container']}>
          {screens.md && title && (
            <h1 className={styles['page-title']}>{title}</h1>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default TevauLayout;
