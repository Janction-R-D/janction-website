export const getJctAirdropErrorMessage = (error, intl) => {
  const translate = (name) =>
    intl.formatMessage({ id: `airdrop.new.error.${name}` });
  const code = error?.code ?? error?.error?.code;
  const details = [
    error?.reason,
    error?.error?.reason,
    error?.error?.message,
    error?.data?.message,
    error?.message,
  ]
    .filter((value) => typeof value === 'string')
    .join(' ')
    .toLowerCase();

  if (
    code === 4001 ||
    code === 'ACTION_REJECTED' ||
    /user (rejected|denied)|request rejected|user cancelled|user canceled/.test(
      details,
    )
  ) {
    return translate('rejected');
  }
  if (/airdrop already claimed/.test(details)) return translate('claimed');
  if (/insufficient airdrop balance/.test(details)) return translate('balance');
  if (/message has expired/.test(details)) return translate('expired');
  if (/insufficient funds/.test(details)) return translate('gasBalance');
  if (/signature wallet does not match connected wallet/.test(details)) {
    return translate('wallet');
  }
  if (
    /signature chainid|failed to switch|unsupported network configuration/.test(
      details,
    )
  ) {
    return translate('network');
  }
  if (/invalid signature|incomplete signature payload/.test(details)) {
    return translate('signature');
  }
  return translate('fallback');
};
