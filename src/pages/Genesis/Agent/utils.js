import { history } from 'umi';

export const onNavigate = (to = '/genesis/agent', from, agent = {}) => {
  history.push(to, { from: from, agent });
};

export const onNavigateBack = () => {
  history.goBack();
};
