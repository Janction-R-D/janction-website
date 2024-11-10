import { SYSTEM_LIST } from '@/constant';
import { useState } from 'react';
import styles from './index.less';

const ImageConf = (props) => {
  const [active_i, setActiveI] = useState(SYSTEM_LIST[0]);
  return (
    <div className={styles['image-conf-wrapper']}>
      {SYSTEM_LIST.map((item) => (
        <div
          className={[
            styles['item'],
            active_i.value == item.value && styles['active-item'],
          ].join(' ')}
          onClick={() => setActiveI(item)}
        >
          <div className={styles['icon']}>
            <i className={`iconfont icon-${item.icon}`}></i>
          </div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ImageConf;
