import { history, Redirect, useAccess } from 'umi';

export default (props) => {
  // 优先从 history.state 获取，如果不存在则从 sessionStorage 获取
  const { nft: stateNft } = history.location.state || {};
  let nft = stateNft;

  // 如果 state 中没有 nft，尝试从 sessionStorage 获取
  if (!nft) {
    try {
      const storedNft = sessionStorage.getItem('rewards_nft');
      if (storedNft) {
        nft = JSON.parse(storedNft);
        // 将 sessionStorage 中的数据同步到 history.state
        if (history.location.state) {
          history.location.state.nft = nft;
        } else {
          history.location.state = { nft };
        }
        // 成功获取后清理 sessionStorage，避免数据残留
        sessionStorage.removeItem('rewards_nft');
      }
    } catch (error) {
      console.error('Failed to parse nft from sessionStorage:', error);
      // 解析失败时也清理，避免无效数据残留
      sessionStorage.removeItem('rewards_nft');
    }
  }

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
