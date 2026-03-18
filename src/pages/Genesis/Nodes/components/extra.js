// 后端枚举（字符串版）：用于 status_str / operating_status_str 的判断，避免魔法字符串散落
export const NodeStatusStr = Object.freeze({
  INVALID: 'invalid',
  ONLINE: 'online',
  OFFLINE: 'offline',
  UNKNOWN: 'unknown',
  ONGOING: 'ongoing',
  STARTING: 'starting',
});

export const OperatingStatusStr = Object.freeze({
  LEASED: 'leased',
  LEISURE: 'leisure',
  ALARM: 'alarm',
  ON_CHAIN_TASK: 'on_chain_task',
  OFF_CHAIN_TASK: 'off_chain_task',
  DELISTED: 'delisted',
});

export const getNodeStatusMatch = ({ status_str, operating_status_str }) => {
  const isOnline = status_str === NodeStatusStr.ONLINE;
  const isOngoing = status_str === NodeStatusStr.ONGOING;
  const isOffLine = status_str === NodeStatusStr.OFFLINE;

  const isLeased = operating_status_str === OperatingStatusStr.LEASED;
  const isLeisure = operating_status_str === OperatingStatusStr.LEISURE;
  const isDelisted = operating_status_str === OperatingStatusStr.DELISTED;

  // 已挂载且已出租（在线 + 已租）
  const isActive = isOnline && isLeased;
  // 已挂载可被租（在线 + 空闲）
  const isListed = isOnline && isLeisure;
  // 节点在线（与列表页 running 筛选一致：status_str === 'online'）
  const isRunning = isOnline;

  return { isActive, isListed, isRunning, isOffLine, isOngoing, isDelisted };
};
