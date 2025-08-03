import { useEffect, useState } from 'react';
import styles from './index.less';
import { Avatar, Divider, message } from 'antd';
import Chat from './components/Chats';
import DetailModal from './components/Chats/DetailModal';
import NewInfo from './components/Chats/NewInfo';
import { Redirect, useLocation, useIntl } from 'umi';
import { onNavigate } from '../../utils';
import { fetchJoinAgent } from '@/services/genesis/agents';

export default function TryChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const location = useLocation();
  const intl = useIntl();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isShared = searchParams.get('share') === 'true';
    const agentId = searchParams.get('agent_id');

    if (isShared && agentId) {
      accesSharedAgent(agentId);
    }
  }, []);

  const accesSharedAgent = async (id) => {
    try {
      await fetchJoinAgent(id);
    } catch (err) {
      console.log('Error :', err);
      message.error(intl.formatMessage({ id: 'tryChat.operationFailed' }));
    }
  };

  const { from, agent } = location.state || {};
  if (!agent) {
    return <Redirect to="/genesis/agent" />;
  }

  const onOpen = () => setIsOpen(true);
  const onNewsOpen = () => setIsNewsOpen(true);

  return (
    <main className={styles['try-wrapper']}>
      <header className={styles['try-header']}>
        <div
          className={styles['btn-back']}
          onClick={() => onNavigate(from, location.pathname)}
        >
          <i className="iconfont icon-pre" />
          {intl.formatMessage({ id: 'tryChat.back' })}
        </div>
        <Divider type="vertical" className={styles['divider']} />
        <div className={styles['box']}>
          <Avatar icon={<img src={agent?.icon} />} />
          <div className={styles['icon']}>
            <i className="iconfont icon-menu">&#xe63f;</i>
          </div>
          <div>
            <span className={styles['title']}>{agent.title}</span>
            <span className={styles['title-sm']}>
              {intl.formatMessage({ id: 'tryChat.newChat' })}
            </span>
          </div>
        </div>
        <span className={styles['detail']} onClick={onOpen}>
          {intl.formatMessage({ id: 'tryChat.detail' })}
          <i className="iconfont icon-down" />
        </span>
        <DetailModal
          onOpen={onOpen}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          agent={agent}
        />
        <NewInfo
          onOpen={onNewsOpen}
          isOpen={isNewsOpen}
          setIsOpen={setIsNewsOpen}
        />
      </header>
      <Chat agent={agent} />
    </main>
  );
}
