import { ConfigProvider, Input, Table } from 'antd';
import JactionEmpty from '../JactionEmpty';
import styles from './index.less';
import SearchInput from '../SeachInput';

const JanctionTable = (props) => {
  const {
    search,
    searchProps = {},
    emptyDescription,
    footer,
    ...extraProps
  } = props;
  return (
    <div
      className={[
        styles['table-container'],
        footer && styles['table-container-with-footer'],
      ].join(' ')}
    >
      {search && (
        <Input
          suffix={<i className="iconfont icon-search" />}
          placeholder="Search for something"
          className={styles['table-search']}
          {...searchProps}
        />
      )}
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
