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
export const ANDROID_APK_PATH =
  'https://janction-test-1324956105.cos.ap-tokyo.myqcloud.com/janction.apk?q-sign-algorithm=sha1&q-ak=AKID--CAKWwFjso0Ddr-cBx98Vcd-Dvd5uswajldZLPXjPTjRNezGgZE6Pi87AA1EZ-2&q-sign-time=1719758323;1719761923&q-key-time=1719758323;1719761923&q-header-list=host&q-url-param-list=&q-signature=1e081b7f6eff8410a1d4a44829a58093c7600b42&x-cos-security-token=acBbXNgU3t64LR8t1WzD4i4FBM94s1hafb7f71301f6769bfebfe1453fffc7a1fvJPm9TUe_khwMPRyyithBH6Q69I_-D21dN5W-X8-MuTL3eElmLMrNccf6fb1__i7wGaMTH4CSdEx-DS91fce_8XTNywaxkwhzXuWkdlnxtkO3YGJqZ-22-ha6GptPQscPLvXp582SGuxu-0EfOHFloyb5-qf-lZZiZAIzjiMRGuC60AX3FwKCvPJbbkIe4pt';

export const Duration = {
  day: 0,
  week: 1,
  month: 2,
  // Quarter: 3,
};

export const paymentABI = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'currencyPriceOracle',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IPriceOracle',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'delist',
    inputs: [{ name: 'nodeId', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getListing',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'nodeId', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct Payment.Listing',
        components: [
          {
            name: 'status',
            type: 'uint8',
            internalType: 'enum Payment.ListingStatus',
          },
          { name: 'owner', type: 'address', internalType: 'address' },
          {
            name: 'baseAmount',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRental',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'nodeId', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct Payment.Rental',
        components: [
          {
            name: 'status',
            type: 'uint8',
            internalType: 'enum Payment.RentalStatus',
          },
          { name: 'tenant', type: 'address', internalType: 'address' },
          {
            name: 'currency',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'totalAmount',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'dailyAmount',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'startTime',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'paidDays',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'totalDays',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTotalAmount',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'nodeId', type: 'bytes32', internalType: 'bytes32' },
      { name: 'currency', type: 'address', internalType: 'address' },
      {
        name: 'duration',
        type: 'uint8',
        internalType: 'enum Payment.Duration',
      },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isCurrencyWhitelisted',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'list',
    inputs: [
      { name: 'nodeId', type: 'bytes32', internalType: 'bytes32' },
      { name: 'baseAmount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'listings',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [
      {
        name: 'status',
        type: 'uint8',
        internalType: 'enum Payment.ListingStatus',
      },
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'baseAmount', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'releaseDailyPayment',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'nodeId', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'rent',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'nodeId', type: 'bytes32', internalType: 'bytes32' },
      { name: 'currency', type: 'address', internalType: 'address' },
      {
        name: 'duration',
        type: 'uint8',
        internalType: 'enum Payment.Duration',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'rentals',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [
      {
        name: 'status',
        type: 'uint8',
        internalType: 'enum Payment.RentalStatus',
      },
      { name: 'tenant', type: 'address', internalType: 'address' },
      { name: 'currency', type: 'address', internalType: 'address' },
      { name: 'totalAmount', type: 'uint256', internalType: 'uint256' },
      { name: 'dailyAmount', type: 'uint256', internalType: 'uint256' },
      { name: 'startTime', type: 'uint256', internalType: 'uint256' },
      { name: 'paidDays', type: 'uint256', internalType: 'uint256' },
      { name: 'totalDays', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setPriceOracle',
    inputs: [
      { name: 'currency', type: 'address', internalType: 'address' },
      { name: 'oracle', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'whitelistCurrency',
    inputs: [
      { name: 'currency', type: 'address', internalType: 'address' },
      { name: 'status', type: 'bool', internalType: 'bool' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'DailyPaymentReleased',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'nodeId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'tenant',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'paidDays',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'List',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'nodeId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'baseAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Rent',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'nodeId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'tenant',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'totalDays',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'totalAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'dailyAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AddressEmptyCode',
    inputs: [{ name: 'target', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'AddressInsufficientBalance',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
  { type: 'error', name: 'FailedInnerCall', inputs: [] },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'SafeERC20FailedOperation',
    inputs: [{ name: 'token', type: 'address', internalType: 'address' }],
  },
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

export const paymentAddress = '0x4bcb4864a11c648830c917435d33422ba0201a3c'; // 合约地址
export const currencyAddress = '0x248f49674A9cc39E68615BD6669F5a395cbfa4D3'; // 币种合约地址

export const CPU_GPU_OPTIONS = [
  { label: 'CPU', value: 'cpu' },
  { label: 'GFPU', value: 'gpu' },
];

export const ADDRESS = {
  Payment: '0xa69471765148a6F23C0d858B4ae3fBB61603219A',
  USDT: '0xCA181238E466Fd450AbCCFc8eaADECA3646e7b99',
  USDC: '0x1123904310D41b95e30747E9687Bb167eB370547',
  JCT: '0xa780e5799805eCF2c8aaebf551180F8109139B38',
  USDTPrice: '0x31c876b373a9Dd35B164ba626c702E8BCdE58082',
  USDCPrice: '0x9d7CB65110A02432423cE0775b09dfB66859baaF',
  JCTPrice: '0xD9BeFA1c7da2891CAb652AB9f163340545177fbD',
};

export const PAY_CURRENCY = [
  {
    value: ADDRESS.JCT,
    label: 'veJCT',
    desc: 'From JANCTION',
  },
  {
    value: ADDRESS.USDT,
    label: 'USDT',
  },
  {
    value: ADDRESS.USDC,
    label: 'USDC',
  },
];
