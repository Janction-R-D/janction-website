import styles from './index.less';
import { onNavigate } from '../../utils';
import { fetchAgentDelete, fetchAgentStatus } from '@/services/genesis';
import { message, notification } from 'antd';
export default function AgentCard({
  title,
  icon,
  tags,
  path,
  id,
  description,
  getAll,
  knowledge_id,
}) {
  const agent = { title, icon, tags, id, description };

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
      const res = await fetchAgentDelete(id);
      message.success('Agent deleted successfully!');
      getAll();
    } catch (error) {
      console.log(error);
      notification.info({
        message: `Notification Info`,
        description: error,
        placement: 'topLeft',
        duration: 5,
      });
    }
  };
  return (
    <div className={styles.card}>
      <span onClick={onDelete} className={styles['onDelete']}>
        <i className="iconfont icon-delete" />
      </span>
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
