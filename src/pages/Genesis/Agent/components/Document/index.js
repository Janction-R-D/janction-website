import { useEffect, useState } from 'react';
import styles from './index.less';
import EmptyCard from './components/EmptyCard';
import AgentCard from '../AgentCard/AgentCard';
import { fetchAgent } from '@/services/genesis/agents';
import LoadingCard from '../MyAgen/LoadingCard';
import { Card } from 'antd';
export default function Document() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAgents = async () => {
    try {
      setLoading(true);
      const res = await fetchAgent();
      const allPublicAgent = res?.filter((agent) => agent.is_public);
      setList(allPublicAgent || []);
    } catch (error) {
      console.error('[Fetch Agent Error]', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAgents();
  }, []);
  const mappedAgents = list?.map((agent) => ({
    id: agent.id,
    title: agent.name,
    icon: agent.cover,
    tags: agent.tags,
    description: agent.description,
    knowledge_id: agent.knowledge_base_id,
    user_id: agent.user_id,
  }));
  return (
    <main className={styles['doc-wrapper']}>
      <p className={styles['gradient-text']}>
        <i className="iconfont icon-next_page" /> AI agents created by the
        community
      </p>

      {loading ? (
        <LoadingCard />
      ) : mappedAgents.length === 0 ? (
        <EmptyCard />
      ) : (
        <Card className={styles['agents']}>
          <div className={styles['agent-cards']}>
            {mappedAgents.map((agent) => (
              <AgentCard key={agent.id} {...agent} path={`/agent/try_chat`} />
            ))}
          </div>
        </Card>
      )}
    </main>
  );
}
