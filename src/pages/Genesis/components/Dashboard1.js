import JactionEmpty from '@/components/JactionEmpty';
import JactionSelect from '@/components/JactionSelect';
import { SYSTEM_LIST, SYSTEM_SELECT_LIST } from '@/constant';
import { formatDateYMD, formatTime } from '@/utils/datetime';
import { formatThouNumber } from '@/utils/numeric';
import { Divider, Skeleton } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAccount } from 'wagmi';
import {
  fetchDailyPointStatistic,
  fetchNodeInfos,
  fetchNodeLogs,
  fetchNodesCount,
  fetchPointStatistic,
  fetchReportHistories,
  MappingNodeStatus,
  NodeStatus,
  NodeType,
} from '../../../services/personal';
import { showValue } from '../../../utils/lang';
import styles from '../index.less';
import AwardChart from './AwardChart';

const Dashboard = (props) => {
  const [selectedSystem, setSelectedSystem] = useState('all');
  const [nodesCount, setNodesCount] = useState();
  const [nodeInfos, setNodeInfos] = useState();
  const [nodeLogs, setNodeLogs] = useState([]);
  const [pointStatistic, setPointStatistic] = useState();
  const [dailyPointStatistic, setDailyPointStatistic] = useState();
  const [reportHistories, setReportHistories] = useState();
  const [nodesPage, setNodesPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const totalPoint = useMemo(() => {
    if (pointStatistic) {
      return formatThouNumber(pointStatistic.point);
    }
  }, [pointStatistic]);

  useEffect(() => {
    if (!address) return;
    handleFetchNodesCount();
    handleFetchNodeInfos();
    handleFetchNodeLogs();
    handleFetchPointStatistic();
    handleFetchDailyPointStatistic();
    handleFetchReportHistories();
  }, [address]);

  const handleFetchNodesCount = async () => {
    try {
      const nodesCount = await fetchNodesCount({ wallet_address: address });
      console.log('nodesCount:', nodesCount);
      setNodesCount(nodesCount);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const handleFetchNodeInfos = async (nodeType) => {
    try {
      const nodeInfos = await fetchNodeInfos({
        wallet_address: address,
        node_type: nodeType,
      });
      console.log('nodeInfos:', nodeInfos);
      setNodeInfos(
        nodeInfos.sort((a, b) => {
          if (
            a.node_status === NodeStatus.Running &&
            b.node_status !== NodeStatus.Running
          ) {
            return -1;
          }
          // If b.status is 2 and a.status is not 2, b should come before a
          if (
            b.node_status === NodeStatus.Running &&
            a.node_status !== NodeStatus.Running
          ) {
            return 1;
          }
          // Otherwise, the order remains the same
          return 0;
        }),
      );
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const handleFetchNodeLogs = async (params = {}) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const _nodeLogs = await fetchNodeLogs({
        page: nodesPage,
        wallet_address: address,
        ...params,
      });
      setNodesPage(params.page || 1);
      setNodeLogs([...nodeLogs, ...(_nodeLogs || [])]);
    } catch (err) {
      console.log('『err』', err);
    }
    setLoading(false);
  };

  const handleFetchPointStatistic = async () => {
    try {
      const pointStatistic = await fetchPointStatistic({
        wallet_address: address,
      });
      setPointStatistic(pointStatistic);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const handleFetchDailyPointStatistic = async () => {
    try {
      const dailyPointStatistic = await fetchDailyPointStatistic({
        wallet_address: address,
        days: 7,
      });
      setDailyPointStatistic(dailyPointStatistic);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const handleFetchReportHistories = async () => {
    try {
      const reportHistories = await fetchReportHistories({
        wallet_address: address,
      });
      setReportHistories(reportHistories);
    } catch (err) {
      console.log('『err』', err);
    }
  };

  const handleSelectSystem = (value) => {
    setSelectedSystem(value);
    const nodeType = value === 'all' ? undefined : value;
    handleFetchNodeInfos(nodeType);
    handleFetchNodeLogs({ node_type: nodeType });
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
              <ul id="scrollableDiv">
                <InfiniteScroll
                  dataLength={nodeLogs.length}
                  next={() => handleFetchNodeLogs({ page: nodesPage + 1 })}
                  hasMore={nodeLogs.length < 20000}
                  loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                  endMessage={<Divider plain>It is all, nothing more</Divider>}
                  scrollableTarget="scrollableDiv"
                >
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
                </InfiniteScroll>
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

export default Dashboard;
