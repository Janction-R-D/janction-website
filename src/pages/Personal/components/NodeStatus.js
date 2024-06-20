import Icons from '@/components/Icons';
import SearchInput from '@/components/SeachInput';
import { useState } from 'react';
import styles from './index.less';

const brandList = [
  { id: 1, name: 'AMD' },
  { id: 2, name: 'NVDIA' },
  { id: 3, name: 'APPLE' },
];
const NodeStatus = (props) => {
  const [sysList, setSysList] = useState([
    { id: 1, name: 'Docker (recommend)' },
    { id: 2, name: 'MAC' },
    { id: 3, name: 'Linux' },
    { id: 4, name: 'Windows' },
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
  const [gpuList, setGpuList] = useState([
    {
      name: 'GPU 1',
      status: 0,
      onlineTime: 'Already online：2 hours and 30 minutes',
    },
    {
      name: 'GPU 2',
      status: 1,
      onlineTime: 'Already online：2 hours and 30 minutes',
    },
    {
      name: 'GPU 3',
      status: 0,
      onlineTime: 'Already online：2 hours and 30 minutes',
    },
    {
      name: 'GPU 4',
      status: 1,
      onlineTime: 'Already online：2 hours and 30 minutes',
    },
    {
      name: 'GPU 5',
      status: 1,
      onlineTime: 'Already online：2 hours and 30 minutes',
    },
  ]);
  const [active, setActive] = useState(brandList[0].id);
  const [activeNodeNav, setActiveNodeNav] = useState(nodeNav[0]);

  const onNodeNavClick = (nav) => {
    setActiveNodeNav(nav);
  };

  const onBrandChange = (brandId) => {
    setActive(brandId);
  };

  return (
    <div className={styles['gpu']}>
      <section className={styles['gpu-check']}>
        <hgroup>
          <h1>Check your GPU</h1>
          <span>This is the prompt text</span>
        </hgroup>
        <div className={styles['gpu-container']}>
          <nav>
            {brandList.map((item) => (
              <button
                key={item.id}
                className={`hvr-shrink ${
                  active == item.id && styles['active']
                }`}
                onClick={() => onBrandChange(item.id)}
              >
                {item.name}
              </button>
            ))}
          </nav>
          <div className={styles['gpu-list']}>
            <ul>
              {gpuList.map((item) => (
                <li key={item.name}>
                  <div className={styles['icon-box']}>
                    <img src={require('@/assets/svgs/cpu.svg')} />
                  </div>
                  <div className={styles['info']}>
                    <div className={styles['name']}>GPU</div>
                    <div
                      className={`${styles['status']} ${
                        item.status && styles['active']
                      }`}
                    >
                      on-line
                    </div>
                  </div>
                  <div className={styles['online-time']}>{item.onlineTime}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={styles['node-logs']}>
        <hgroup>
          <h1>Run Command</h1>
        </hgroup>
        <div className={styles['node-container']}>
          <nav>
            {nodeNav.map((item) => (
              <button
                key={item.value}
                className={
                  activeNodeNav.value == item.value && styles['active']
                }
                onClick={() => onNodeNavClick(item)}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className={styles['code-area']}>(code area)</div>
      </section>
    </div>
  );
};

export default NodeStatus;
