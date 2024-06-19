import Icons from '@/components/Icons';
import SearchInput from '@/components/SeachInput';
import { useState } from 'react';
import styles from './index.less';

const History = (props) => {
  const [nodeList, setNodeList] = useState([
    {
      name: 'Node 1',
      date: '2024/05/05',
      onlineTime: '30 minutes',
    },
    {
      name: 'Node 2',
      date: '2024/05/05',
      onlineTime: '30 minutes',
    },
    {
      name: 'Node 3',
      date: '2024/05/05',
      onlineTime: '30 minutes',
    },
    {
      name: 'Node 4',
      date: '2024/05/05',
      onlineTime: '30 minutes',
    },
    {
      name: 'Node 5',
      date: '2024/05/05',
      onlineTime: '30 minutes',
    },
  ]);
  const [nodeNav, setNodeNav] = useState([
    {
      name: 'Node 1',
      value: 1,
    },
    {
      name: 'Node 2',
      value: 2,
    },
    {
      name: 'Node 3',
      value: 3,
    },
  ]);
  const [activeNodeNav, setActiveNodeNav] = useState(nodeNav[0]);

  const onNodeNavClick = (nav) => {
    setActiveNodeNav(nav);
  };

  return (
    <section className={styles['history']}>
      <hgroup>
        <h1>History</h1>
        <span>This is the prompt text</span>
      </hgroup>
      <div className={styles['node-list']}>
        <nav>
          {nodeNav.map((item) => (
            <button
              key={item.value}
              className={activeNodeNav.value == item.value && styles['active']}
              onClick={() => onNodeNavClick(item)}
            >
              {item.name}
            </button>
          ))}
        </nav>
        <ul>
          {nodeList.map((item) => (
            <li key={item.name}>
              <div className={styles['icon-box']}>
                <img src={require('@/assets/svgs/node.svg')} />
              </div>
              <div className={styles['info']}>
                <div className={styles['name']}>{item.name}</div>
                <div className={styles['subname']}>{item.date}</div>
              </div>
              <div className={styles['online-time']}>{item.onlineTime}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default History;
