// abbreviated month name
export const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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
