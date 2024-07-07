import { Select } from 'antd';
import styles from './index.less';

const JactionSelect = (props) => {
  return (
    <div className={styles['select-container']}>
      <Select
        className={styles['jaction-select']}
        popupClassName={styles['jaction-popup']}
        showArrow={false}
        {...props}
      />
      <i className="iconfont icon-down_triangle"></i>
    </div>
  );
};

export default JactionSelect;
