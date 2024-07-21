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
  { name: 'AMD64(CPU)', value: 'cpu64', sys: ['macos', 'linux', 'windows'] },
  { name: 'ARM(CPU)', value: 'cpu', sys: ['macos', 'linux'] },
  { name: 'AMD64(GPU)', value: 'gpu64', sys: [] },
  { name: 'ARM(GPU)', value: 'gpu', sys: [] },
];
