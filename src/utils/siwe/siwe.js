const createSwMessage = ({
  address,
  domain,
  uri,
  statement = 'Sign in with Ethereum to the app.',
  version = '1',
  chainId,
  nonce,
  issuedAt = new Date().toISOString(),
}) => {
  return `
${domain} wants you to sign in with your Ethereum account:
${address}

${statement}

URI: ${uri}
Version: ${version}
Chain ID: ${chainId}
Nonce: ${nonce}
Issued At: ${issuedAt}
`.trim();
};

function isValidPrivateKey(key) {
  return /^0x[0-9a-fA-F]{64}$/.test(key);
}

export { createSwMessage, isValidPrivateKey };
