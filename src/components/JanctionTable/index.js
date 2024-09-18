import { Table } from 'antd';
import styles from './index.less';

const JactionTable = (props) => {
  return (
    <div className={styles['table-container']}>
      <Table
        className={styles['jaction-table']}
        popupClassName={styles['jaction-popup']}
        {...props}
      />
    </div>
  );
};

export default JactionTable;
