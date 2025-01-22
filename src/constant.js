const isProduction = process.env.JANCTION_ENV === 'production';

// abbreviated month name
export const MONTH = [
  { value: 1, label: 'Jan' },
  { value: 2, label: 'Feb' },
  { value: 3, label: 'Mar' },
  { value: 4, label: 'Apr' },
  { value: 5, label: 'May' },
  { value: 6, label: 'Jun' },
  { value: 7, label: 'Jul' },
  { value: 8, label: 'Aug' },
  { value: 9, label: 'Sep' },
  { value: 10, label: 'Oct' },
  { value: 11, label: 'Nov' },
  { value: 12, label: 'Dec' },
];

// Request to return data status
export const RESPONSE_CODE = {
  SUCCESS: 1, // Request successful
  FAIL: 0, // Request failed
};

export const SYSPM_REQ_ECY_FLG = 0; // Request encrypted or not
export const SYSPM_RSP_ECY_FLG = 0; // Return whether to decrypt

// Encryption | Decryption
export const codeTypeJsonArr = [
  { e: '1', d: '@' },
  { e: '2', d: '#' },
  { e: '3', d: '%' },
  { e: '4', d: '-' },
  { e: '5', d: '&' },
  { e: '6', d: '?' },
  { e: '7', d: '>' },
  { e: '8', d: '<' },
  { e: 'm', d: '!' },
];

export const SYSTEM_LIST = [
  { label: 'Android', value: 'android', icon: 'android' },
  { label: 'MAC', value: 'macos', icon: 'macos' },
  { label: 'Linux', value: 'linux', icon: 'linux' },
  { label: 'Windows', value: 'windows', icon: 'windows' },
];

export const SYSTEM_SELECT_LIST = [
  { label: 'All', value: 'all' },
  ...SYSTEM_LIST.map((v) => {
    return {
      label: v.label,
      value: v.value,
    };
  }),
];

export const ARCHITECTURE = [
  { name: 'AMD64', value: 'cpu64', sys: ['macos', 'linux', 'windows'] },
  { name: 'ARM', value: 'cpu', sys: ['macos', 'linux'] },
  // { name: 'AMD64', value: 'gpu64', sys: [] },
  // { name: 'ARM', value: 'gpu', sys: [] },
];

export const COMMAND = {
  macos: {
    cpu64:
      'docker run -d -e PRIVATE_KEY=0xab... --name janction-node roddyneo/jct-macos-amd64:0.0.9',
    cpu: 'docker run -d -e PRIVATE_KEY=0xab... --name janction-node roddyneo/jct-macos-arm:0.0.9',
  },
  linux: {
    cpu64:
      'docker run -d -e PRIVATE_KEY=0xab... --name janction-node roddyneo/jct-linux-amd64:0.0.9',
    cpu: 'docker run -d -e PRIVATE_KEY=0xab... --name janction-node roddyneo/jct-linux-arm:0.0.9',
  },
  windows: {
    cpu64:
      'docker run -d -e PRIVATE_KEY=0xab... --name janction-node roddyneo/jct-windows-amd64:0.0.9',
  },
};

export const DOCKER_PATH = {
  macos: [
    '$ /bin/bash -c "$(curl -fsSL',
    'https://raw.githubusercontent.com/Homebrew/install/master/install.sh)',
    '$ brew --version',
    'Homebrew 2.5.2',
  ],
  windows: '',
  linux: '',
};
export const ANDROID_APK_PATH = 'https://github.com/termux/termux-app';

export const Duration = {
  Day: 0,
  Week: 1,
  Month: 2,
  // Quarter: 3,
};
export const DURATION_OPTIONS = [
  { label: 'Day', value: Duration.Day },
  { label: 'Week', value: Duration.Week },
  { label: 'Month', value: Duration.Month },
];

export const currencyABI = [
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'spender', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'value', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'value', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'value', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
];

export const CPU_GPU_OPTIONS = [
  { label: 'CPU', value: 'cpu' },
  { label: 'GPU', value: 'gpu' },
];

export const TEST_ADDRESS = {
  Payment: '0x43B767e68bBD618b7389Ea03d13AE0598837E6D5',
  USDT: '0xCA181238E466Fd450AbCCFc8eaADECA3646e7b99',
  USDC: '0x1123904310D41b95e30747E9687Bb167eB370547',
  JCT: '0xa780e5799805eCF2c8aaebf551180F8109139B38',
  Distribution: '0x37E1f8E11edc97FA177A287e7D9D741342DF303d',
  JasmyRewards: '0xEce3d97486783b5a6E32B49c122EC3A5b73dd064',
  NFTEscrowProxy: '0x75A5FCe7F34c120d8783c6AEC4d5a5063f51846B',
  JanctionNFT: '0x6f899dA8D3d9De3A910Ee38773444B757D1Cf197',
};

export const ADDRESS = {
  Payment: '0xCCC448d11A64E9778599C136503c668dd9729C43',
  USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', // OP
  USDC: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', // OP
  JCT: '0xa780e5799805eCF2c8aaebf551180F8109139B38',
  Distribution: '0x78529A764A77325933dB1f22C26f8833a725df2d', // OP
  JasmyRewards: '0x38bd30c4ce1ac8e4feeb16ef5e689b9da9207ade', // ETH
  JanctionNFT: '0x437ec4194ee2EFdBF326fD16ebaa29418CF8c451', // OP
};

export const PAY_CURRENCY = [
  {
    value: isProduction ? ADDRESS.JCT : TEST_ADDRESS.JCT,
    label: 'veJCT',
    desc: 'From JANCTION',
    rate: 0.02,
  },
  {
    value: isProduction ? ADDRESS.USDT : TEST_ADDRESS.USDT,
    label: 'USDT',
    rate: 1,
  },
  {
    value: isProduction ? ADDRESS.USDC : TEST_ADDRESS.USDC,
    label: 'USDC',
    rate: 1,
  },
];
