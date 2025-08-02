import { useState } from 'react';
import { Modal, Input, message, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './index.less';
import { useIntl, FormattedMessage } from 'umi';

const { Paragraph, Text } = Typography;

const DeleteNodeButton = ({ nodeId, onDelete }) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [typedNodeId, setTypedNodeId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const intl = useIntl();

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
        await onDelete?.();
        setVerifyModalVisible(false);
        setTypedNodeId('');
      } else {
        message.error(
          intl.formatMessage({ id: 'deleteNode.error.idNotMatch' }),
        );
      }
    } catch (error) {
      message.error(
        intl.formatMessage({ id: 'deleteNode.error.deletionFailed' }),
      );
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
        title={intl.formatMessage({ id: 'deleteNode.confirmTitle' })}
        open={confirmModalVisible}
        onCancel={resetAll}
        onOk={handleConfirmDelete}
        okText={intl.formatMessage({ id: 'deleteNode.okContinue' })}
        okButtonProps={{ danger: true, loading: isDeleting }}
        className={styles.modalWrapper}
        cancelText={intl.formatMessage({ id: 'fileManager.modal.cancel' })}
      >
        <Paragraph>
          <FormattedMessage id="deleteNode.confirm.description" />
        </Paragraph>
        <Paragraph copyable code>
          {nodeId}
        </Paragraph>
        <Paragraph type="warning">
          <Text strong>
            <FormattedMessage id="deleteNode.confirm.cannotUndo" />
          </Text>
        </Paragraph>
        <Paragraph>
          <FormattedMessage id="deleteNode.confirm.askToContinue" />
        </Paragraph>
      </Modal>

      <Modal
        title={intl.formatMessage({ id: 'deleteNode.verifyTitle' })}
        open={verifyModalVisible}
        onCancel={resetAll}
        onOk={handleVerifyAndDelete}
        okText={intl.formatMessage({ id: 'deleteNode.okDelete' })}
        okButtonProps={{ danger: true, loading: isDeleting }}
        className={styles.modalWrapper}
        cancelText={intl.formatMessage({ id: 'fileManager.modal.cancel' })}
      >
        <Paragraph>
          <FormattedMessage id="deleteNode.verify.description" />
        </Paragraph>
        <Paragraph copyable code>
          {nodeId}
        </Paragraph>
        <Input
          value={typedNodeId}
          onChange={(e) => setTypedNodeId(e.target.value)}
          placeholder={intl.formatMessage({
            id: 'deleteNode.verify.inputPlaceholder',
          })}
        />
      </Modal>
    </>
  );
};

export default DeleteNodeButton;
