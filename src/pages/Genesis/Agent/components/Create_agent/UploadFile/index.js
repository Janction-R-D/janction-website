import { Tabs } from 'antd';
import styles from './index.less';
import { useIntl } from 'umi';
import UploadDoc from '@/pages/Create_agent/UploadFile/upload_doc';
import UploadUrl from '@/pages/Create_agent/UploadFile/upload_url';
import UploadApi from '@/pages/Create_agent/UploadFile/upload_api';

const { TabPane } = Tabs;

export default function UploadFiles() {
  const { formatMessage } = useIntl();

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="doc" type="card" className={styles.tabs}>
        <TabPane tab={formatMessage({ id: 'create.upload_doc' })} key="doc">
          <UploadDoc style={{ height: '100%' }} />

          {/*<Upload className={styles.upload}>*/}
          {/*  <div className={styles['uploadIcon']}>*/}
          {/*    <i className="iconfont icon-doc" />*/}
          {/*  </div>*/}
          {/*  <div className={styles.uploadText}>*/}
          {/*    <span className={styles.drag}>*/}
          {/*      {formatMessage({ id: 'create.upload_text' })}*/}
          {/*    </span>*/}
          {/*    <span className={styles.tip}>*/}
          {/*      {formatMessage({ id: 'create.upload_textdesc' })}*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*</Upload>*/}
        </TabPane>
        <TabPane tab={formatMessage({ id: 'create.upload_url' })} key="url">
          <UploadUrl />
        </TabPane>
        <TabPane tab={formatMessage({ id: 'create.upload_api' })} key="api">
          <UploadApi />
        </TabPane>
      </Tabs>
    </div>
  );
}
