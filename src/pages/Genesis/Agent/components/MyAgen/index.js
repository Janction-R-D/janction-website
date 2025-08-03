import { Button, Card } from 'antd';
import styles from './index.less';
import { useEffect, useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';

import { fetchAgent } from '@/services/genesis/agents';
import AgentCard from '../AgentCard/AgentCard';
import { onNavigate } from '../../utils';
import EmptyCard from './EmptyCard';
import LoadingCard from './LoadingCard';
// import IconmeModal from '../IncomeModal';
// import PurchaseModal from '../PurchaseModal';

export default function MyAgent() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const intl = useIntl();

  useEffect(() => {
    getAgents();
  }, []);

  const getAgents = async () => {
    try {
      setLoading(true);
      const res = await fetchAgent();
      setList(res || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
    <main>
      <section className={styles['header-container']}>
        {!mappedAgents.length && (
          <div className={styles['uncreated']}>
            <p className={styles['title__text']}>
              {intl.formatMessage({ id: 'myAgent.header.noAgentTitle' })}
            </p>
            <span className={styles['title__desc']}>
              {intl.formatMessage({ id: 'myAgent.header.noAgentDesc' })}
            </span>
          </div>
        )}
        {!!mappedAgents.length && (
          <div>
            <p className={styles['title__text']}>
              {intl.formatMessage(
                { id: 'myAgent.header.createdAgents' },
                { count: mappedAgents.length },
              )}
            </p>
          </div>
        )}
        <div>
          <Button
            className={styles['submitButton']}
            onClick={() => onNavigate('agent/create')}
          >
            {intl.formatMessage({ id: 'myAgent.header.buttonText' })}
            <span className={styles.icon_rotate}>
              <ArrowUpOutlined />
            </span>
          </Button>
        </div>
      </section>

      <main className={styles['content']}>
        {!loading && !!mappedAgents.length && (
          <Card className={styles['agents']}>
            <header className={styles['head']}>
              <i className="iconfont icon-next_page" />
              {intl.formatMessage({ id: 'myAgent.header.exploreOthers' })}
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
        {!loading && !mappedAgents.length && <EmptyCard />}
        {loading && <LoadingCard />}
      </main>

      {/* <PurchaseModal onOpen={onOk} setIsOpen={setOpen} isOpen={open} /> */}
    </main>
  );
}
