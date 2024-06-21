export default function (initialState) {
  return {
    isLogin: !!initialState?.userAccount,
  };
}
