import { ethers } from 'ethers';

export const toFixed = (value, decimals) => {
  if (isNaN(value)) return 0;
  // 处理输入，确保 value 是有效的整数字符串（含小数点会报错）
  const stringValue = value.toString().split('.')[0];
  const weiValue = ethers.BigNumber.from(stringValue);
  const etherValue = ethers.utils.formatEther(weiValue); // 转换为 Ether
  // 转换为 Number 再用 toFixed
  const roundedValue = Number(etherValue).toFixed(decimals); // 保留两位小数，四舍五入
  return roundedValue;
};
