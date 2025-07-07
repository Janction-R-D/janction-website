import styles from './index.less';
import { onNavigate } from '../../utils';
import { fetchAgentDelete, fetchAgentStatus } from '@/services/genesis';
import { message } from 'antd';
import { history } from 'umi';
import { fetchJoinAgent } from '@/services/genesis/agents';
import ShareModal from '../ShareModal';
import { useState } from 'react';
import { useAccount } from 'wagmi';
export default function AgentCard({
  title,
  icon,
  tags,
  path,
  id,
  description,
  getAll,
  knowledge_id,
  user_id,
}) {
  const { address } = useAccount();
  const agent = { title, icon, tags, id, description };

  const [visible, setVisible] = useState(false);
  const [shareUrl, setShareUrl] = useState(
    `${location.origin}/genesis/agent/try_chat?share=true&agent_id=${id}`,
  );
  const onStatus = async () => {
    try {
      message.info({
        content: 'Accessing the Agent AI...',
        key: 'agent',
        duration: 0,
      });
      const res = await fetchAgentStatus(knowledge_id);

      if (['running'].includes(res?.parsing_doc_status)) {
        message.info(
          'Still checking your document! \n Please wait and try again later',
        );
        return;
      }
      if (!['success'].includes(res?.parsing_doc_status)) {
        message.error('Operation failed!');
        return;
      }
      message.success('AI accessed successfully');
      onNavigate(path, location.pathname, agent);
    } catch (error) {
      console.log(error);
    } finally {
      message.destroy('agent');
    }
  };

  const onDelete = async () => {
    try {
      message.info({
        content: 'Deleting Agent...',
        key: 'delete-agent',
        duration: 0,
      });
      const res = await fetchAgentDelete(id);
      message.success('Agent deleted successfully!');
      getAll();
    } catch (error) {
      console.log(error);
    } finally {
      message.destroy('delete-agent');
    }
  };
  const onShare = async () => {
    setVisible(true);
  };
  const onDetails = () => {
    history.push('/genesis/agent/file_manager', { knowledge_id });
  };
  console.log(user_id === address);
  return (
    <div className={styles.card}>
      <div className={styles.overlay_up}>
        {user_id === address && (
          <>
            <span onClick={onDelete} className={styles['onDelete']}>
              <i className="iconfont icon-delete" />
            </span>
            <span onClick={onDetails} className={styles['details']}>
              <i className="iconfont icon-info" />
              Details
            </span>
            <span onClick={onShare} className={styles['share']}>
              <i className="iconfont icon-share" />
              Share
            </span>
          </>
        )}
        <ShareModal
          visible={visible}
          onClose={() => setVisible(false)}
          shareUrl={shareUrl}
          agent={agent}
        />
      </div>
      <img className={styles.image} src={icon} alt="FinChat AI" />
      <div className={styles.overlay}>
        <div className={styles.description}>
          <div className={styles.description_left}>
            <div className={styles.title}>{title}</div>
          </div>
          <div>
            <div className={styles.try} onClick={onStatus}>
              Chat
              <span className={styles.icon}>
                <i
                  className="iconfont icon-next"
                  style={{ fontSize: '12px' }}
                />
              </span>
            </div>
          </div>
        </div>
        <div className={styles['buttons']}>
          {tags?.map((btn, i) => (
            <div key={i} className={styles.btn}>
              {btn}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
