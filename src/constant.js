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
