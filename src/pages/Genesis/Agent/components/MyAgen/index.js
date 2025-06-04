import { Button, Card } from 'antd';
import styles from './index.less';
import { mockAgents } from '../../mock';
import AgentCard from '../AgentCard/AgentCard';
import { onNavigate } from '../../utils';
export default function MyAgent() {
  return (
    <main>
      <section className={styles['header-container']}>
        <div>
          <p className={styles['title__text']}>
            Apologies, you haven't created your own AI agent yet.
          </p>
          <span className={styles['title__desc']}>
            Simply upload your knowledge base to create your own AI agent.
          </span>
        </div>
        <div>
          <Button
            className={styles['connect-btn']}
            onClick={() => onNavigate('agent/create')}
          >
            Create My Agent
          </Button>
        </div>
      </section>
      <main className={styles['content']}>
        <Card className={styles['agents']}>
          <header className={styles['head']}>
            <i className="iconfont icon-next_page" /> Or explore AI agents
            created by the community
          </header>
          <div className={styles['agent-cards']}>
            {mockAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                {...agent}
                path={'/genesis/agent/try_chat'}
              />
            ))}
          </div>
        </Card>
      </main>
    </main>
  );
}
