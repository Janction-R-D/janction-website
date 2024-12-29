import { history, Redirect, useAccess } from 'umi';

export default (props) => {
  const { nft } = history.location.state || {};
  const { isLogin } = useAccess();

  if (!isLogin) {
    let url = `/login?from=${history.location.pathname}`;
    return <Redirect to={url} />;
  }

  if (nft) {
    return props.children;
  }

  return <Redirect to="/genesis/dashboard" />;
};
