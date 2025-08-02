import { Form, Tabs } from 'antd';
import styles from './index.less';
import UploadUrl from './upload_url';
import UploadApi from './upload_api';
import UploadDoc from './upload_doc';
import { useIntl } from 'umi';

const { TabPane } = Tabs;

export default function UploadFiles() {
  const { formatMessage } = useIntl();

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="doc" type="card" className={styles.tabs}>
        <TabPane tab={formatMessage({ id: 'upload.tab.doc' })} key="doc">
          <Form.Item
            name="files"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'upload.validation.required' }),
              },
            ]}
          >
            <UploadDoc style={{ height: '100%' }} />
          </Form.Item>
        </TabPane>

        {/* 
        <TabPane tab={formatMessage({ id: 'upload.tab.url' })} key="url">
          <UploadUrl />
        </TabPane>
        <TabPane tab={formatMessage({ id: 'upload.tab.api' })} key="api">
          <UploadApi />
        </TabPane> 
        */}
      </Tabs>
    </div>
  );
}
