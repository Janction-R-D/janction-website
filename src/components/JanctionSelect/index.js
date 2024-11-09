import { Select } from 'antd';
import styles from './index.less';

const JanctionSelect = (props) => {
  const { className, ...extraProps } = props;
  return (
    <div className={styles['select-container']}>
      <Select
        className={[styles['jaction-select'], className].join(' ')}
        popupClassName={styles['jaction-popup']}
        {...extraProps}
      />
    </div>
  );
};

export default JanctionSelect;
