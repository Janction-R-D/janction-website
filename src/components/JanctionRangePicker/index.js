import { DatePicker } from 'antd';
import styles from './index.less';

const JanctionRangePicker = (props) => {
  const { RangePicker } = DatePicker;
  return (
    <div className={styles['table-container']}>
      <RangePicker
        className={styles['jaction-table']}
        popupClassName={styles['jaction-popup']}
        {...props}
      />
    </div>
  );
};

export default JanctionRangePicker;
