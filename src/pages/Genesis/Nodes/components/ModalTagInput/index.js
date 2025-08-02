import { Modal, Input, message } from 'antd';
import { useState } from 'react';
import styles from './index.less';
import { fetchNodeTag } from '@/services/genesis';
import { useIntl } from 'umi';

export default function ModalTagInput({ onRefresh, open, onClose, item }) {
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const handleTag = async () => {
    if (tag.length < 4) {
      message.info(intl.formatMessage({ id: 'modalTagInput.nameMinLength' }));
      return;
    }
    try {
      setLoading(true);
      const data = { node_id: item.id, name: tag };
      await fetchNodeTag(data);
      message.success(
        intl.formatMessage({ id: 'modalTagInput.updateSuccess' }),
      );
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
      okText={intl.formatMessage({ id: 'modalTagInput.okText' })}
      cancelText={intl.formatMessage({ id: 'modalTagInput.cancelText' })}
      title={intl.formatMessage({ id: 'modalTagInput.title' })}
      className={styles['custom-modal']}
      confirmLoading={loading}
    >
      <Input
        placeholder={intl.formatMessage({ id: 'modalTagInput.placeholder' })}
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
    </Modal>
  );
}
