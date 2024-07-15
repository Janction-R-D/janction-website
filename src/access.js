import storage from '@/utils/storage';

export default function (initialState) {
  return {
    isLogin: storage.get('token'),
  };
}
