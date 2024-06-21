import Icons from '@/components/Icons';
import { useState } from 'react';
import DeployNode from './components/DeployNode';
import Header from './components/Header';
import NodeStatus from './components/NodeStatus';
import Points from './components/Points';
import styles from './index.less';

const navList = [
  { name: 'Deploy Node', key: 0, icon: 'branch' },
  { name: 'Node Status', key: 1, icon: 'node-status' },
  { name: 'Points', key: 2, icon: 'points' },
];

const Personal = (props) => {
  const [curNav, setCurNav] = useState(navList[0]);
  const [fold, setFold] = useState(false);

  const foldHandle = () => {
    setFold(!fold);
  };

  const onNavChange = (nav) => {
    setCurNav(nav);
  };

  return (
    <div className={styles['personal-container']}>
      <div>
        <nav className={fold && styles['fold']}>
          <hgroup className="df ai_c jc_sb">
            <img
              src={require('@/assets/images/icons/jun-icon.png')}
              alt=""
              onClick={foldHandle}
              className="hvr-wobble-top"
            />
            <Icons
              name="exit"
              className="poi hvr-wobble-bottom"
              onClick={foldHandle}
            />
          </hgroup>
          <ul className={fold && styles['fold']}>
            {navList.map((item) => (
              <li
                key={item.name}
                className={`df ai_c ${
                  item.key == curNav?.key && styles['active']
                }`}
                onClick={() => onNavChange(item)}
              >
                <div className={['hvr-grow', styles['icon-box']].join(' ')}>
                  <Icons name={item.icon} className={styles['nav-icon']} />
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
        <section className={fold && styles['fold']}>
          {/* <div className={styles['shadow']}>
            <div className={styles['shadow-1']}></div>
            <div className={styles['shadow-2']}></div>
            <div className={styles['shadow-3']}></div>
          </div> */}
          <div className={styles['content']}>
            <Header />
            {curNav.key == 0 && <DeployNode />}
            {curNav.key == 1 && <NodeStatus />}
            {curNav.key == 2 && <Points />}
          </div>
        </section>
      </div>
    </div>
  );
};

Personal.wrappers = ['@/wrappers/auth'];
export default Personal;
