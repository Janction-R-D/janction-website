import storage from '@/utils/storage';
import { Redirect, useAccess, useModel, history } from 'umi';
import { useAccountEffect } from 'wagmi';

export default (props) => {
  const { history } = props;
  const { initialState, setInitialState } = useModel('@@initialState');
  const { sessionType } = initialState || {};
  const { isLogin } = useAccess();
  const TOKEN = storage.get('TOKEN');

  // Monitor active exit
  useAccountEffect({
    onDisconnect() {
      if (sessionType !== 'wallet') {
        storage.remove('AUTH_HEADERS');
        storage.remove('userAccount');
        setInitialState({
          ...initialState,
          userAccount: null,
        });
        return;
      }
      storage.clear();
      setInitialState({
        ...initialState,
        userAccount: null,
      });
      history.push(`/login?from=${history.location.pathname}`);
    },
  });

  // Enter the permission judgment before the page
  if (isLogin || TOKEN) {
    return props.children;
  } else {
    let url = `/login?from=${history.location.pathname}`;
    const inviterCode = storage.get('inviterCode');
    if (inviterCode) {
      url = `${url}&inviterCode=${inviterCode}`;
    }
    return <Redirect to={url} />;
  }
};
