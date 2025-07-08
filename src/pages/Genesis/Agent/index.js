import styles from './index.less';
import MyAgent from './components/MyAgen';
import { useState } from 'react';
import Repo from './components/Repo';
import Document from './components/Document';
import About from './components/About';
import { Divider } from 'antd';
import { Redirect, useModel } from 'umi';

export default function Agent() {
  const [currNav, setCurrNav] = useState('agent');
  const { initialState } = useModel('@@initialState');

  const { isLessee } = initialState || {};
  const nav = [
    { name: 'My AI Agent', path: '/genesis/agent', label: 'agent' },
    // { name: 'Repo', path: '/genesis/agent/my_repo', label: 'repo' },
    { name: 'Document', path: '/genesis/agent/my_document', label: 'doc' },
    // { name: 'About', path: '/genesis/agent/about_ai', label: 'about' },
  ];
  if (!isLessee) return <Redirect to="/genesis/dashboard"></Redirect>;
  return (
    <main className={styles['agent-wrapper']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>Agent AI</h1>
          <Divider type="vertical" className={styles['line']} />
          <span>
            <p>Easily create your </p>
            <p>Own AI agent </p>
          </span>
        </header>
      </section>{' '}
      <section className={styles['header-resources']}>
        {nav.map((item) => (
          <span
            key={item.path}
            onClick={() => setCurrNav(item.label)}
            className={`${currNav === item.label ? styles['active'] : ''}`}
          >
            {item.name}
          </span>
        ))}
      </section>
      <main className={styles['container']}>
        {currNav === 'agent' && <MyAgent />}
        {/* {currNav === 'repo' && <Repo />} */}
        {/* {currNav === 'doc' && <Document />} */}
        {/* {currNav === 'about' && <About />} */}
      </main>
    </main>
  );
}

Agent.wrappers = ['@/wrappers/auth'];
