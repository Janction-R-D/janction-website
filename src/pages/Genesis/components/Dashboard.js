import styles from '../index.less';
import { SYSTEM_LIST, SYSTEM_SELECT_LIST } from '@/constant';
import AwardChart from './AwardChart';
import JactionSelect from '@/components/JactionSelect';
import JactionEmpty from '@/components/JactionEmpty';
import { useEffect, useState, useMemo } from 'react';
import storage from '@/utils/storage';
import { formatThouNumber } from '@/utils/numeric';

import {
  fetchNodeInfos,
  fetchNodeLogs,
  MappingNodeStatus,
  fetchDailyPointStatistic,
  fetchPointStatistic,
  fetchReportHistories,
  fetchOnlineNodesCount,
  NodeStatus,
  NodeType,
} from '../../../services/personal';
import { useAccount } from 'wagmi';
import { formatDateYMD, formatTime } from '@/utils/datetime';
import { showValue } from '../../../utils/lang';

const Dashboard = (props) => {
  const [selectedSystem, setSelectedSystem] = useState('all');
  const [nodesCount, setNodesCount] = useState();
  const [nodeInfos, setNodeInfos] = useState();
  const [nodeLogs, setNodeLogs] = useState();
  const [pointStatistic, setPointStatistic] = useState();
  const [dailyPointStatistic, setDailyPointStatistic] = useState();
  const [reportHistories, setReportHistories] = useState();
  const { address } = useAccount();

  const totalPoint = useMemo(() => {
    if (pointStatistic) {
      return formatThouNumber(pointStatistic.point);
    }
  }, [pointStatistic]);

  useEffect(() => {
    if (address) {
      handleFetchOnlineNodesCount();
      handleFetchNodeInfos();
      handleFetchNodeLogs();
      handleFetchPointStatistic();
      handleFetchDailyPointStatistic();
      handleFetchReportHistories();
    }
  }, [address]);

  const handleFetchOnlineNodesCount = async () => {
    const token = storage.get('token');
    const nodesCount = await fetchOnlineNodesCount(token);
    console.log('nodesCount:', nodesCount);
    setNodesCount(nodesCount);
  };

  const handleFetchNodeInfos = async (nodeType) => {
    const nodeInfos = await fetchNodeInfos({
      wallet_address: address,
      node_type: nodeType,
    });
    console.log('nodeInfos:', nodeInfos);
    setNodeInfos(nodeInfos);
  };

  const handleFetchNodeLogs = async (nodeType) => {
    const nodeLogs = await fetchNodeLogs({
      wallet_address: address,
      node_type: nodeType,
    });
    console.log('nodeLogs:', nodeLogs);
    setNodeLogs(nodeLogs);
  };

  const handleFetchPointStatistic = async () => {
    const pointStatistic = await fetchPointStatistic({
      wallet_address: address,
    });
    console.log('pointStatistic:', pointStatistic);
    setPointStatistic(pointStatistic);
  };

  const handleFetchDailyPointStatistic = async () => {
    const dailyPointStatistic = await fetchDailyPointStatistic({
      wallet_address: address,
      days: 7,
    });
    console.log('dailyPointStatistic:', dailyPointStatistic);
    setDailyPointStatistic(dailyPointStatistic);
  };

  const handleFetchReportHistories = async () => {
    const reportHistories = await fetchReportHistories({
      wallet_address: address,
    });
    console.log('reportHistories:', reportHistories);
    setReportHistories(reportHistories);
  };

  const handleSelectSystem = (value) => {
    setSelectedSystem(value);
    const nodeType = value === 'all' ? undefined : value;
    handleFetchNodeInfos(nodeType);
    handleFetchNodeLogs(nodeType);
  };

  const renderNodeInfo = (nodeInfo) => {
    const {
      node_type,
      node_status,
      architecture_type,
      node_id,
      heartbeat_count,
      exec_info,
    } = nodeInfo;
    const isCpu = exec_info.use_cpu === 1;
    const isGpu = exec_info.use_gpu === 1;
    const mac = node_type === NodeType.MacOS;
    const android = node_type === NodeType.Android;
    const onlineText = MappingNodeStatus[node_status];
    const isOnline =
      node_status == NodeStatus.Running || node_status == NodeStatus.Available;
    return (
      <>
        <div className={styles['graphics-card']}>
          <i
            className={`iconfont icon-${isGpu ? 'nvidia' : node_type}`}
            style={{ color: isGpu ? '#76b900' : '#fff' }}
          ></i>
        </div>
        <div>
          <div className={styles['name']}>{showValue(node_type)}</div>
          <div className={styles['status']}>
            <div className={styles['system']}>
              {!(mac || android || isCpu) && (
                <div className={styles['icon']}>
                  <i className={`iconfont icon-${node_type}`}></i>
                </div>
              )}
              {/* <span>{isGpu ? showValue(node_type) : showValue("arm")}</span> */}
              <span>{showValue(architecture_type)}</span>
            </div>
            <div
              className={[styles['offline'], isOnline && styles['online']].join(
                ' ',
              )}
            >
              <i></i>
              <span>{onlineText}</span>
            </div>
          </div>
          <div className={styles['extra']}>
            <div>
              <span className={styles['label']}>Node ID</span>
              <span className={styles['value']}>{node_id}</span>
            </div>
            <div>
              <span className={styles['label']}>Online Time</span>
              <span className={styles['value']}>
                {formatTime(heartbeat_count * 5)}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={styles['total']}>
        <div className={styles['left']}>
          <div className={styles['money']}>
            <i className="iconfont icon-coin"></i>
          </div>
          <div className={styles['value']}>
            <span className={styles['thousand']}>
              {totalPoint ? totalPoint.thousands : '~'}
            </span>
            <span className={styles['hundred']}>
              {totalPoint ? totalPoint.hundreds : '~'}
            </span>
            <span className={styles['decimals']}>
              {totalPoint ? totalPoint.decimal : '~'}
            </span>
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
                <div className={styles['value']}>
                  {nodesCount ? nodesCount[item.value] : '~'}
                </div>
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
                <span>{showValue(dailyPointStatistic?.[6]?.point)}</span>
                <span className={styles['unit']}>Points</span>
              </div>
            </div>
            <div className={styles['item']}>
              <div className={styles['label']}>Last Day</div>
              <div className={styles['value']}>
                <span>{showValue(dailyPointStatistic?.[5]?.point)}</span>
                <span className={styles['unit']}>Points</span>
              </div>
            </div>
            <div className={styles['item']}>
              <div className={styles['label']}>Total</div>
              <div className={styles['value']}>
                <span>{showValue(pointStatistic?.point)}</span>
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
            <JactionSelect
              value={selectedSystem}
              options={SYSTEM_SELECT_LIST}
              onSelect={handleSelectSystem}
            />
          </div>
          <div className={styles['info']}>
            <section className={styles['list']}>
              <h2>List</h2>
              <ul>
                {(nodeInfos || []).map((nodeInfo, index) => (
                  <li key={nodeInfo.node_id}>{renderNodeInfo(nodeInfo)}</li>
                ))}
              </ul>
              {!nodeInfos?.length && <JactionEmpty />}
            </section>
            <section className={styles['activity']}>
              <h2>Activity</h2>
              <ul>
                {(nodeLogs || []).map((nodeLog) => (
                  <li>
                    <span>{formatDateYMD(nodeLog.timestamp)}</span>
                    <span
                      title={nodeLog.action}
                      className={['ell', styles['action']].join(' ')}
                    >
                      {nodeLog.action}
                    </span>
                  </li>
                ))}
              </ul>
              {!nodeLogs?.length && <JactionEmpty />}
            </section>
            <section className={styles['history']}>
              <h2>History</h2>
              <ul>
                {(reportHistories || []).map((reportHistory) => (
                  <li>
                    <span className={styles['date']}>
                      {formatDateYMD(reportHistory.created_at)}
                    </span>
                    <span
                      title={`${reportHistory.point} Points earned!`}
                      className={['ell', styles['action']].join(' ')}
                    >{`${reportHistory.point} Points earned!`}</span>
                  </li>
                ))}
              </ul>
              {!reportHistories?.length && <JactionEmpty />}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.wrappers = ['@/wrappers/auth'];
export default Dashboard;
