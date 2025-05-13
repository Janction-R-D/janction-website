import { Modal, Form, Input, Typography, message } from 'antd';
import styles from './index.less';
import { fetchSshInsert } from '@/services/genesis';
import { useState } from 'react';

const { Text } = Typography;

const SshKeyModal = ({ visible, onCancel, record, setVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    form.submit(); // Esto dispara el onFinish
  };
  const onFinish = async (values) => {
    const payload = {
      key: values.key,
      resource_id: record?.id,
    };
    try {
      setLoading(true);
      await fetchSshInsert(payload);
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
          {/* <Form.Item
            name="keyName"
            label="Key name"
            rules={[
              { required: true, message: 'Please enter a name for your key' },
            ]}
          >
            <Input placeholder="e.g. My Laptop, Work MacBook..." />
          </Form.Item> */}

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
      </div>
    </Modal>
  );
};

export default SshKeyModal;
