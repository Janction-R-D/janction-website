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
}) {
  const agent = { title, icon, tags, id, description };

  const onStatus = async () => {
    try {
      const res = await fetchAgentStatus(id);
      if (!res?.id) {
        message.error('Operation failed!');
        return;
      }
      onNavigate(path, location.pathname, agent);
    } catch (error) {
      console.log(error);

      notification.info({
        message: `Notification Info`,
        description: error,
        placement: 'bottomLeft',
        duration: 5,
      });
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
