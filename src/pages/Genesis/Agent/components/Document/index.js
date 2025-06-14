import styles from './index.less';
import EmptyCard from './components/EmptyCard';
import { mockAgents } from '../../mock';
import AgentCard from '../AgentCard/AgentCard';
export default function Document() {
  return (
    <main className={styles['doc-wrapper']}>
      <EmptyCard />
      {/* <p className={styles['gradient-text']}>
        Or explore AI agents created by the community
      </p>
      <div className={styles['agent-cards']}>
        {mockAgents.map((agent) => (
          <AgentCard key={agent.id} {...agent} path={'agent/try_chat'} />
        ))}
      </div> */}
    </main>
  );
}
