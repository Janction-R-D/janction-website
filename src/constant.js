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
  {
    label: 'Android',
    value: 'android',
    icon: 'android',
    description:
      'Optimizes performance for mobile applications and connected devices.',
  },
  {
    label: 'MAC',
    value: 'macos',
    icon: 'macos',
    description:
      'provides stability and design for creative and professional servers.',
  },
  {
    label: 'Linux',
    value: 'linux',
    icon: 'linux',
    description: 'Full control and high performance for advanced servers.',
  },
  {
    label: 'Windows',
    value: 'windows',
    icon: 'windows',
    description:
      'Ensures compatibility and ease of use for enterprise environments.',
  },
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
  Hour: 0,
  Day: 1,
  Week: 2,
  Month: 3,
  // Quarter: 4,
  Year: 5,
};

export const DURATION_OPTIONS = [
  { label: 'Hour', value: Duration.Hour },
  { label: 'Day', value: Duration.Day },
  { label: 'Week', value: Duration.Week },
  { label: 'Month', value: Duration.Month },
  { label: 'Year', value: Duration.Year },
];

export const CPU_GPU_OPTIONS = [
  { label: 'CPU', value: 'cpu' },
  { label: 'GPU', value: 'gpu' },
];

export const PROCESSOR = [
  {
    label: 'linux',
    value: 'linux',
  },

  {
    label: 'macos',
    value: 'macos',
  },
  {
    label: 'windows',
    value: 'windows',
  },
  {
    label: 'android',
    value: 'android',
  },
];

export const INSTANCE_TYPES = [
  {
    label: 'Basic CPU',
    value: 'basic_cpu',
  },
  {
    label: 'Basic GPU',
    value: 'basic_gpu',
  },
  {
    label: 'High performance GPU',
    value: 'high_performance',
  },
  {
    label: 'Others',
    value: 'other',
  },
];

export const FRAMEWORK = [
  {
    label: 'No pre-installed application is required',
    value: 'none',
  },
  {
    label: 'PyTorch',
    value: 'pytorch',
  },
  {
    label: 'TensorFlow',
    value: 'tensorflow',
  },
];

export const notShowErrors = [
  'database_error',
  'node_invalid_state',
  'invitation_not_found',
  'invalid_parameter',
  'resource_creation_error',
  'internal_server_error',
  'invalid_payload',
  'order_not_found',
  'payment_validation_error',
  'resource_lookup_error',
  'node_update_error',
  'email_send_error',
  'not_found',
  'node_not_found',
];
export const brandDetails = {
  apple: { icon: 'macos', color: 'white' },
  linux: { icon: 'linux', color: 'white' },
  nvidia: { icon: 'nvidia', color: 'green' },
  windows: { icon: 'windows', color: 'white' },
  android: { icon: 'android', color: 'green' },
  intel: { icon: 'intel', color: 'blue' },
  amd: { icon: 'amd', color: 'green' },
};
