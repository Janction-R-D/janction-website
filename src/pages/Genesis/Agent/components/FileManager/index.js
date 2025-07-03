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

import styles from './index.less';
import UploadDoc from './components/uploads';
import { history, Redirect, useLocation } from 'umi';
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
      const res = await fetchUploadMultiFiles(knowledge_id, formData);
      console.log(res);
      setIsModalVisible(false);
      message.success('File created (pending implementation)');
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
      message.error('Knoleadge Base cannot be empty!');
      return;
    }
    try {
      message.info({
        content: 'Deleting Document...',
        key: 'delete',
        duration: 0,
      });
      const params = { k_id: knowledge_id, file_id: record?.file_id };
      await fetchDeleteDocument(params);

      message.success('File deleted successfully!');
      getFiles();
    } catch (error) {
      console.log(error);
      error;
      message.error('Operation failed!');
    } finally {
      message.destroy('delete');
    }
  };

  const downloadFile = (url, fileName) => {
    console.log(fileName);
    const link = document.createElement('a');
    link.href = url;
    if (fileName) link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => downloadFile(record.url, record.name)}
          >
            Download
          </Button>
          <Popconfirm
            title={`Delete ${record.name}?`}
            onConfirm={() => onDelete(record)}
          >
            <Button type="link" icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (!knowledge_id) return <Redirect to="/genesis/agent"></Redirect>;
  return (
    <div style={{ padding: 24 }}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Agent AI</h1>
          <Divider type="vertical" className={styles['line']} />
          <span>
            <p>Easily create your </p>
            <p>Own AI agent </p>
          </span>
        </header>
      </section>
      <h1 className={styles['title']}>Knowleage Base Details</h1>
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
          Back
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles['connect-btn']}
          onClick={showModal}
        >
          Create new file
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mappedFiles}
        rowKey="id"
        className={styles['table']}
      />

      <Modal
        title="Upload new file"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Para que el botón sea parte del Form
        className={styles['modal']}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleCreateFile} // Cuando el usuario haga submit
        >
          <Form.Item
            name="files"
            label="Files"
            valuePropName="value"
            getValueFromEvent={(e) => e}
            rules={[
              { required: true, message: 'Please select at least one file' },
            ]}
          >
            <UploadDoc />
          </Form.Item>

          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 8 }}
              loading={loading}
            >
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
