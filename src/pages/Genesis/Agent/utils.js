import { history } from 'umi';

export const onNavigate = (to = '/genesis/agent', from, id = null) => {
  history.push(to, { from: from, id });
};

export const onNavigateBack = () => {
  history.goBack();
};
