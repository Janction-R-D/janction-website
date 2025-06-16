import { empty } from '@/utils/lang';

export const balanceData = [
  [12, 23, 3, 4, 5, 65, 67, 7, 8, 9, 23],
  [2, 3, 33, 44, 55, 5, 7, 77, 88, 99, 3],
];

export const newsData = [
  {
    title: '$1M holiday bonus',
    desc: 'Opt in and refer to earn a share',
  },
  {
    title: '$1M holiday bonus',
    desc: 'Opt in and refer to earn a share',
  },
  {
    title: '$1M holiday bonus',
    desc: 'Opt in and refer to earn a share',
  },
  {
    title: '$1M holiday bonus',
    desc: 'Opt in and refer to earn a share',
  },
  {
    title: '$1M holiday bonus',
    desc: 'Opt in and refer to earn a share',
  },
  {
    title: '$1M holiday bonus',
    desc: 'Opt in and refer to earn a share',
  },
];

export const mockSalesPipeline = [
  {
    name: 'Online memory footprint',
    value: '15 GB',
  },
  {
    name: 'Online memory footprint',
    value: '1.2 GB',
  },
  {
    name: 'Online memory footprint',
    value: '128 MB',
  },
];

export const pieColors = ['#00BBD4', '#87C969', '#ECC560'];

export const STATE_CONS = {
  0: 'Leased',
  1: 'Leisure',
  2: 'Alarm',
  3: 'On-chain task',
  4: 'Off-chain task',
};

export const ALARAM_STATE = 2;

export const ARITHMETIC_SITUATION = {
  online_memory_footprint: 'Online memory',
  offline_memory_footprint: 'Offline memory',
  free_memory: 'Free memory',
};

export function convertMBtoGB(mb) {
  if (empty(mb)) return '~';
  const gb = mb / 1024; // 1 GB = 1024 MB
  if (gb >= 1) {
    return `${gb.toFixed(2)} GB`; // 保留两位小数
  } else {
    return `${mb} MB`; // 直接返回MB格式
  }
}
