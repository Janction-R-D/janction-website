import { Button, Card } from 'antd';
import styles from './index.less';
import { mockAgents } from '../../mock';
import AgentCard from '../AgentCard/AgentCard';
import { onNavigate } from '../../utils';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchAgent } from '@/services/genesis/agents';
import EmptyCard from './EmptyCard';
// import IconmeModal from '../IncomeModal';
// import PurchaseModal from '../PurchaseModal';

export default function MyAgent() {
  // const [open, setOpen] = useState(true);
  // const onOk = () => {
  //   setOpen(false);
  // };
  const [list, setList] = useState([]);
  useEffect(() => {
    getAgents();
  }, []);
  const getAgents = async () => {
    try {
      const res = await fetchAgent();
      setList(res || []);
    } catch (error) {
      console.log(error);
    }
  };
  const mappedAgents = list?.map((agent) => ({
    id: agent.id,
    title: agent.name,
    icon: agent.cover,
    tags: agent.tags,
    file_id: agent.knowledge_base_id,
    description: agent.description,
  }));

  return (
    <main>
      <section className={styles['header-container']}>
        {!mappedAgents.length && (
          <div>
            <p className={styles['title__text']}>
              Apologies, you haven't created your own AI agent yet.
            </p>

            <span className={styles['title__desc']}>
              Simply upload your knowledge base to create your own AI agent.
            </span>
          </div>
        )}
        {!!mappedAgents.length && (
          <div>
            <p className={styles['title__text']}>
              Created Agents ({mappedAgents?.length})
            </p>
          </div>
        )}
        <div>
          <Button
            className={styles['submitButton']}
            onClick={() => onNavigate('agent/create')}
          >
            Create My Agent
            <span className={styles.icon_rotate}>
              <ArrowUpOutlined />
            </span>
          </Button>
        </div>
      </section>
      <main className={styles['content']}>
        {!!mappedAgents.length && (
          <Card className={styles['agents']}>
            <header className={styles['head']}>
              <i className="iconfont icon-next_page" /> Or explore AI agents
              created by the community
            </header>
            <div className={styles['agent-cards']}>
              {mappedAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  {...agent}
                  path={'/genesis/agent/try_chat'}
                  getAll={getAgents}
                />
              ))}
            </div>
          </Card>
        )}
        {!mappedAgents.length && <EmptyCard />}
      </main>
      {/* <PurchaseModal onOpen={onOk} setIsOpen={setOpen} isOpen={open} /> */}
    </main>
  );
}
