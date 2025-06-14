import { useState } from 'react';
import styles from './index.less';
import { Avatar, Divider } from 'antd';
import Chat from './components/Chats';
import DetailModal from './components/Chats/DetailModal';
import NewInfo from './components/Chats/NewInfo';
import { useLocation } from 'umi';
import { onNavigate } from '../../utils';
import { mockAgents } from '../../mock';

export default function TryChat() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { from, agent } = location.state || {};
  const onOpen = () => {
    setIsOpen(true);
  };
  console.log(agent);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const onNewsOpen = () => {
    setIsNewsOpen(true);
  };

  return (
    <main className={styles['try-wrapper']}>
      <header className={styles['try-header']}>
        <div
          className={styles['btn-back']}
          onClick={() => onNavigate(from, location.pathname)}
        >
          <i className="iconfont icon-pre" /> Back
        </div>
        <Divider type="vertical" className={styles['divider']} />
        <div className={styles['box']}>
          <Avatar icon={<img src={agent.icon} />} />
          <div className={styles['icon']} onClick={onNewsOpen}>
            <i className="iconfont icon-menu">&#xe63f;</i>
          </div>
          <div>
            <span className={styles['title']}>FinChat AI</span>
            <span className={styles['title-sm']}>New Chat</span>
          </div>{' '}
        </div>
        <span className={styles['detail']} onClick={onOpen}>
          Detail
          <i className="iconfont icon-down" />
        </span>
        <DetailModal onOpen={onOpen} isOpen={isOpen} setIsOpen={setIsOpen} />
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
