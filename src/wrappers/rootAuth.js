import { Redirect, useAccess, useModel } from 'umi';

export default (props) => {
  const { history } = props;
  const { initialState, setInitialState } = useModel('@@initialState');
  const { isRootLogin } = useAccess();

  // Enter the permission judgment before the page
  if (isRootLogin) {
    return props.children;
  } else {
    return <Redirect to="/root/login" />;
  }
};
