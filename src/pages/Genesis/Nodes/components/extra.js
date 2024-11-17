export const getNodeStatusMatch = ({ status_str, operating_status_str }) => {
  // 已挂载且已出租
  let isActive = status_str === 'online' && operating_status_str == 'leased';
  // 已挂载但未出租
  let isListed = status_str === 'online' && operating_status_str == 'leisure';
  // 未挂载
  let isRunning = status_str === 'online' && !isActive && !isListed;
  // 离线
  let isOffLine = status_str !== 'online';
  return { isActive, isListed, isRunning, isOffLine };
};
