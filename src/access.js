import storage from '@/utils/storage';

export default function (initialState) {
  if (!initialState) {
    return {
      isLogin: storage.get('userAccount'),
      isRootLogin: storage.get('ROOT_AUTH'),
    };
  }
  return {
    isLogin: initialState.userAccount,
    isRootLogin: initialState.rootAccount,
  };
}
