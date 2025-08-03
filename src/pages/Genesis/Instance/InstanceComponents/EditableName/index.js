import { useState, useEffect } from 'react';
import { Modal, Input, Tooltip, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './index.less';
import { updateNodeName } from '@/services/genesis';

const EditableNameInCell = ({ text, record, refresh }) => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(text);
  }, [text]);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setName(text);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      message.warning('Name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      await updateNodeName({
        resource_id: record.id,
        name,
      });
      message.success('Name updated');
      setVisible(false);
      refresh?.();
    } catch (err) {
      console.error(err);
      message.error('Failed to update name!');
    } finally {
      setLoading(false);
    }
  };
  console.log(text);
  return (
    <>
      <div className={styles.inlineView}>
        <Tooltip title={name}>
          <span className={styles.text}>{text || '--'}</span>
        </Tooltip>
        <EditOutlined
          onClick={handleOpen}
          className={styles.icon}
          style={{ marginLeft: 6, color: '#1890ff' }}
        />
      </div>

      <Modal
        title="Edit Name"
        open={visible}
        onOk={handleSave}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="Save"
        className={styles['modal']}
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new name"
          className={styles['input']}
        />
      </Modal>
    </>
  );
};

export default EditableNameInCell;
