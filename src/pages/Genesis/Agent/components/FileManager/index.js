import { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Modal,
  Table,
  Space,
  Popconfirm,
  message,
  Form,
} from 'antd';
import {
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useIntl, history, Redirect, useLocation, FormattedMessage } from 'umi';

import styles from './index.less';
import UploadDoc from './components/uploads';
import {
  fetchDeleteDocument,
  fetchDocList,
  fetchUploadMultiFiles,
} from '@/services/genesis/agents';
import { formatISODate } from '@/utils/datetime';

export default function FileManager() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const location = useLocation();
  const [form] = Form.useForm();
  const { knowledge_id } = location.state || {};
  const intl = useIntl();

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    const res = await fetchDocList(knowledge_id);
    setList(res || []);
  };

  const mappedFiles = list?.map((item, index) => ({
    id: index + 1,
    createdAt: formatISODate(item?.created_at),
    name: item?.file_name,
    file_id: item?.id,
    url: item?.s3_url,
  }));

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCreateFile = async (values) => {
    const { files } = values;
    try {
      setLoading(true);
      const formData = new FormData();
      files.forEach((file) => {
        if (file.originFileObj) {
          formData.append('files', file.originFileObj);
        }
      });
      await fetchUploadMultiFiles(knowledge_id, formData);
      setIsModalVisible(false);
      message.success(intl.formatMessage({ id: 'fileManager.upload.success' }));
      getFiles();
      form.resetFields();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (record) => {
    if (list.length <= 1) {
      message.error(intl.formatMessage({ id: 'fileManager.delete.error' }));
      return;
    }
    try {
      message.info({
        content: intl.formatMessage({ id: 'fileManager.delete.pending' }),
        key: 'delete',
        duration: 0,
      });
      const params = { k_id: knowledge_id, file_id: record?.file_id };
      await fetchDeleteDocument(params);

      message.success(intl.formatMessage({ id: 'fileManager.delete.success' }));
      getFiles();
    } catch (error) {
      console.log(error);
      message.error(intl.formatMessage({ id: 'fileManager.delete.failed' }));
    } finally {
      message.destroy('delete');
    }
  };

  const downloadFile = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    if (fileName) link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      title: intl.formatMessage({ id: 'fileManager.table.id' }),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: intl.formatMessage({ id: 'fileManager.table.name' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: intl.formatMessage({ id: 'fileManager.table.createdAt' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: intl.formatMessage({ id: 'fileManager.table.actions' }),
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => downloadFile(record.url, record.name)}
          >
            {intl.formatMessage({ id: 'fileManager.download' })}
          </Button>
          <Popconfirm
            title={intl.formatMessage(
              { id: 'fileManager.delete.confirm' },
              { name: record.name },
            )}
            onConfirm={() => onDelete(record)}
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              {intl.formatMessage({ id: 'fileManager.delete' })}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (!knowledge_id) return <Redirect to="/genesis/agent" />;
  return (
    <div style={{ padding: 24 }}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>
            <FormattedMessage id="fileManager.header.title" />
          </h1>
          <Divider type="vertical" className={styles['line']} />
          <span>
            <p>
              <FormattedMessage id="fileManager.header.subtitle.1" />
            </p>
            <p>
              <FormattedMessage id="fileManager.header.subtitle.2" />
            </p>
          </span>
        </header>
      </section>

      <h1 className={styles['title']}>
        <FormattedMessage id="fileManager.title" />
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBlock: 16,
        }}
      >
        <Button
          type="primary"
          className={styles['connect-btn']}
          onClick={() => history.replace('/genesis/agent')}
        >
          <i className="iconfont icon-pre" />
          <FormattedMessage id="fileManager.back" />
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles['connect-btn']}
          onClick={showModal}
        >
          <FormattedMessage id="fileManager.createNew" />
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mappedFiles}
        rowKey="id"
        className={styles['table']}
      />

      <Modal
        title={intl.formatMessage({ id: 'fileManager.modalTitle' })}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className={styles['modal']}
      >
        <Form layout="vertical" form={form} onFinish={handleCreateFile}>
          <Form.Item
            name="files"
            label={intl.formatMessage({ id: 'fileManager.table.name' })}
            valuePropName="value"
            getValueFromEvent={(e) => e}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'fileManager.modal.validation',
                }),
              },
            ]}
          >
            <UploadDoc />
          </Form.Item>

          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel}>
              <FormattedMessage id="fileManager.modal.cancel" />
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 8 }}
              loading={loading}
            >
              <FormattedMessage id="fileManager.modal.create" />
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
