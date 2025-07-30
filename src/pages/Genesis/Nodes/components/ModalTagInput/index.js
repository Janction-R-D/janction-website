import { Modal, Input, Button, message } from 'antd';
import { useState } from 'react';
import styles from './index.less';
import { fetchNodeTag } from '@/services/genesis';

export default function ModalTagInput({ onRefresh, open, onClose, item }) {
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const handleTag = async () => {
    if (tag.length < 3) {
      message.info('The name must have at least 4 letters.');
      return;
    }
    try {
      setLoading(true);
      const data = { node_id: item.id, name: tag };
      await fetchNodeTag(data);
      message.success('name updated successfully!');
      onClose();
      await onRefresh();
      setTag('');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        setTag('');
        setLoading(false);
        onClose();
      }}
      onOk={handleTag}
      okText="Add Name"
      cancelText="Cancel"
      title="Add a name for your node"
      className={styles['custom-modal']}
      confirmLoading={loading}
    >
      <Input
        placeholder="Enter a Name..."
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
    </Modal>
  );
}
