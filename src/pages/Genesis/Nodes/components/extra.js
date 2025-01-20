export const getNodeStatusMatch = ({ status_str, operating_status_str }) => {
  const isOnline = status_str === 'online';
  const isLeased = operating_status_str === 'leased';
  const isLeisure = operating_status_str === 'leisure';
  // 已挂载且已出租
  let isActive = isOnline && isLeased;
  // 已挂载但未出租
  let isListed = isOnline && isLeisure;
  // 未挂载
  let isRunning = isOnline && !isLeased && !isLeisure;
  // 离线
  let isOffLine = !isOnline;
  return { isActive, isListed, isRunning, isOffLine };
};
