import Icons from '@/components/Icons';
import { useState } from 'react';
import DeployNode from './components/DeployNode';
import Header from './components/Header';
import NodeStatus from './components/NodeStatus';
import Points from './components/Points';
import styles from './index.less';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const navList = [
  { name: 'Dashboard', key: 0, icon: 'dashboard' },
  { name: 'Deploy Node', key: 1, icon: 'nodes' },
];

const Personal = (props) => {
  const [curNav, setCurNav] = useState(navList[0]);
  const [fold, setFold] = useState(false);

  const [sysList, setSysList] = useState([
    { id: 1, name: 'Android', icon: 'android' },
    { id: 2, name: 'MAC', icon: 'apple' },
    { id: 3, name: 'Linux', icon: 'linux' },
    { id: 4, name: 'Windows', icon: 'window' },
  ]);

  const foldHandle = () => {
    setFold(!fold);
  };

  const onNavChange = (nav) => {
    setCurNav(nav);
  };

  return (
    <div className={styles['personal-container']}>
      <aside className={fold && styles['fold']}>
        <header>
          <img
            className={styles['logo-name']}
            src={require('@/assets/images/icons/logo_name.png')}
          />
          <img
            className={styles['logo']}
            src={require('@/assets/svgs/logo.svg')}
          />
          <i className={styles['fold']} onClick={foldHandle}></i>
        </header>
        <nav>
          {navList.map((item) => (
            <div
              key={item.key}
              className={curNav.key == item.key && styles['active']}
              onClick={() => onNavChange(item)}
            >
              <i className={styles[item.icon]} />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
        <div className={styles['footer']}>
          <h1>JANCTION</h1>
          <p>©2024 janction.io</p>
          <i className={styles['unfold']} onClick={foldHandle}></i>
        </div>
      </aside>
      <main>
        <header>
          <div className={styles['links']}>
            <i className={styles['doc']}></i>
            <i className={styles['discord']}></i>
            <i className={styles['x']}></i>
            <i className={styles['github']}></i>
          </div>
          <ConnectButton></ConnectButton>
        </header>
        <div className={styles['content']}>
          <div className={styles['total']}>
            <div className={styles['left']}>
              <i className={styles['money']}></i>
              <div className={styles['value']}>
                <span className={styles['thousand']}>65</span>
                <span className={styles['hundred']}>,546</span>
                <span className={styles['decimals']}>.24</span>
              </div>
            </div>
            <div className={styles['right']}>
              {sysList.map((item) => (
                <div className={styles['item']} key={item.id}>
                  <i className={styles[item.icon]}></i>
                  <div>
                    <div className={styles['label']}>{item.name}</div>
                    <div className={styles['value']}>220</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles['bottom-content']}>
            <div className={styles['award']}>
              <div className={styles['header']}>
                <h1>Award</h1>
                <div className={styles['select']}>
                  <span>All</span>
                  <i className={styles['fold']}></i>
                </div>
              </div>
              <div className={styles['points-total']}>
                <div className={styles['item']}>
                  <div className={styles['label']}>Today</div>
                  <div className={styles['value']}>
                    <span>234.21</span>
                    <span className={styles['unit']}>Points</span>
                  </div>
                </div>
                <div className={styles['item']}>
                  <div className={styles['label']}>Last Day</div>
                  <div className={styles['value']}>
                    <span>324.33</span>
                    <span className={styles['unit']}>Points</span>
                  </div>
                </div>
                <div className={styles['item']}>
                  <div className={styles['label']}>Total</div>
                  <div className={styles['value']}>
                    <span>324.33</span>
                    <span className={styles['unit']}>Points</span>
                  </div>
                </div>
              </div>
              <div className={styles['chart']}></div>
            </div>
            <div className={styles['nodes']}>
              <div className={styles['header']}>
                <h1>My Nodes</h1>
                <div className={styles['select']}>
                  <span>Windows</span>
                  <i className={styles['fold']}></i>
                </div>
              </div>
              <div className={styles['info']}>
                <section className={styles['list']}>
                  <h2>List</h2>
                  <ul>
                    <li>
                      <i></i>
                      <div>
                        <div className={styles['name']}>Nvidia RTX 4090 Ti</div>
                        <div className={styles['status']}>
                          <div className={styles['system']}>
                            <i></i>
                            <span>Windows</span>
                          </div>
                          <div className={styles['online']}>
                            <i></i>
                            <span>Online</span>
                          </div>
                        </div>
                        <div className={styles['extra']}>
                          <div>
                            <span className={styles['label']}>Node ID</span>
                            <span className={styles['value']}>
                              a32u-2deg-3r3f-223c
                            </span>
                          </div>
                          <div>
                            <span className={styles['label']}>Online Time</span>
                            <span className={styles['value']}>120min</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <i></i>
                      <div>
                        <div className={styles['name']}>Nvidia RTX 4090 Ti</div>
                        <div className={styles['status']}>
                          <div className={styles['system']}>
                            <i></i>
                            <span>Windows</span>
                          </div>
                          <div className={styles['online']}>
                            <i></i>
                            <span>Online</span>
                          </div>
                        </div>
                        <div className={styles['extra']}>
                          <div>
                            <span className={styles['label']}>Node ID</span>
                            <span className={styles['value']}>
                              a32u-2deg-3r3f-223c
                            </span>
                          </div>
                          <div>
                            <span className={styles['label']}>Online Time</span>
                            <span className={styles['value']}>120min</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </section>
                <section className={styles['activity']}>
                  <h2>Activity</h2>
                  <ul>
                    <li>
                      <span className={styles['date']}>12-56-48</span>
                      <span className={styles['records']}>
                        Login in Windows
                      </span>
                    </li>
                    <li>
                      <span className={styles['date']}>12-56-48</span>
                      <span className={styles['records']}>
                        Login in Windows
                      </span>
                    </li>
                  </ul>
                </section>
                <section className={styles['history']}>
                  <h2>History</h2>
                  <ul>
                    <li>
                      <span className={styles['date']}>12-56-48</span>
                      <span className={styles['records']}>
                        Login in Windows
                      </span>
                    </li>
                    <li>
                      <span className={styles['date']}>12-56-48</span>
                      <span className={styles['records']}>
                        Login in Windows
                      </span>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Personal.wrappers = ['@/wrappers/auth'];
export default Personal;
