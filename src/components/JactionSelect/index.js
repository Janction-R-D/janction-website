import { Select } from 'antd';
import styles from './index.less';

const JactionSelect = (props) => {
  return (
    <Select
      className={styles['jaction-select']}
      popupClassName={styles['jaction-popup']}
      {...props}
    />
  );
};

export default JactionSelect;
