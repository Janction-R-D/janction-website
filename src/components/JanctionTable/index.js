import { ConfigProvider, Table } from 'antd';
import JactionEmpty from '../JactionEmpty';
import styles from './index.less';

const JanctionTable = (props) => {
  const { emptyDescription, footer, ...extraProps } = props;
  return (
    <div
      className={[
        styles['table-container'],
        footer && styles['table-container-with-footer'],
      ].join(' ')}
    >
      <ConfigProvider
        renderEmpty={() => <JactionEmpty description={emptyDescription} />}
      >
        <Table
          className={styles['jaction-table']}
          popupClassName={styles['jaction-popup']}
          footer={footer}
          {...extraProps}
        />
      </ConfigProvider>
    </div>
  );
};

export default JanctionTable;
