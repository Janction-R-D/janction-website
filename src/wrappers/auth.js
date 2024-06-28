import { Redirect, useAccess, useModel, history } from 'umi';
import { useAccountEffect } from 'wagmi';
import storage from '@/utils/storage';

export default (props) => {
  const { history } = props;
  const { initialState, setInitialState } = useModel('@@initialState');
  const { isLogin } = useAccess();

  // Monitor active exit
  useAccountEffect({
    onDisconnect() {
      storage.remove('userAccount');
      storage.remove('token');
      setInitialState({
        ...initialState,
        userAccount: null,
      });
      history.push(`/login?from=${history.location.pathname}`);
    },
  });

  // Enter the permission judgment before the page
  if (isLogin) {
    return props.children;
  } else {
    return <Redirect to={`/login?from=${history.location.pathname}`} />;
  }
};
