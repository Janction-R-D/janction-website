import { ConfigProvider, Table } from 'antd';
import JactionEmpty from '../JactionEmpty';
import styles from './index.less';

const JactionTable = (props) => {
  const { emptyDescription } = props;
  return (
    <div className={styles['table-container']}>
      <ConfigProvider
        renderEmpty={() => <JactionEmpty description={emptyDescription} />}
      >
        <Table
          className={styles['jaction-table']}
          popupClassName={styles['jaction-popup']}
          {...props}
        />
      </ConfigProvider>
    </div>
  );
};

export default JactionTable;
