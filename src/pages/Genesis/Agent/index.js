import styles from './index.less';
import MyAgent from './components/MyAgen';
import { useState } from 'react';
import Repo from './components/Repo';
import Document from './components/Document';
import About from './components/About';
import { Divider } from 'antd';
import { Redirect, useModel, useIntl } from 'umi';

export default function Agent() {
  const [currNav, setCurrNav] = useState('agent');
  const { initialState } = useModel('@@initialState');
  const { formatMessage } = useIntl();

  const { isLessee } = initialState || {};
  const nav = [
    {
      name: formatMessage({ id: 'agent.nav.myAiAgent' }),
      path: '/genesis/agent',
      label: 'agent',
    },
  ];

  if (!isLessee) return <Redirect to="/genesis/dashboard" />;

  return (
    <main className={styles['agent-wrapper']}>
      <section className={styles['header-wrapper']}>
        <header>
          <h1>{formatMessage({ id: 'agent.header.title' })}</h1>
          <Divider type="vertical" className={styles['line']} />
          <span>
            <p>{formatMessage({ id: 'agent.header.subtitle1' })}</p>
            <p>{formatMessage({ id: 'agent.header.subtitle2' })}</p>
          </span>
        </header>
      </section>
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
