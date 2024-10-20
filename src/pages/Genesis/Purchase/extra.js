export const PURCHASES = [
  { name: 'Customized purchase', value: 0 },
  { name: 'Quick purchase', value: 1 },
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

export const PRIMARY_BAND = [1, 3, 5, 10, 100, 200];

export const COMPUTE_MODE = [
  {
    label: 'X86计算',
    value: 'x86',
  },
  {
    label: 'ARM计算',
    value: 'arm',
  },
  {
    label: 'GPU',
    value: 'gpu',
  },
];

export const DEFAULT_COMPUTE_MODE = COMPUTE_MODE[0];

export const BAND_COLUMNS = [
  {
    title: '规格族',
    dataIndex: 'platform',
  },
  {
    title: '实例规格',
    dataIndex: 'progress',
  },
  {
    title: 'CPU',
    dataIndex: 'cpu_usage',
  },
  {
    title: 'MEM',
    dataIndex: 'energy',
  },
  {
    title: '可用区',
    dataIndex: 'disk_usage',
  },
  {
    title: '架构-分类',
    dataIndex: 'uptime',
  },
  {
    title: '处理器',
    dataIndex: 'TH',
    key: 'TH',
  },
  {
    title: '本地存储',
    dataIndex: 'WQ',
    key: 'WQ',
  },
  {
    title: '实例价格',
    dataIndex: 'Ports',
    key: 'Ports',
  },
];

export const VERSIONS = [];

export const PORT_PROTOCOL = [
  {
    label: 'SSH(TCP:22)',
    value: 'ssh-22',
  },
  {
    label: 'HTTP(TCP:82)',
    value: 'http-82',
  },
  {
    label: 'HTTPS(TCP:443)',
    value: 'https-443',
  },
  {
    label: 'RDP(TCP:3389)',
    value: 'rdp-3389',
  },
  {
    label: 'ICMP(IPV4)',
    value: 'icmp-ipv4',
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
