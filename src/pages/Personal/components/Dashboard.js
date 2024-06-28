import styles from '../index.less';
import { SYSTEM_LIST } from '@/constant';
import AwardChart from './AwardChart';
import JactionSelect from '@/components/JactionSelect';

const Dashboard = (props) => {
  return (
    <>
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
          {SYSTEM_LIST.map((item) => (
            <div className={styles['item']} key={item.id}>
              <div className={styles['icon']}>
                <i className={`hvr-buzz iconfont icon-${item.icon}`}></i>
              </div>
              <div>
                <div className={styles['label']}>{item.label}</div>
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
            <JactionSelect
              value="all"
              options={[{ value: 'all', label: 'All' }]}
            />
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
          <div className={styles['chart']}>
            <AwardChart />
          </div>
        </div>
        <div className={styles['nodes']}>
          <div className={styles['header']}>
            <h1>My Nodes</h1>
            <JactionSelect value="window" options={SYSTEM_LIST} />
          </div>
          <div className={styles['info']}>
            <section className={styles['list']}>
              <h2>List</h2>
              <ul>
                <li>
                  <div className={styles['nvidia']}>
                    <i className="iconfont icon-nvidia"></i>
                  </div>
                  <div>
                    <div className={styles['name']}>Nvidia RTX 4090 Ti</div>
                    <div className={styles['status']}>
                      <div className={styles['system']}>
                        <div className={styles['icon']}>
                          <i className="iconfont icon-windows"></i>
                        </div>
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
                  <div className={styles['nvidia']}>
                    <i className="iconfont icon-nvidia"></i>
                  </div>
                  <div>
                    <div className={styles['name']}>Nvidia RTX 4090 Ti</div>
                    <div className={styles['status']}>
                      <div className={styles['system']}>
                        <div className={styles['icon']}>
                          <i className="iconfont icon-windows"></i>
                        </div>
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
                  <span className={styles['records']}>Login in Windows</span>
                </li>
                <li>
                  <span className={styles['date']}>12-56-48</span>
                  <span className={styles['records']}>Login in Windows</span>
                </li>
              </ul>
            </section>
            <section className={styles['history']}>
              <h2>History</h2>
              <ul>
                <li>
                  <span className={styles['date']}>12-56-48</span>
                  <span className={styles['records']}>Login in Windows</span>
                </li>
                <li>
                  <span className={styles['date']}>12-56-48</span>
                  <span className={styles['records']}>Login in Windows</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.wrappers = ['@/wrappers/auth'];
export default Dashboard;
