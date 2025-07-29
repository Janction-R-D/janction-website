import { useState } from 'react';
import { Modal, Input, message, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Paragraph, Text } = Typography;

const DeleteNodeButton = ({ nodeId, onDelete }) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [typedNodeId, setTypedNodeId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const handleClickDelete = () => {
    setConfirmModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setConfirmModalVisible(false);
    setVerifyModalVisible(true);
  };

  const handleVerifyAndDelete = async () => {
    setIsDeleting(true);
    try {
      if (typedNodeId === nodeId) {
        await onDelete(); // Por si devuelve una promesa
        setVerifyModalVisible(false);
        setTypedNodeId('');
      } else {
        message.error('Node ID does not match.');
      }
    } catch (error) {
      message.error('An error occurred while deleting the node.');
    } finally {
      setIsDeleting(false);
    }
  };

  const resetAll = () => {
    if (isDeleting) return;
    setConfirmModalVisible(false);
    setVerifyModalVisible(false);
    setTypedNodeId('');
  };

  return (
    <>
      <a onClick={handleClickDelete}>
        <DeleteOutlined className={styles.iconBtn} />
      </a>

      <Modal
        title="Confirm Node Deletion"
        open={confirmModalVisible}
        onCancel={resetAll}
        onOk={handleConfirmDelete}
        okText="I understand, continue"
        okButtonProps={{
          danger: true,
          loading: isDeleting,
          disabled: isDeleting,
        }}
        className={styles.modalWrapper}
      >
        <Paragraph>
          You are about to permanently delete the following node:
        </Paragraph>
        <Paragraph copyable code>
          {nodeId}
        </Paragraph>
        <Paragraph type="warning">
          This action <Text strong>cannot be undone</Text>. The node and all its
          data will be permanently removed.
        </Paragraph>
        <Paragraph>Please confirm that you want to continue.</Paragraph>
      </Modal>

      <Modal
        title="Final Confirmation Required"
        open={verifyModalVisible}
        onCancel={resetAll}
        onOk={handleVerifyAndDelete}
        okText="Delete Node"
        okButtonProps={{
          danger: true,
          loading: isDeleting,
          disabled: isDeleting,
        }}
        className={styles.modalWrapper}
      >
        <Paragraph>
          To permanently delete this node, please type the exact Node ID below.
        </Paragraph>
        <Paragraph copyable code>
          {nodeId}
        </Paragraph>
        <Input
          value={typedNodeId}
          onChange={(e) => setTypedNodeId(e.target.value)}
          placeholder="Enter Node ID to confirm"
        />
      </Modal>
    </>
  );
};

export default DeleteNodeButton;
