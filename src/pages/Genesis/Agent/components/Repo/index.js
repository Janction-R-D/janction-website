import React, { useState } from 'react';
import AgentFilterNav from './components/FilterNav/FilterNav';

import styles from './index.less';
import AgentCard from '../AgentCard/AgentCard';
import { mockAgents } from '../../mock';
const POPULARITY_THRESHOLD = 500; // el margen que defines
export default function Repo() {
  const [filter, setFilter] = useState('Recommended');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getFilteredAgents = () => {
    const agents = [...mockAgents];

    if (filter === 'Popular') {
      return agents.filter((agent) => agent.popularity >= POPULARITY_THRESHOLD);
    }
    if (filter === 'Score') {
      return agents.sort((a, b) => b.score - a.score);
    }
    // default: recommended
    return agents.filter((agent) => agent.recommended);
  };

  const filteredAgents = getFilteredAgents();

  return (
    <main className={styles['repo-wrapper']}>
      <AgentFilterNav onChange={handleFilterChange} />
      <div className={styles['agent-cards']}>
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} {...agent} path={'agent/try_chat'} />
        ))}
      </div>
    </main>
  );
}
