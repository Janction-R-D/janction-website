import React, { useState, useEffect } from 'react';
import usaImage from '@/assets/images/us.svg';
import jpImage from '@/assets/images/jp.svg';
import checkImage from '@/assets/images/check.png';
import { Dropdown, Space } from 'antd';
import styles from './index.less';
import { setLocale, getLocale } from 'umi';

export function DropLanguage() {
  const [lang, setLang] = useState(getLocale());

  const items = [
    {
      label: (
        <div className={styles.drop__item}>
          <div>
            <img
              src={usaImage}
              alt="US"
              style={{ width: 20, marginRight: 8 }}
            />
            <span>English</span>
          </div>
          {lang === 'en-US' && (
            <span className={styles.check}>
              <img src={checkImage} />
            </span>
          )}
        </div>
      ),
      key: 'en-US',
    },
    {
      label: (
        <div className={styles.drop__item}>
          <div>
            <img src={jpImage} alt="JP" style={{ width: 20, marginRight: 8 }} />
            <span>日本語</span>
          </div>
          {lang === 'ja-JP' && (
            <span className={styles.check}>
              <img src={checkImage} />
            </span>
          )}
        </div>
      ),
      key: 'ja-JP',
    },
  ];

  const handleMenuClick = (info) => {
    setLocale(info.key, false);
    setLang(info.key); // actualizar estado para re-renderizar
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      overlayClassName={styles['drop__menu']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {lang === 'ja-JP' ? (
            <img src={jpImage} alt="JP" style={{ width: 20 }} />
          ) : (
            <img src={usaImage} alt="US" style={{ width: 20 }} />
          )}
          <i
            className="iconfont icon-down icon--white"
            style={{ color: '#fff' }}
          />
        </Space>
      </a>
    </Dropdown>
  );
}
