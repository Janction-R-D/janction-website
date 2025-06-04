import { Tabs } from 'antd';
import styles from './index.less';
import UploadUrl from './upload_url';
import UploadApi from './upload_api';
import UploadDoc from './upload_doc';

const { TabPane } = Tabs;

export default function UploadFiles() {
  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="doc" type="card" className={styles.tabs}>
        <TabPane tab={'Doc'} key="doc">
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
        <TabPane tab={'URL'} key="url">
          <UploadUrl />
        </TabPane>
        <TabPane tab={'API'} key="api">
          <UploadApi />
        </TabPane>
      </Tabs>
    </div>
  );
}
