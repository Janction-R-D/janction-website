import styles from '../index.less';
import { SYSTEM_LIST } from '@/constant';
import AwardChart from './AwardChart';
import JactionSelect from '@/components/JactionSelect';
import { useEffect, useState } from 'react';
import storage from '@/utils/storage';
import { formatThouNumber } from '@/utils/numeric';

import {
  fetchNodeInfos,
  fetchNodeLogs,
  MappingNodeStatus,
  fetchDailyPointStatistic,
  fetchPointStatistic,
} from '../../../services/personal';
import { useAccount } from 'wagmi';
import { formatDateYMD, formatTime } from '@/utils/datetime';

const Dashboard = (props) => {
  const [nodeInfos, setNodeInfos] = useState();
  const [nodeLogs, setNodeLogs] = useState();
  const [pointStatistic, setPointStatistic] = useState();
  const [dailyPointStatistic, setDailyPointStatistic] = useState();
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      handleFetchNodeInfos();
      handleFetchNodeLogs();
      handleFetchPointStatistic();
      handleFetchDailyPointStatistic();
    }
  }, [address]);

  const handleFetchNodeInfos = async () => {
    const token = storage.get('token');
    const nodeInfos = await fetchNodeInfos(token, {
      wallet_address: address,
    });
    console.log('nodeInfos:', nodeInfos);
    setNodeInfos(nodeInfos);
  };

  const handleFetchNodeLogs = async () => {
    const token = storage.get('token');
    const nodeLogs = await fetchNodeLogs(token, {
      wallet_address: address,
    });
    console.log('nodeLogs:', nodeLogs);
    setNodeLogs(nodeLogs);
  };

  const handleFetchPointStatistic = async () => {
    const token = storage.get('token');
    const pointStatistic = await fetchPointStatistic({
      wallet_address: address,
    });
    console.log('pointStatistic:', pointStatistic);
    setPointStatistic(pointStatistic);
  };

  const handleFetchDailyPointStatistic = async () => {
    const token = storage.get('token');
    const dailyPointStatistic = await fetchDailyPointStatistic({
      wallet_address: address,
      days: 7,
    });
    console.log('dailyPointStatistic:', dailyPointStatistic);
    setDailyPointStatistic(dailyPointStatistic);
  };

  const totalPoint = formatThouNumber(pointStatistic.Point);
  console.log(totalPoint);
  return (
    <>
      <div className={styles['total']}>
        <div className={styles['left']}>
          <i className={styles['money']}></i>
          <div className={styles['value']}>
            <span className={styles['thousand']}>{totalPoint.thousands}</span>
            <span className={styles['hundred']}>{totalPoint.hundreds}</span>
            <span className={styles['decimals']}>{totalPoint.decimal}</span>
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
                <span>
                  {dailyPointStatistic && dailyPointStatistic[6].point}
                </span>
                <span className={styles['unit']}>Points</span>
              </div>
            </div>
            <div className={styles['item']}>
              <div className={styles['label']}>Last Day</div>
              <div className={styles['value']}>
                <span>
                  {dailyPointStatistic && dailyPointStatistic[5].point}
                </span>
                <span className={styles['unit']}>Points</span>
              </div>
            </div>
            <div className={styles['item']}>
              <div className={styles['label']}>Total</div>
              <div className={styles['value']}>
                <span>{pointStatistic && pointStatistic.point}</span>
                <span className={styles['unit']}>Points</span>
              </div>
            </div>
          </div>
          <div className={styles['chart']}>
            <AwardChart data={dailyPointStatistic} />
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
                {nodeInfos &&
                  nodeInfos.map((nodeInfo) => (
                    <li>
                      <div className={styles['nvidia']}>
                        <i className="iconfont icon-nvidia"></i>
                      </div>
                      <div>
                        <div className={styles['name']}>Nvidia RTX 4090 Ti</div>
                        <div className={styles['status']}>
                          <div className={styles['system']}>
                            <div className={styles['icon']}>
                              <i
                                className={`iconfont icon-${nodeInfo.node_type}`}
                              ></i>
                            </div>
                            <span>{nodeInfo.node_type}</span>
                          </div>
                          <div className={styles['online']}>
                            <i></i>
                            <span>
                              {MappingNodeStatus[nodeInfo.node_status]}
                            </span>
                          </div>
                        </div>
                        <div className={styles['extra']}>
                          <div>
                            <span className={styles['label']}>Node ID</span>
                            <span className={styles['value']}>
                              {nodeInfo.node_id}
                            </span>
                          </div>
                          <div>
                            <span className={styles['label']}>Online Time</span>
                            <span className={styles['value']}>
                              {formatTime(nodeInfo.heartbeat_count * 5)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
            <section className={styles['activity']}>
              <h2>Activity</h2>
              <ul>
                {nodeLogs &&
                  nodeLogs.map((nodeLog) => (
                    <li>
                      <span className={styles['date']}>
                        {formatDateYMD(nodeLog.timestamp)}
                      </span>
                      <span className={styles['records']}>
                        {nodeLog.action}
                      </span>
                    </li>
                  ))}
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
