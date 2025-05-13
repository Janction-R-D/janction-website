import { Modal, Form, Input, Typography, message, List, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import styles from './index.less';
import { fetchSshInsert, fetchSshList } from '@/services/genesis';
import { useState, useEffect } from 'react';

const { Text } = Typography;

const SshKeyModal = ({ visible, onCancel, record }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [sshKeys, setSshKeys] = useState([]);

  const handleOk = () => {
    form.submit();
  };

  const loadSshKeys = async () => {
    try {
      const res = await fetchSshList({ resource_id: record?.id });
      setSshKeys(res?.keys || []);
    } catch (error) {
      console.error('Failed to fetch keys:', error);
    }
  };

  useEffect(() => {
    if (visible && record?.id) {
      loadSshKeys();
    }
  }, [visible, record?.id]);

  const onFinish = async (values) => {
    const payload = {
      key: values.key,
      resource_id: record?.id,
    };
    try {
      setLoading(true);
      await fetchSshInsert(payload);
      message.success('SSH key added successfully!');
      form.resetFields();
      loadSshKeys();
    } catch (error) {
      console.log(error);
      message.error('Operation failed!!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setLoading(false);
    onCancel();
  };

  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    message.success('Copied to clipboard!');
  };

  return (
    <Modal
      open={visible}
      title={`Add a new SSH Key to ${record.id}`}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Save key"
      width={700}
      confirmLoading={loading}
      className={styles.modal}
    >
      <div className={styles.container}>
        <Text type="secondary">
          Paste your public SSH key here. You can find it in{' '}
          <code>~/.ssh/id_rsa.pub</code>
          <p>
            or generate a new one using <code>ssh-keygen</code>.
          </p>
        </Text>

        <Form
          form={form}
          layout="vertical"
          className={styles.form}
          onFinish={onFinish}
        >
          <Form.Item
            name="key"
            label="Public SSH key"
            rules={[
              { required: true, message: 'Please paste your SSH public key' },
            ]}
          >
            <Input.TextArea
              placeholder="ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA..."
              autoSize={{ minRows: 6, maxRows: 10 }}
              className={styles.textarea}
            />
          </Form.Item>
        </Form>

        {sshKeys?.length > 0 && (
          <div className={styles.savedKeys}>
            <Text strong>Saved SSH keys:</Text>
            <div className={styles.keysList}>
              {sshKeys.slice(0, 5).map((key, index) => (
                <div key={index} className={styles.keyRow}>
                  <div className={styles.ellipsis}>{key}</div>
                  <Tooltip title="Copy key">
                    <CopyOutlined
                      onClick={() => handleCopy(key)}
                      className={styles.copyIcon}
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SshKeyModal;
