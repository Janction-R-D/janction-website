import numeral from 'numeral';

export const toNumber = (value) => {
  if (isNaN(value)) return 0;
  return Number(value); // 保留两位小数，四舍五入
};

export const toFixed = (value) => {
  if (isNaN(value)) return 0;
  return numeral(toNumber(value)).format('0.00'); // 保留两位小数，四舍五入
};
