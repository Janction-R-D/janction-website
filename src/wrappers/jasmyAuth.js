import { history, Redirect } from 'umi';

export default (props) => {
  const { reward } = history.location.state || {};

  if (reward) {
    return props.children;
  }

  return <Redirect to="/genesis/dashboard" />;
};
