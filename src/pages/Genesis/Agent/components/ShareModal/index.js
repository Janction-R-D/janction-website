import { Modal, Input, Button, message, Tag } from 'antd';
import {
  CopyOutlined,
  ShareAltOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { copy } from '@/utils/lang';

export default function ShareModal({ visible, onClose, shareUrl, agent }) {
  const handleCopy = async () => {
    if (!shareUrl) {
      message.error('Failed to copy the link');
      return;
    }
    copy(shareUrl);
  };

  return (
    <Modal
      className={styles.customModal}
      open={visible}
      footer={null}
      onCancel={onClose}
      centered
      closable={false}
    >
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.title}>
            <ShareAltOutlined className={styles.icon} />
            Share Agent
          </span>
          <CloseOutlined onClick={onClose} className={styles.closeIcon} />
        </div>

        <section className={styles.bodyContent}>
          <img src={agent?.icon} alt="agent" className={styles.agentImage} />

          <div className={styles.agentInfo}>
            <p className={styles.agentName}>Agent Name : {agent?.title}</p>
            {agent?.tags?.length > 0 && (
              <div className={styles.tagsContainer}>
                {agent.tags.map((tag, index) => (
                  <Tag key={index} className={styles.tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
            <div className={styles.content}>
              <Input
                className={styles.linkInput}
                value={shareUrl}
                readOnly
                bordered={false}
              />
              <Button
                icon={<CopyOutlined />}
                onClick={handleCopy}
                type="primary"
                className={styles['connect-btn']}
              >
                Copy
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
}
