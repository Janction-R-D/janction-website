import { history } from 'umi';

export const onNavigate = (to = '/genesis/agent', from) => {
  history.push(to, { from: from });
};

export const onNavigateBack = () => {
  history.goBack();
};
