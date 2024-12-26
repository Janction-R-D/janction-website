import storage from '@/utils/storage';

export default function (initialState) {
  if (!initialState) {
    return {
      isLogin: storage.get('userAccount'),
    };
  }
  return {
    isLogin: initialState.userAccount,
  };
}
