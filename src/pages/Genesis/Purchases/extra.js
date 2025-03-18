import { empty } from '@/utils/lang';
import numeral from 'numeral';

export const PURCHASES = [
  { name: 'Quick purchase', value: 1 },
  { name: 'Customized purchase', value: 0 },
];

export const DEFAULT_PURCHASE_TYPE = PURCHASES[0].value;

export const CONFIGURATIONS = [
  {
    name: 'Basic',
    disk: 40,
    memory: 2,
    cpu: 2,
    value: '2-2',
    options: [
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 1,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 2,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 3,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 4,
      },
    ],
  },
  {
    name: 'Standard',
    disk: 40,
    memory: 2,
    cpu: 4,
    value: '2-4',
    options: [
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 1,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 2,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 3,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 4,
      },
    ],
  },
  {
    name: 'Professional',
    disk: 40,
    memory: 8,
    cpu: 2,
    value: '2-8',
    options: [
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 1,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 2,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 3,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 4,
      },
    ],
  },
  {
    name: 'Enhanced',
    disk: 40,
    memory: 8,
    cpu: 4,
    value: '4-8',
    options: [
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 1,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 2,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 3,
      },
      {
        desc: 'Designed for small and medium-sized applications, it can easily meet the needs of development and testing, and the construction of small applications.',
        price: '$34.669',
        unit: 'month',
        icon: 'nvidia',
        name: 'Economy type',
        key: 4,
      },
    ],
  },
];

export const DEFAULT_CONFIGURATION = CONFIGURATIONS[0];

export const APPLICATION = [
  {
    name: 'Standard',
    value: 'Standard',
  },
  {
    name: 'MEM-optimized',
    value: 'MEM-optimized',
  },
  {
    name: 'Compute',
    value: 'Compute',
  },
  {
    name: 'High IO',
    value: 'High IO',
  },
  {
    name: 'Big Data',
    value: 'Big Data',
  },
  {
    name: 'Be Fast',
    value: 'Be Fast',
  },
];

export const REGION = [
  {
    name: 'Bangalore, India',
    value: 'Bangalore, India',
  },
  {
    name: 'Manchester, UK',
    value: 'Manchester, UK',
  },
  {
    name: 'Ulanqab, Mongolia',
    value: 'Ulanqab, Mongolia',
  },
];

export const PRIMARY_BAND = [
  { label: 1, value: 1 },
  { label: 3, value: 3 },
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 100, value: 100 },
  { label: 200, value: 200 },
];

export const COMPUTE_MODE = [
  {
    label: 'X86 computing',
    value: 'x86',
  },
  {
    label: 'ARM computing',
    value: 'arm',
  },
  {
    label: 'GPU',
    value: 'gpu',
  },
  {
    label: 'NPU',
    value: 'npu',
  },
];

export const IP_FILTERS = [
  {
    label: 'Recently used',
    value: '1',
  },
  {
    label: 'Public image',
    value: '2',
  },
  {
    label: 'Virtual',
    value: '3',
  },
  {
    label: 'Shared image',
    value: '4',
  },
  {
    label: 'Community image',
    value: '5',
  },
];
export const DEFAULT_COMPUTE_MODE = COMPUTE_MODE[0];

export const BAND_COLUMNS = [
  {
    title: 'Specification family',
    dataIndex: 'platform',
  },
  {
    title: 'specification',
    dataIndex: 'progress',
  },
  {
    title: 'vCPU',
    dataIndex: 'cpu_usage',
  },
  {
    title: 'internal storage',
    dataIndex: 'energy',
  },
  {
    title: 'Available area',
    dataIndex: 'disk_usage',
  },
  {
    title: 'Architecture',
    dataIndex: 'uptime',
  },
  {
    title: 'processor',
    dataIndex: 'TH',
    key: 'TH',
  },
  {
    title: 'local-storage',
    dataIndex: 'WQ',
    key: 'WQ',
  },
  {
    title: 'price',
    dataIndex: 'Ports',
    key: 'Ports',
    fixed: 'right',
    render: (text) => {
      return empty(text) ? '--' : `${numeral(text).format('¥0.00')}/mon`;
    },
  },
];

export const VERSIONS = [
  {
    label: 'V1.01',
    value: '1',
  },
  {
    label: 'V2.0.1',
    value: '2',
  },
];

export const PORT_PROTOCOL = [
  {
    label: 'root',
    value: 'root',
  },
  {
    label: 'user',
    value: 'user',
  },
];

export const SUMMARY = [
  {
    name: 'Filter',
    value: 'Basic configuration (2vcpu 2GiB) Economic type e, ESSD Entry 40GiB',
  },
  {
    name: 'Image',
    value: 'Basic configuration (2vcpu 2GiB) Economic type e, ESSD Entry 40GiB',
  },
  {
    name: 'Public IP',
    value: 'Basic configuration (2vcpu 2GiB) Economic type e, ESSD Entry 40GiB',
  },
  { name: 'Bandwidth value', value: '3 Mbps' },
  { name: 'Bandwidth value', value: '3 Mbps' },
  { name: 'Region', value: 'Bangalore, India' },
  { name: 'Region', value: 'Bangalore, India' },
];

export const SETTLEMENT_COLUMNS = [
  {
    title: 'product name',
    dataIndex: 'platform',
  },
  {
    title: 'configuration',
    dataIndex: 'progress',
  },
  {
    title: 'unit price',
    dataIndex: 'progress',
  },
  {
    title: 'quantity',
    dataIndex: 'progress',
  },
  {
    title: 'duration',
    dataIndex: 'progress',
  },
  {
    title: 'total price',
    dataIndex: 'progress',
  },
];

export const INTERNET = [
  { label: 'NAT', value: 'nat' },
  { label: 'Public IP', value: 'public_ip' },
];
