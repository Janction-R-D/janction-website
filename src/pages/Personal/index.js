import Icons from '@/components/Icons';
import { useState } from 'react';
import { history } from 'umi';
import DeployNode from './components/DeployNode';
import Header from './components/Header';
import Overview from './components/Overview';
import styles from './index.less';

const navList = [
  { name: 'Deploy Node', key: 0, icon: 'branch' },
  { name: 'Node Status', key: 1, icon: 'node-status' },
  { name: 'Points', key: 2, icon: 'points' },
];

const Personal = (props) => {
  const [curNav, setCurNav] = useState(navList[0]);

  const onNavChange = (nav) => {
    setCurNav(nav);
  };

  return (
    <div className={styles['personal-container']}>
      <div>
        <nav>
          <hgroup className="df ai_c jc_sb">
            <img
              src={require('@/assets/images/icons/jun-icon.png')}
              alt=""
              width="52"
              height="52"
            />
            <Icons
              name="exit"
              className="poi"
              onClick={() => {
                history.goBack();
              }}
            />
          </hgroup>
          <ul>
            {navList.map((item) => (
              <li
                key={item.name}
                className={`df ai_c ${
                  item.key == curNav?.key && styles['active']
                }`}
                onClick={() => onNavChange(item)}
              >
                <div className={styles['icon-box']}>
                  <Icons name={item.icon} width={34} height={34} />
                </div>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles['content']}>
          <Header />
          {curNav.key == 0 && <DeployNode />}
          {curNav.key == 2 && <Overview />}
        </div>
      </div>
    </div>
  );
};

export default Personal;
