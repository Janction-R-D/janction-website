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
      storage.clear();
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
    let url = `/login?from=${history.location.pathname}`;
    const inviterCode = storage.get('inviterCode');
    if (inviterCode) {
      url = `${url}&inviterCode=${inviterCode}`;
    }
    return <Redirect to={url} />;
  }
};
