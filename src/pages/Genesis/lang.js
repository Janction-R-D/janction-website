import { ethers } from 'ethers';

export const toFixed = (value, decimals) => {
  if (isNaN(value)) return 0;
  // 假设 formatEther 输出的值
  const weiValue = ethers.BigNumber.from(value);
  const etherValue = ethers.utils.formatEther(weiValue); // 转换为 Ether
  // 转换为 Number 再用 toFixed
  const roundedValue = Number(etherValue).toFixed(decimals); // 保留两位小数，四舍五入
  return roundedValue;
};
