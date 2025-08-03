import styles from './index.less';
import { onNavigate } from '../../utils';
import { fetchAgentDelete, fetchAgentStatus } from '@/services/genesis';
import { message } from 'antd';
import { history, useIntl } from 'umi';
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
  const { formatMessage } = useIntl();
  const agent = { title, icon, tags, id, description };
  const isPublic = user_id !== address;
  const [visible, setVisible] = useState(false);
  const [shareUrl, setShareUrl] = useState(
    `${location.origin}/genesis/agent/try_chat?share=true&agent_id=${id}`,
  );

  const onStatus = async () => {
    try {
      message.info({
        content: formatMessage({ id: 'agentCard.accessing' }),
        key: 'agent',
        duration: 0,
      });
      const res = await fetchAgentStatus(knowledge_id);

      if (['running'].includes(res?.parsing_doc_status)) {
        message.info(formatMessage({ id: 'agentCard.checkingDoc' }));
        return;
      }
      if (!['success'].includes(res?.parsing_doc_status)) {
        message.error(formatMessage({ id: 'agentCard.failed' }));
        return;
      }
      message.success(formatMessage({ id: 'agentCard.success' }));
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
        content: formatMessage({ id: 'agentCard.deleting' }),
        key: 'delete-agent',
        duration: 0,
      });
      const res = await fetchAgentDelete(id);
      message.success(formatMessage({ id: 'agentCard.deleted' }));
      getAll();
    } catch (error) {
      console.log(error);
    } finally {
      message.destroy('delete-agent');
    }
  };

  const onShare = () => {
    setVisible(true);
  };

  const onDetails = () => {
    history.push('/genesis/agent/file_manager', { knowledge_id });
  };

  return (
    <div className={styles.card}>
      {isPublic && (
        <div className={styles.ribbonWrapper}>
          <span className={styles.ribbon}>
            {formatMessage({ id: 'agentCard.public' })}
          </span>
        </div>
      )}
      <div className={styles.overlay_up}>
        {!isPublic && (
          <>
            <span onClick={onDelete} className={styles['onDelete']}>
              <i className="iconfont icon-delete" />
            </span>
            <span onClick={onDetails} className={styles['details']}>
              <i className="iconfont icon-info" />
              {formatMessage({ id: 'agentCard.details' })}
            </span>
            <span onClick={onShare} className={styles['share']}>
              <i className="iconfont icon-share" />
              {formatMessage({ id: 'agentCard.share' })}
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
              {formatMessage({ id: 'agentCard.chat' })}
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
